<template>
  <div class="dashboard bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12" data-aos="fade-up">
        <h1 class="text-5xl font-black mb-4">
          Witaj, <span class="text-primary">{{ userEmail }}</span>! 👋
        </h1>
        <p class="text-gray-400 text-lg">To jest Twój panel klienta</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <!-- Moje galerie -->
        <div 
          class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-primary/10 p-4 rounded-xl">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <div class="text-4xl font-black">{{ loadingGalleries ? '...' : galleries.length }}</div>
              <div class="text-gray-400 text-sm">Galerii</div>
            </div>
          </div>
          <router-link 
            to="/galleries"
            class="text-primary hover:text-red-400 text-sm font-semibold flex items-center gap-2"
          >
            Zobacz galerie
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>

        <!-- Moje zakupy -->
        <div 
          class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-green-500/10 p-4 rounded-xl">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-4xl font-black">{{ loadingPurchases ? '...' : purchases.length }}</div>
              <div class="text-gray-400 text-sm">Zakupów</div>
            </div>
          </div>
          <router-link 
            to="/my-purchases"
            class="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-2"
          >
            Zobacz zakupy
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>

        <!-- Profil -->
        <div 
          class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-primary/50 transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-purple-500/10 p-4 rounded-xl">
              <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <div class="text-lg font-bold">Profil</div>
              <div class="text-gray-400 text-sm">Ustawienia</div>
            </div>
          </div>
          <router-link 
            to="/profile"
            class="text-purple-500 hover:text-purple-400 text-sm font-semibold flex items-center gap-2"
          >
            Edytuj profil
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800" data-aos="fade-up">
        <h2 class="text-2xl font-bold mb-6">Szybkie akcje</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <router-link
            to="/shop"
            class="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl transition-all duration-300 group"
          >
            <div class="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div>
              <div class="font-bold">Kup presety</div>
              <div class="text-sm text-gray-400">Sklep presetów Lightroom</div>
            </div>
          </router-link>

          <router-link
            to="/booking"
            class="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl transition-all duration-300 group"
          >
            <div class="bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 transition-colors">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <div class="font-bold">Zarezerwuj sesję</div>
              <div class="text-sm text-gray-400">Umów się na sesję zdjęciową</div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-8 p-6 bg-blue-500/10 border border-blue-500/50 rounded-xl" data-aos="fade-up">
        <div class="flex gap-4">
          <svg class="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div class="font-bold text-blue-400 mb-1">Twój panel klienta</div>
            <div class="text-gray-300 text-sm">
              Tutaj możesz przeglądać swoje galerie ze zdjęciami, pobierać zakupione presety i zarządzać profilem. 
              Jeśli masz pytania, <router-link to="/contact" class="text-primary hover:underline">skontaktuj się ze mną</router-link>!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export default {
  name: 'Dashboard',
  setup() {
    const { user } = useAuth()
    const router = useRouter()

    if (!user.value) {
      router.push('/login')
    }

    const userEmail = computed(() => {
      return user.value?.email || 'Gość'
    })

    const galleries = ref([])
    const purchases = ref([])
    const loadingGalleries = ref(true)
    const loadingPurchases = ref(true)

    // Fetch galleries count
    const fetchGalleries = async () => {
      if (!user.value) return

      try {
        loadingGalleries.value = true
        const q = query(
          collection(db, 'galleries'),
          where('clientId', '==', user.value.uid)
        )
        const querySnapshot = await getDocs(q)
        galleries.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (err) {
        console.error('Error fetching galleries:', err)
      } finally {
        loadingGalleries.value = false
      }
    }

    // Fetch purchases count
    const fetchPurchases = async () => {
      if (!user.value) return

      try {
        loadingPurchases.value = true
        const q = query(
          collection(db, 'purchases'),
          where('userId', '==', user.value.uid)
        )
        const querySnapshot = await getDocs(q)
        purchases.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (err) {
        console.error('Error fetching purchases:', err)
      } finally {
        loadingPurchases.value = false
      }
    }

    onMounted(() => {
      fetchGalleries()
      fetchPurchases()
    })

    return {
      userEmail,
      galleries,
      purchases,
      loadingGalleries,
      loadingPurchases
    }
  }
}
</script>