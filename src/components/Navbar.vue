<template>
<nav class="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800" style="z-index: 9999999;">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center flex-shrink-0">
          <img src="/images/logo-biale.png" alt="Logo" class="h-8 md:h-10" />
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-6">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-300 hover:text-primary transition-colors duration-300 font-semibold text-sm"
            active-class="text-primary"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <template v-if="user">
            <router-link
              to="/dashboard"
              class="text-gray-300 hover:text-primary transition-colors duration-300 font-semibold text-sm"
            >
              Panel
            </router-link>
            <button
              @click="handleLogout"
              class="bg-primary hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 font-semibold text-sm"
            >
              Wyloguj
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="bg-primary hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 font-semibold text-sm"
            >
              Zaloguj
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-show="mobileMenuOpen"
      class="lg:hidden bg-gray-900 border-t border-gray-800"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="closeMobileMenu"
          class="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-gray-800 transition-colors duration-300 font-semibold rounded-lg"
          active-class="text-primary bg-gray-800"
        >
          {{ link.name }}
        </router-link>

        <!-- Mobile Auth -->
        <div class="border-t border-gray-700 pt-3 mt-3 space-y-2">
          <template v-if="user">
            <router-link
              to="/dashboard"
              @click="closeMobileMenu"
              class="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-gray-800 transition-colors duration-300 font-semibold rounded-lg"
            >
              Panel
            </router-link>
            <button
              @click="handleLogout"
              class="w-full bg-primary hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              Wyloguj
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              @click="closeMobileMenu"
              class="block text-center bg-primary hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              Zaloguj
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  name: 'Navbar',
  setup() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    const mobileMenuOpen = ref(false)

    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'O mnie', path: '/about' },
      { name: 'Cennik', path: '/services' },
      { name: 'Sklep', path: '/shop' },
      { name: 'Rezerwacje', path: '/booking' },
      { name: 'Kontakt', path: '/contact' }
    ]

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    const handleLogout = async () => {
      closeMobileMenu()
      try {
        await logout()
        router.push('/')
      } catch (error) {
        toast.error('Błąd podczas wylogowania')
      }
    }

    // Zamknij menu przy zmianie trasy
    watch(() => route.path, () => {
      closeMobileMenu()
    })

    return {
      user,
      navLinks,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      handleLogout
    }
  }
}
</script> 