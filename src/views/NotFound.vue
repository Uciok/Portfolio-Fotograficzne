<template>
  <div class="not-found bg-dark min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Tło - spójne z resztą strony -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-black"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

    <div class="relative z-10 text-center max-w-2xl">
      <div class="text-8xl mb-6">📷</div>
      <h1 class="text-8xl md:text-9xl font-black mb-4">
        4<span class="text-primary">0</span>4
      </h1>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Ups! Ta strona nie istnieje
      </h2>
      <p class="text-gray-400 text-lg mb-10 leading-relaxed">
        Strona, której szukasz, mogła zostać przeniesiona, usunięta
        lub adres został wpisany niepoprawnie.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold hover:scale-105 shadow-2xl shadow-primary/30"
        >
          Wróć na stronę główną
        </router-link>
        <router-link
          to="/portfolio"
          class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold"
        >
          Zobacz portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>