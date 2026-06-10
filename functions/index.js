const { onCall } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { defineString, defineSecret } = require("firebase-functions/params");

// Zdefiniuj parametry środowiskowe
const stripeSecretKey = defineString("STRIPE_SECRET_KEY");
const webhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

admin.initializeApp();
const db = admin.firestore();

// Funkcja helper do inicjalizacji Stripe (lazy loading)
const getStripe = () => {
  return require("stripe")(stripeSecretKey.value());
};

const getDownloadUrl = (productId) => {
  const urls = {
    1: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/Automotive-Pro.zip?alt=media",
    2: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/Portrait-Collection.zip?alt=media",
    3: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/Complete-Collection.zip?alt=media",
    4: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/moody-presets.zip?alt=media",
    5: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/cinematic-pack.zip?alt=media",
    6: "https://firebasestorage.googleapis.com/v0/b/portfolio-fotograficzne.firebasestorage.app/o/Natural-Beauty.zip?alt=media",
  };
  return urls[productId] || "";
};

// Utworzenie Checkout Session
exports.createCheckoutSession = onCall(async (request) => {
  console.log("=== DEBUG START ===");
  console.log("Request auth:", request.auth);
  console.log("Request data:", request.data);
  console.log("=== DEBUG END ===");

  try {
    const stripe = getStripe();

    // Weryfikacja użytkownika - w v2 to request.auth
    if (!request.auth) {
      throw new Error("Musisz być zalogowany");
    }

    const { items, customerEmail, successUrl, cancelUrl } = request.data;

    // Przygotuj line items dla Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "pln",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    // Utwórz Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "blik", "p24"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        userId: request.auth.uid,
        items: JSON.stringify(items),
      },
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(error.message);
  }
});

// Webhook do weryfikacji płatności
exports.stripeWebhook = onRequest(async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // W produkcji weryfikuj signature (na razie pomijamy dla testów)
    event = req.body;
    // Dla produkcji:
    // event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret.value());
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const items = JSON.parse(session.metadata.items);

    try {
      const existingPurchases = await db
        .collection("purchases")
        .where("userId", "==", userId)
        .get();

      const existingProductIds = existingPurchases.docs.map(
        (doc) => doc.data().productId
      );

      for (const item of items) {
        if (existingProductIds.includes(item.id)) {
          console.log(`Pomijam ${item.name} - już zakupiony`);
          continue;
        }

        await db.collection("purchases").add({
          userId: userId,
          productId: item.id,
          productName: item.name,
          productImage: item.image,
          price: item.price,
          downloadUrl: getDownloadUrl(item.id),
          customerEmail: session.customer_email,
          stripeSessionId: session.id,
          purchaseDate: admin.firestore.FieldValue.serverTimestamp(),
          status: "completed",
        });

        console.log(`Zapisano zakup: ${item.name} dla użytkownika ${userId}`);
      }

      console.log("Wszystkie zakupy zapisane pomyślnie");
    } catch (error) {
      console.error("Error saving purchases:", error);
    }
  }

  res.json({ received: true });
});
