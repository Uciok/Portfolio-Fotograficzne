<template>
  <div class="payment-success bg-dark min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
    <div class="max-w-2xl w-full">
      <!-- Success Icon -->
      <div class="text-center mb-8" data-aos="zoom-in">
        <div class="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 class="text-5xl font-black mb-4">
          Płatność <span class="text-green-500">zakończona!</span>
        </h1>
        
        <p class="text-xl text-gray-400">
          Dziękujemy za zakup! Twoje produkty są już dostępne do pobrania.
        </p>
      </div>

      <!-- Info Box -->
      <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-8" data-aos="fade-up" data-aos-delay="100">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Co dalej?</h3>
            <ul class="text-gray-400 space-y-2">
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span>
                <span>Otrzymałeś email z potwierdzeniem zakupu</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span>
                <span>Produkty są dostępne na stronie "Moje Zakupy"</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span>
                <span>Linki do pobierania są bezterminowe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="200">
        <router-link
          to="/my-purchases"
          class="flex-1 bg-primary hover:bg-red-600 text-white py-4 px-8 rounded-lg font-bold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
          </svg>
          Moje Zakupy
        </router-link>

        <router-link
          to="/shop"
          class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 px-8 rounded-lg font-bold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          Kontynuuj zakupy
        </router-link>
      </div>

      <!-- Home Link -->
      <div class="text-center mt-8">
        <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
          ← Powrót do strony głównej
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  mounted() {
    // Wyczyść koszyk po udanej płatności
    localStorage.removeItem('cart')
  }
}
</script>