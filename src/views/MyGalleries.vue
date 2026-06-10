<template>
  <div class="my-galleries bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12" data-aos="fade-up">
        <h1 class="text-5xl font-black mb-4">
          Moje <span class="text-primary">Galerie</span>
        </h1>
        <p class="text-gray-400 text-lg">Twoje zdjęcia ze sesji</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p class="text-gray-400 mt-4">Ładowanie galerii...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-6 py-4 rounded-xl">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="galleries.length === 0" class="text-center py-20" data-aos="fade-up">
        <svg class="w-24 h-24 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h2 class="text-2xl font-bold mb-4">Brak galerii</h2>
        <p class="text-gray-400 mb-8">Nie masz jeszcze przypisanych żadnych galerii ze zdjęciami.</p>
        <router-link to="/contact" class="inline-block bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300">
          Skontaktuj się
        </router-link>
      </div>

      <!-- Galleries Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="(gallery, index) in galleries"
          :key="gallery.id"
          :to="`/gallery/${gallery.id}`"
          class="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <!-- Cover Image -->
          <div class="aspect-[16/9] overflow-hidden">
            <img
              :src="gallery.coverImage"
              :alt="gallery.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <!-- Info -->
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {{ gallery.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-4">{{ gallery.description }}</p>
            
            <!-- Stats -->
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{{ gallery.photos?.length || 0 }} zdjęć</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{{ formatDate(gallery.createdAt) }}</span>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
              <span>Otwórz galerię</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export default {
  name: 'MyGalleries',
  setup() {
  const router = useRouter()
  const { user } = useAuth()
  
  const galleries = ref([])
  const loading = ref(true)
  const error = ref(null)

  // Pobierz galerie użytkownika
  const fetchGalleries = async () => {
    // Czekaj aż user się załaduje
    if (!user.value) {
      console.log('Waiting for user...')
      setTimeout(fetchGalleries, 100) // Spróbuj ponownie za 100ms
      return
    }

    try {
      loading.value = true
      error.value = null

      console.log('Fetching galleries for user:', user.value.uid)

      const q = query(
        collection(db, 'galleries'),
        where('clientId', '==', user.value.uid)
      )

      const querySnapshot = await getDocs(q)
      galleries.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      console.log('Found galleries:', galleries.value.length)

    } catch (err) {
      console.error('Error fetching galleries:', err)
      error.value = 'Nie udało się pobrać galerii. Spróbuj ponownie później.'
    } finally {
      loading.value = false
    }
  }

  // Format daty
  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = timestamp.toDate()
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  onMounted(() => {
    // Redirect jeśli nie zalogowany
    if (!user.value) {
      router.push({ 
        path: '/login', 
        query: { redirect: '/galleries' } 
      })
    } else {
      fetchGalleries()
    }
  })

  return {
    galleries,
    loading,
    error,
    formatDate
  }
}
}
</script>