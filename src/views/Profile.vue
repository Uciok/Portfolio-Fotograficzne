<template>
  <div class="profile bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-12" data-aos="fade-up">
        <h1 class="text-5xl font-black mb-4">
          Mój <span class="text-primary">Profil</span>
        </h1>
        <p class="text-gray-400 text-lg">Zarządzaj swoimi danymi</p>
      </div>

      <!-- Profile Card -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 mb-8" data-aos="fade-up">
        <!-- Avatar -->
        <div class="flex items-center gap-6 mb-8">
          <div class="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-2">{{ displayName || 'Użytkownik' }}</h2>
            <p class="text-gray-400">{{ user?.email }}</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
          <!-- Display Name -->
          <div>
            <label class="block text-sm font-semibold mb-2">Imię i nazwisko</label>
            <input
              v-model="displayName"
              type="text"
              placeholder="Jan Kowalski"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <!-- Email (readonly) -->
          <div>
            <label class="block text-sm font-semibold mb-2">Email</label>
            <input
              :value="user?.email"
              type="email"
              disabled
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 opacity-50 cursor-not-allowed"
            />
            <p class="text-xs text-gray-500 mt-2">Email nie może być zmieniony</p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold mb-2">Telefon (opcjonalnie)</label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+48 123 456 789"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <!-- Save Button -->
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="saving"
              class="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Zapisywanie...' : 'Zapisz zmiany' }}
            </button>
            <router-link
              to="/dashboard"
              class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
            >
              Anuluj
            </router-link>
          </div>
        </form>
      </div>

      <!-- Account Info -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800" data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-xl font-bold mb-4">Informacje o koncie</h3>
        <div class="space-y-3 text-sm text-gray-400">
          <div class="flex justify-between">
            <span>Status konta:</span>
            <span class="text-green-500 font-semibold">Aktywne</span>
          </div>
          <div class="flex justify-between">
            <span>Data rejestracji:</span>
            <span>{{ createdAt }}</span>
          </div>
          <div class="flex justify-between">
            <span>ID użytkownika:</span>
            <span class="font-mono text-xs">{{ user?.uid?.substring(0, 16) }}...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export default {
  name: 'Profile',
  setup() {
    const { user } = useAuth()
    const router = useRouter()
    const { success, error: showError } = useToast()

    if (!user.value) {
      router.push('/login')
    }

    const displayName = ref('')
    const phone = ref('')
    const saving = ref(false)

    const createdAt = computed(() => {
      if (!user.value?.metadata?.creationTime) return 'Nieznana'
      const date = new Date(user.value.metadata.creationTime)
      return date.toLocaleDateString('pl-PL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    })

    // Load user data from Firestore
    const loadUserData = async () => {
      if (!user.value) return
      
      try {
        const docRef = doc(db, 'users', user.value.uid)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          displayName.value = data.displayName || ''
          phone.value = data.phone || ''
        }
      } catch (err) {
        console.error('Error loading user data:', err)
      }
    }

    // Save user data
    const handleUpdateProfile = async () => {
      if (!user.value) return
      
      try {
        saving.value = true
        
        const docRef = doc(db, 'users', user.value.uid)
        await setDoc(docRef, {
          displayName: displayName.value,
          phone: phone.value,
          email: user.value.email,
          updatedAt: new Date()
        }, { merge: true })
        
        success('Profil zaktualizowany pomyślnie!')
      } catch (err) {
        console.error('Error updating profile:', err)
        showError('Nie udało się zaktualizować profilu')
      } finally {
        saving.value = false
      }
    }

    // Load data on mount
    loadUserData()

    return {
      user,
      displayName,
      phone,
      saving,
      createdAt,
      handleUpdateProfile
    }
  }
}
</script>