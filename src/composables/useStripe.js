import { loadStripe } from "@stripe/stripe-js";
import { ref } from "vue";
import { httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { functions } from "../firebase/config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function useStripe() {
  const loading = ref(false);
  const error = ref(null);

  async function createCheckoutSession(items, customerEmail) {
    loading.value = true;
    error.value = null;

    try {
      // Sprawdź czy user jest zalogowany
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Musisz być zalogowany");
      }

      console.log("User authenticated:", user.uid);

      const createCheckout = httpsCallable(functions, "createCheckoutSession");

      // Przekształć items do formatu dla Stripe
      const stripeItems = items.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
      }));

      console.log("Calling function with:", {
        items: stripeItems,
        customerEmail,
      });

      const result = await createCheckout({
        items: stripeItems,
        customerEmail: customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/checkout`,
      });

      console.log("Result:", result.data);

      // Redirect do Stripe Checkout
      window.location.href = result.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    createCheckoutSession,
  };
}
