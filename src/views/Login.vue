<template>
  <div class="login bg-dark min-h-screen flex items-center justify-center px-4 pt-20">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 border border-gray-800 shadow-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-black mb-2">
            {{ isLogin ? 'Zaloguj się' : 'Zarejestruj się' }}
          </h1>
          <p class="text-gray-400">
            {{ isLogin ? 'Witaj ponownie!' : 'Stwórz nowe konto' }}
          </p>
        </div>

        <!-- Error -->
        <div v-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
          {{ error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="twoj@email.com"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold mb-2">Hasło</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary hover:bg-red-600 text-white py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span v-if="loading">Ładowanie...</span>
            <span v-else>{{ isLogin ? 'Zaloguj się' : 'Zarejestruj się' }}</span>
          </button>
        </form>

        <!-- Toggle -->
        <div class="mt-6 text-center">
          <button
            @click="isLogin = !isLogin"
            class="text-gray-400 hover:text-primary transition-colors"
          >
            {{ isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się' }}
          </button>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
          ← Powrót do strony głównej
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from 'vue-toastification' 

export default {
  name: 'Login',
  setup() {
    const toast = useToast() 
    const router = useRouter()
    const { user, error, loading, login, signup } = useAuth()

    const isLogin = ref(true)
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      try {
        if (isLogin.value) {
          await login(email.value, password.value)
          toast.success('Zalogowano pomyślnie!') 
        } else {
          await signup(email.value, password.value)
          toast.success('Konto utworzone pomyślnie!') 
        }
        
        const redirect = router.currentRoute.value.query.redirect || '/dashboard'
        router.push(redirect)
      } catch (err) {
        console.error('Auth error:', err)
        toast.error(error.value || 'Wystąpił błąd') 
      }
    }

    return {
      isLogin,
      email,
      password,
      error,
      loading,
      handleSubmit
    }
  }
}
</script>