<template>
  <div class="my-purchases bg-dark min-h-screen pt-32 px-4 pb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12" data-aos="fade-up">
        <h1 class="text-5xl font-black mb-4">
          Moje <span class="text-primary">Zakupy</span>
        </h1>
        <p class="text-gray-400 text-lg">Twoje zakupione presety i produkty</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p class="text-gray-400 mt-4">Ładowanie zakupów...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500 text-red-500 px-6 py-4 rounded-xl mb-8">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="purchases.length === 0" class="text-center py-20" data-aos="fade-up">
        <svg class="w-24 h-24 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h2 class="text-2xl font-bold mb-4">Brak zakupów</h2>
        <p class="text-gray-400 mb-8">Nie masz jeszcze żadnych zakupionych produktów.</p>
        <router-link 
          to="/shop" 
          class="inline-block bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
        >
          Przejdź do sklepu
        </router-link>
      </div>

      <!-- Purchases List -->
      <div v-else class="space-y-6">
        <div
          v-for="(purchase, index) in purchases"
          :key="purchase.id"
          class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 50"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Product Image -->
            <div class="w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
              <img
                :src="purchase.productImage"
                :alt="purchase.productName"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold mb-2">{{ purchase.productName }}</h3>
                  <p class="text-gray-400 text-sm mb-2">
                    Zakupiono: {{ formatDate(purchase.purchaseDate) }}
                  </p>
                  <div class="flex items-center gap-2">
                    <span
                      :class="{
                        'bg-green-500/20 text-green-500': purchase.status === 'completed',
                        'bg-yellow-500/20 text-yellow-500': purchase.status === 'pending',
                        'bg-red-500/20 text-red-500': purchase.status === 'failed'
                      }"
                      class="px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {{ getStatusText(purchase.status) }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-black text-primary">{{ purchase.price }} zł</div>
                </div>
              </div>

              <!-- Download Button -->
              <div class="flex gap-4">
                
                 <a v-if="purchase.status === 'completed'"
                  :href="purchase.downloadUrl"
                  target="_blank"
                  class="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Pobierz produkt
                </a>
                <button
                  @click="copyDownloadLink(purchase.downloadUrl)"
                  class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Kopiuj link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-12 p-6 bg-blue-500/10 border border-blue-500/50 rounded-xl" data-aos="fade-up">
        <div class="flex gap-4">
          <svg class="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div class="font-bold text-blue-400 mb-1">Twoje zakupy</div>
            <div class="text-gray-300 text-sm">
              Linki do pobrania są ważne bezterminowo. Możesz pobrać produkty wielokrotnie. 
              Jeśli masz problem z pobraniem, <router-link to="/contact" class="text-primary hover:underline">skontaktuj się z nami</router-link>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'

export default {
  name: 'MyPurchases',
  setup() {
    const { user } = useAuth()
    const router = useRouter()
    const { success } = useToast()

    if (!user.value) {
      router.push('/login')
    }

    const purchases = ref([])
    const loading = ref(true)
    const error = ref(null)

    // Fetch purchases
    const fetchPurchases = async () => {
      if (!user.value) {
        setTimeout(fetchPurchases, 100)
        return
      }

      try {
        loading.value = true
        error.value = null

        console.log('🔍 Fetching purchases for user:', user.value.uid)

        const q = query(
          collection(db, 'purchases'),
          where('userId', '==', user.value.uid),
          orderBy('purchaseDate', 'desc')
        )

        const querySnapshot = await getDocs(q)
        
        console.log('📦 Query snapshot size:', querySnapshot.size)
        
        purchases.value = querySnapshot.docs.map(doc => {
          console.log('📄 Document:', doc.id, doc.data())
          return {
            id: doc.id,
            ...doc.data()
          }
        })

        console.log('✅ Total purchases:', purchases.value.length)

      } catch (err) {
        console.error('❌ Error fetching purchases:', err)
        error.value = 'Nie udało się pobrać historii zakupów.'
      } finally {
        loading.value = false
      }
    }

    // Format date
    const formatDate = (timestamp) => {
      if (!timestamp) return ''
      const date = timestamp.toDate()
      return date.toLocaleDateString('pl-PL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Status text
    const getStatusText = (status) => {
      const statuses = {
        completed: 'Zakończone',
        pending: 'Oczekujące',
        failed: 'Nieudane'
      }
      return statuses[status] || status
    }

    // Copy download link
    const copyDownloadLink = (url) => {
      navigator.clipboard.writeText(url)
      success('Link skopiowany do schowka!')
    }

    onMounted(() => {
      fetchPurchases()
    })

    return {
  purchases,       
  loading,         
  error,            
  formatDate,
  getStatusText,
  copyDownloadLink
}
  }
}
</script>