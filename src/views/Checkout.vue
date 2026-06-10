<template>
  <div class="checkout bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-12" data-aos="fade-up">
        <h1 class="text-5xl font-black mb-4">
          Finalizacja <span class="text-primary">zamówienia</span>
        </h1>
        <p class="text-gray-400 text-lg">Już prawie gotowe! Uzupełnij dane i odbierz swoje presety.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Formularz - lewa strona -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Twoje dane -->
          <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800" data-aos="fade-up">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <span class="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Twoje dane
            </h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold mb-2">Imię i nazwisko *</label>
                <input
                  v-model="formData.fullName"
                  type="text"
                  placeholder="Jan Kowalski"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  :class="{ 'border-red-500': errors.fullName }"
                />
                <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="jan@example.com"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Telefon</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+48 123 456 789"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <!-- Metoda płatności -->
          <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800" data-aos="fade-up" data-aos-delay="100">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <span class="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Metoda płatności
            </h2>

            <div class="bg-gray-800 p-6 rounded-lg">
              <div class="flex items-center gap-4 mb-4">
                <span class="text-4xl">💳</span>
                <div>
                  <div class="font-bold text-lg">Stripe Checkout</div>
                  <div class="text-sm text-gray-400">Karta, BLIK, przelewy - wszystko w jednym</div>
                </div>
              </div>
              <div class="flex gap-2 text-2xl">
                <span>💳</span>
                <span>📱</span>
                <span>🏦</span>
                <span>🅿️</span>
              </div>
            </div>
          </div>

          <!-- Zgody -->
          <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800" data-aos="fade-up" data-aos-delay="200">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="formData.termsAccepted"
                type="checkbox"
                class="w-5 h-5 mt-1 text-primary rounded"
              />
              <span class="text-sm text-gray-300">
                Akceptuję <router-link to="/terms" class="text-primary hover:underline">regulamin</router-link> 
                oraz <router-link to="/privacy" class="text-primary hover:underline">politykę prywatności</router-link> *
              </span>
            </label>
            <p v-if="errors.termsAccepted" class="text-red-500 text-sm mt-2">{{ errors.termsAccepted }}</p>
          </div>
        </div>

        <!-- Podsumowanie - prawa strona -->
        <div class="lg:col-span-1">
          <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 sticky top-32" data-aos="fade-up" data-aos-delay="300">
            <h2 class="text-2xl font-bold mb-6">Podsumowanie</h2>

            <!-- Produkty -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex gap-4"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <div class="font-semibold text-sm">{{ item.title }}</div>
                  <div class="text-primary font-bold">{{ item.price }} zł</div>
                </div>
              </div>
            </div>

            <!-- Suma -->
            <div class="border-t border-gray-800 pt-6 mb-6 space-y-2">
              <div class="flex justify-between text-gray-400">
                <span>Produkty ({{ cartItems.length }})</span>
                <span>{{ subtotal }} zł</span>
              </div>
              <div class="flex justify-between text-2xl font-black">
                <span>Razem:</span>
                <span class="text-primary">{{ total }} zł</span>
              </div>
            </div>

            <!-- Przycisk -->
            <button
              @click="handlePayment"
              :disabled="loading"
              class="w-full bg-primary hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
            >
              <span v-if="loading">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Przetwarzanie...
              </span>
              <span v-else>
                🔒 Zapłać i pobierz
              </span>
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
              🔒 Płatność zabezpieczona przez Stripe. Natychmiastowy dostęp do plików.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useStripe } from '../composables/useStripe'
import { useToast } from 'vue-toastification'

export default {
  name: 'Checkout',
  setup() {
    const router = useRouter()
    const { user } = useAuth()
    const toast = useToast()
    const { createCheckoutSession } = useStripe()

    // Pobierz koszyk z localStorage
    const cartItems = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    // Formularz
    const formData = ref({
      fullName: '',
      email: user.value?.email || '',
      phone: '',
      termsAccepted: false
    })

    const errors = ref({})
    const loading = ref(false)

    const subtotal = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price, 0)
    })

    const total = computed(() => subtotal.value)

    // Walidacja
    const validateForm = () => {
      errors.value = {}

      if (!formData.value.fullName.trim()) {
        errors.value.fullName = 'Imię i nazwisko jest wymagane'
      }

      if (!formData.value.email.trim()) {
        errors.value.email = 'Email jest wymagany'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = 'Nieprawidłowy format email'
      }

      if (!formData.value.termsAccepted) {
        errors.value.termsAccepted = 'Musisz zaakceptować regulamin'
      }

      return Object.keys(errors.value).length === 0
    }

    // Obsługa płatności
    const handlePayment = async () => {
      if (!validateForm()) {
        toast.error('Uzupełnij wszystkie wymagane pola')
        return
      }

      if (!user.value) {
        toast.error('Musisz być zalogowany!')
        router.push('/login')
        return
      }

      if (cartItems.value.length === 0) {
        toast.error('Koszyk jest pusty!')
        router.push('/shop')
        return
      }

      try {
        loading.value = true
        
        // Redirect do Stripe Checkout
        await createCheckoutSession(cartItems.value, formData.value.email)
        
      } catch (error) {
        console.error('Payment error:', error)
        toast.error('Wystąpił błąd podczas przekierowania do płatności')
        loading.value = false
      }
    }

    return {
      cartItems,
      formData,
      errors,
      loading,
      subtotal,
      total,
      handlePayment
    }
  }
}
</script>