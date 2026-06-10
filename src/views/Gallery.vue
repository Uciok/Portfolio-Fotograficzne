<template>
  <div class="gallery bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p class="text-gray-400 mt-4">Ładowanie galerii...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-6 py-4 rounded-xl mb-8">
        {{ error }}
      </div>

      <!-- Gallery Content -->
      <div v-else-if="gallery">
        <!-- Header -->
        <div class="mb-12" data-aos="fade-up">
          <router-link to="/galleries" class="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Powrót do galerii
          </router-link>

          <h1 class="text-5xl font-black mb-4">
            {{ gallery.title }}
          </h1>
          <p class="text-gray-400 text-lg mb-4">{{ gallery.description }}</p>
          
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ gallery.photos?.length || 0 }} zdjęć</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(gallery.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Photos Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div
            v-for="(photo, index) in gallery.photos"
            :key="photo.id"
            class="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 50"
          >
            <!-- Photo -->
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="photo.url"
                :alt="photo.filename"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <!-- Download Button -->
            <div class="p-4">
              
                <a :href="photo.url"
                :download="photo.filename"
                target="_blank"
                class="w-full bg-primary hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Pobierz zdjęcie
              </a>
            </div>
          </div>
        </div>

        <!-- Download All Button -->
        <div class="text-center" data-aos="fade-up">
          <button
            @click="downloadAll"
            :disabled="downloading"
            class="bg-gray-800 hover:bg-gray-700 text-white px-12 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg v-if="!downloading" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <div v-else class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            <span v-if="!downloading">Pobierz wszystkie ({{ gallery.photos?.length || 0 }})</span>
            <span v-else>Pakowanie...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import JSZip from 'jszip'

export default {
  name: 'Gallery',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { user } = useAuth()

    const gallery = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const downloading = ref(false)

    // Pobierz galerię
    const fetchGallery = async () => {
      if (!user.value) {
        router.push('/login')
        return
      }

      try {
        loading.value = true
        error.value = null

        const galleryId = route.params.id
        const docRef = doc(db, 'galleries', galleryId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          
          // Sprawdź czy użytkownik ma dostęp
          if (data.clientId !== user.value.uid) {
            error.value = 'Nie masz dostępu do tej galerii.'
            return
          }

          gallery.value = {
            id: docSnap.id,
            ...data
          }
        } else {
          error.value = 'Galeria nie została znaleziona.'
        }
      } catch (err) {
        console.error('Error fetching gallery:', err)
        error.value = 'Nie udało się pobrać galerii.'
      } finally {
        loading.value = false
      }
    }

    // Download all as ZIP
    const downloadAll = async () => {
      if (!gallery.value || !gallery.value.photos) return
      
      try {
        downloading.value = true
        
        const zip = new JSZip()
        const folder = zip.folder(gallery.value.title)
        
        // Pobierz wszystkie zdjęcia
        const promises = gallery.value.photos.map(async (photo) => {
          try {
            const response = await fetch(photo.url)
            const blob = await response.blob()
            folder.file(photo.filename, blob)
          } catch (err) {
            console.error(`Error downloading ${photo.filename}:`, err)
          }
        })
        
        await Promise.all(promises)
        
        // Generuj ZIP
        const content = await zip.generateAsync({ 
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        })
        
        // Pobierz ZIP
        const link = document.createElement('a')
        link.href = URL.createObjectURL(content)
        link.download = `${gallery.value.title}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Cleanup
        URL.revokeObjectURL(link.href)
        
      } catch (err) {
        console.error('Error downloading photos:', err)
        alert('Nie udało się pobrać zdjęć. Spróbuj ponownie.')
      } finally {
        downloading.value = false
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
      fetchGallery()
    })

    return {
      gallery,
      loading,
      error,
      downloading,
      downloadAll,
      formatDate
    }
  }
}
</script>