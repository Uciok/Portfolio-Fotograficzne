# Ucio Media — Portfolio Fotograficzne

Aplikacja webowa łącząca portfolio fotografa, system rezerwacji sesji oraz sklep internetowy z produktami cyfrowymi (presety Lightroom). Projekt realizowany w ramach pracy inżynierskiej.

🔗 Repozytorium: https://github.com/Uciok/Portfolio-Fotograficzne

## Funkcjonalności

**Portfolio**
- Galeria prac z podziałem na kategorie (motoryzacja, portrety)
- Strona "O mnie" i cennik usług

**System rezerwacji sesji**
- Pięciostopniowy kreator rezerwacji (typ sesji → pakiet → termin → dane → podsumowanie)
- Interaktywny kalendarz z blokowaniem zajętych terminów w czasie rzeczywistym
- Walidacja formularzy z komunikatami w języku polskim
- Wyliczanie zaliczki (30% wartości pakietu)

**Sklep internetowy**
- Sprzedaż produktów cyfrowych (presety Lightroom)
- Koszyk zakupowy
- Płatności online przez Stripe Checkout (karta, BLIK, Przelewy24)
- Automatyczna realizacja zamówień przez webhook — natychmiastowy dostęp do zakupionych plików
- Historia zakupów użytkownika ("Moje zakupy")

**Konta użytkowników**
- Rejestracja i logowanie (Firebase Authentication)
- Profil użytkownika
- Prywatne galerie klienckie — klient po zalogowaniu widzi zdjęcia ze swoich sesji
- Panel administracyjny

**Pozostałe**
- Formularz kontaktowy z zapisem wiadomości do bazy
- W pełni responsywny interfejs (mobile-first)
- Strona błędu 404

## Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Frontend | Vue.js 3 (Composition API), Vue Router, Tailwind CSS |
| Backend | Firebase Cloud Functions v2 (Node.js) |
| Baza danych | Cloud Firestore |
| Uwierzytelnianie | Firebase Authentication |
| Pliki | Firebase Storage |
| Płatności | Stripe (Checkout + Webhooks) |
| Build | Vite |

## Architektura płatności

1. Użytkownik dodaje produkty do koszyka i przechodzi do kasy
2. Cloud Function `createCheckoutSession` weryfikuje użytkownika i tworzy sesję Stripe Checkout
3. Po opłaceniu Stripe wysyła event `checkout.session.completed` na endpoint `stripeWebhook`
4. Webhook zapisuje zakup w kolekcji `purchases` wraz z linkiem do pobrania produktu
5. Użytkownik widzi zakup na stronie "Moje zakupy" z możliwością pobrania plików

Zapis zakupów odbywa się wyłącznie po stronie serwera (Admin SDK) — reguły bezpieczeństwa Firestore blokują tworzenie zakupów z poziomu klienta.

## Bezpieczeństwo

- Reguły Firestore izolują dane użytkowników (galerie i zakupy widoczne tylko dla właściciela)
- Klucze Stripe (secret key, webhook secret) przechowywane jako zmienne środowiskowe Cloud Functions — nigdy w kodzie frontendu
- Weryfikacja podpisu webhooków Stripe
- Hasła użytkowników zarządzane przez Firebase Authentication (hash scrypt)
- Walidacja danych formularzy po stronie klienta oraz w regułach bazy

## Uruchomienie lokalne

```bash
# 1. Klonowanie repozytorium
git clone git@github.com:Uciok/Portfolio-Fotograficzne.git
cd Portfolio-Fotograficzne

# 2. Instalacja zależności
npm install
cd functions && npm install && cd ..

# 3. Konfiguracja zmiennych środowiskowych
# Utwórz plik functions/.env z zawartością:
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# FRONTEND_URL=http://localhost:5173

# 4. Start serwera deweloperskiego
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

> **Uwaga:** plik `functions/.env` zawiera sekrety i nie jest częścią repozytorium. Do pełnego działania płatności wymagane jest konto Stripe (tryb testowy) oraz projekt Firebase z włączonymi usługami Firestore, Authentication, Storage i Cloud Functions.

### Deploy Cloud Functions

```bash
firebase deploy --only functions
```

### Testowanie płatności (Stripe sandbox)

| Scenariusz | Numer karty |
|---|---|
| Płatność udana | `4242 4242 4242 4242` |
| Płatność odrzucona | `4000 0000 0000 0002` |
| Wymagane 3D Secure | `4000 0025 0000 3155` |

Data ważności: dowolna przyszła, CVC: dowolne 3 cyfry.

## Struktura projektu

```
├── functions/            # Firebase Cloud Functions (płatności Stripe)
│   └── index.js          # createCheckoutSession, stripeWebhook
├── src/
│   ├── components/       # Komponenty współdzielone (Navbar, Footer)
│   ├── composables/      # Logika wielokrotnego użytku (useAuth, useStripe, useToast)
│   ├── firebase/         # Konfiguracja Firebase
│   ├── router/           # Routing aplikacji
│   └── views/            # Widoki/strony aplikacji
├── firebase.json         # Konfiguracja projektu Firebase
└── vite.config.js        # Konfiguracja bundlera
```

## Kierunki rozwoju

- Płatność zaliczki za rezerwację online (infrastruktura Stripe gotowa)
- Panel zarządzania galeriami klienckimi z poziomu aplikacji
- Powiadomienia e-mail o nowych rezerwacjach i wiadomościach
- Automatyczne czyszczenie danych po usunięciu konta (rozszerzenie Delete User Data)

## Autor

Dawid — projekt realizowany w ramach pracy inżynierskiej.
