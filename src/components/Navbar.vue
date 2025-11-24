<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700"
  >
    <div class="w-full px-8 py-4">
      <div class="flex justify-between items-center max-w-screen-xl mx-auto">
        <!-- Logo -->
        <router-link to="/" class="hover:opacity-80 transition">
          <img src="/images/logo-biale.png" alt="Portfolio Logo" class="h-10" />
        </router-link>

        <!-- Menu -->
        <div class="flex space-x-8">
          <router-link
            to="/"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{ 'text-primary font-semibold': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/portfolio"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{
              'text-primary font-semibold': $route.path === '/portfolio',
            }"
          >
            Portfolio
          </router-link>
          <router-link
            to="/about"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{ 'text-primary font-semibold': $route.path === '/about' }"
          >
            O mnie
          </router-link>
          <router-link
            to="/services"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{
              'text-primary font-semibold': $route.path === '/services',
            }"
          >
            Cennik
          </router-link>
          <router-link
            to="/shop"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{ 'text-primary font-semibold': $route.path === '/shop' }"
          >
            Sklep
          </router-link>
          <router-link
            to="/booking"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{
              'text-primary font-semibold': $route.path === '/booking',
            }"
          >
            Rezerwacje
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-400 hover:text-white transition-colors duration-200"
            :class="{
              'text-primary font-semibold': $route.path === '/contact',
            }"
          >
            Kontakt
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
