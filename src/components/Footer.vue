<template>
  <footer class="bg-black border-t border-gray-800 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo/Nazwa -->
        <div class="text-white font-bold text-xl mb-4 md:mb-0">
          Portfolio Fotograficzne
        </div>

        <!-- Linki -->
        <div class="flex space-x-6 mb-4 md:mb-0">
          <router-link
            to="/portfolio"
            class="text-gray-400 hover:text-white transition"
            >Portfolio</router-link
          >
          <router-link
            to="/about"
            class="text-gray-400 hover:text-white transition"
            >O mnie</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-400 hover:text-white transition"
            >Kontakt</router-link
          >
        </div>

        <!-- Copyright -->
        <div class="text-gray-500 text-sm">
          © 2025 Portfolio. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
