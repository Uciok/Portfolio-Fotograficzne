<template>
  <div class="shop bg-dark min-h-screen">
    <!-- Hero Section -->
    <div class="relative py-32 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-black"></div>
      <div class="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <h1 
            class="text-6xl md:text-7xl font-black mb-6"
            data-aos="fade-up"
          >
            Sklep <span class="text-primary">Presetów</span>
          </h1>
          <p 
            class="text-gray-400 text-xl max-w-2xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Profesjonalne presety Lightroom stworzone podczas setek sesji. Nadaj swoim zdjęciom unikalny charakter!
          </p>
          
          <!-- Stats -->
          <div class="flex justify-center gap-8 flex-wrap" data-aos="fade-up" data-aos-delay="200">
            <div class="text-center">
              <div class="text-4xl font-black text-primary">500+</div>
              <div class="text-gray-400 text-sm">Zadowolonych klientów</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-black text-primary">100%</div>
              <div class="text-gray-400 text-sm">Gwarancja zwrotu</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-black text-primary">24/7</div>
              <div class="text-gray-400 text-sm">Dostęp do plików</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtry i Search -->
    <div class="bg-black py-8 px-4 sticky top-20 z-30 border-b border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="w-full md:w-96">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Szukaj presetów..."
                class="w-full bg-gray-900 text-white px-6 py-3 rounded-lg border border-gray-800 focus:border-primary outline-none transition-colors"
              />
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Filtry -->
          <div class="flex gap-3 flex-wrap justify-center">
            <button
              @click="activeFilter = 'all'"
              :class="activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
              class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
            >
              Wszystkie
            </button>
            <button
              @click="activeFilter = 'automotive'"
              :class="activeFilter === 'automotive' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
              class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
            >
              Motoryzacja
            </button>
            <button
              @click="activeFilter = 'portrait'"
              :class="activeFilter === 'portrait' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
              class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
            >
              Portrety
            </button>
            <button
              @click="activeFilter = 'universal'"
              :class="activeFilter === 'universal' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
              class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
            >
              Uniwersalne
            </button>
          </div>

          <!-- Sortowanie -->
          <select
            v-model="sortBy"
            class="bg-gray-900 text-white px-6 py-3 rounded-lg border border-gray-800 focus:border-primary outline-none transition-colors cursor-pointer"
          >
            <option value="popular">Najpopularniejsze</option>
            <option value="price-low">Cena: od najniższej</option>
            <option value="price-high">Cena: od najwyższej</option>
            <option value="newest">Najnowsze</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Koszyk Mini (floating) -->
    <div 
      v-if="cart.length > 0"
      class="fixed bottom-8 right-8 z-40"
      data-aos="fade-left"
    >
      <button
        @click="showCart = !showCart"
        class="bg-primary hover:bg-red-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center relative transition-all duration-300 hover:scale-110"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span class="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {{ cart.length }}
        </span>
      </button>
    </div>

    <!-- Grid produktów -->
    <div class="py-20 px-4 bg-dark">
      <div class="max-w-7xl mx-auto">
        <!-- Liczba wyników -->
        <div class="mb-8 text-gray-400">
          Znaleziono <span class="text-white font-bold">{{ filteredProducts.length }}</span> produktów
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 group relative"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <!-- Badge -->
            <div v-if="product.badge" class="absolute top-4 right-4 z-10">
              <span 
                :class="{
                  'bg-primary': product.badge === 'BESTSELLER',
                  'bg-yellow-600': product.badge === 'NOWOŚĆ',
                  'bg-green-600': product.badge === 'PROMOCJA'
                }"
                class="px-4 py-1 rounded-full text-sm font-bold"
              >
                {{ product.badge }}
              </span>
            </div>

            <!-- Wishlist -->
            <button
              @click="toggleWishlist(product.id)"
              class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            >
              <svg 
                class="w-5 h-5 transition-colors"
                :class="isInWishlist(product.id) ? 'text-primary fill-primary' : 'text-white'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>

            <!-- Zdjęcie -->
            <div 
              class="relative h-64 overflow-hidden cursor-pointer"
              @click="openQuickView(product)"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span class="text-white font-bold">Podgląd →</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-2xl font-bold">{{ product.title }}</h3>
                <span 
                  class="px-3 py-1 rounded-full text-xs font-bold"
                  :class="{
                    'bg-blue-500/20 text-blue-400': product.category === 'automotive',
                    'bg-purple-500/20 text-purple-400': product.category === 'portrait',
                    'bg-green-500/20 text-green-400': product.category === 'universal'
                  }"
                >
                  {{ getCategoryName(product.category) }}
                </span>
              </div>
              
              <p class="text-gray-400 mb-4 text-sm">{{ product.description }}</p>

              <!-- Features -->
              <div class="flex gap-4 mb-4 text-xs text-gray-500">
                <span>{{ product.count }} presetów</span>
                <span>•</span>
                <span>{{ product.downloads }}+ pobrań</span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2 mb-4">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-yellow-500">
                    {{ i <= product.rating ? '★' : '☆' }}
                  </span>
                </div>
                <span class="text-sm text-gray-400">({{ product.reviews }} opinii)</span>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div v-if="product.oldPrice" class="text-gray-500 line-through text-sm">
                    {{ product.oldPrice }} zł
                  </div>
                  <div class="text-3xl font-black text-primary">
                    {{ product.price }} zł
                  </div>
                </div>
                <button
                  @click="addToCart(product)"
                  :disabled="isInCart(product.id)"
                  :class="isInCart(product.id) ? 'bg-green-600 cursor-not-allowed' : 'bg-primary hover:bg-red-600'"
                  class="px-6 py-3 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 disabled:scale-100"
                >
                  {{ isInCart(product.id) ? '✓ W koszyku' : 'Dodaj do koszyka' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View Modal -->
    <div
      v-if="quickViewProduct"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      @click="closeQuickView"
    >
      <div 
        class="bg-gray-900 rounded-3xl max-w-4xl w-full p-8 relative my-8"
        @click.stop
        data-aos="zoom-in"
      >
        <button
          @click="closeQuickView"
          class="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors z-10"
        >
          ×
        </button>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Galeria zdjęć -->
<div>
  <img
    :src="quickViewImages[currentImageIndex]"
    :alt="quickViewProduct.title"
    class="w-full rounded-2xl mb-4 object-contain max-h-96 bg-gray-950"
  />
            <div class="grid grid-cols-4 gap-2">
              <img
                v-for="(img, index) in quickViewImages"
                :key="index"
                :src="img"
                @click="currentImageIndex = index"
                class="w-full h-20 object-cover rounded-lg cursor-pointer transition-all duration-300"
                :class="currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-50 hover:opacity-100'"
              />
            </div>
          </div>

          <!-- Info -->
          <div>
            <h2 class="text-3xl font-black mb-4">{{ quickViewProduct.title }}</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">{{ quickViewProduct.description }}</p>

            <!-- Features list -->
            <div class="mb-6">
              <h4 class="font-bold text-lg mb-3">Co zawiera pakiet:</h4>
              <ul class="space-y-2 text-gray-300 text-sm">
                <li class="flex items-start gap-2">
                  <span class="text-primary">✓</span>
                  <span>{{ quickViewProduct.count }} profesjonalnych presetów</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">✓</span>
                  <span>Instrukcja instalacji (PDF + Video)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">✓</span>
                  <span>Darmowe aktualizacje (lifetime)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">✓</span>
                  <span>Kompatybilność: Lightroom Classic, CC, Mobile</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">✓</span>
                  <span>Wsparcie techniczne</span>
                </li>
              </ul>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex text-xl">
                <span v-for="i in 5" :key="i" class="text-yellow-500">
                  {{ i <= quickViewProduct.rating ? '★' : '☆' }}
                </span>
              </div>
              <span class="text-gray-400 text-sm">{{ quickViewProduct.rating }}/5 ({{ quickViewProduct.reviews }} opinii)</span>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <div v-if="quickViewProduct.oldPrice" class="text-gray-500 line-through text-lg mb-1">
                {{ quickViewProduct.oldPrice }} zł
              </div>
              <div class="text-4xl font-black text-primary mb-2">
                {{ quickViewProduct.price }} zł
              </div>
              <div class="text-sm text-gray-400">Płatność jednorazowa, dostęp na zawsze</div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4">
              <button
                @click="addToCart(quickViewProduct); closeQuickView()"
                class="flex-1 bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Dodaj do koszyka
              </button>
              <button
                @click="toggleWishlist(quickViewProduct.id)"
                class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all duration-300"
              >
                <svg class="w-5 h-5" :class="isInWishlist(quickViewProduct.id) ? 'text-primary fill-primary' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Koszyk Sidebar -->
    <div
      v-if="showCart"
      class="fixed inset-0 z-50"
      @click="showCart = false"
    >
      <div class="absolute inset-0 bg-black/80"></div>
      <div 
        class="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl overflow-y-auto"
        @click.stop
      >
        <div class="p-8">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-3xl font-black">Koszyk</h3>
            <button
              @click="showCart = false"
              class="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div v-if="cart.length === 0" class="text-center py-12">
            <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p class="text-gray-400 text-lg">Koszyk jest pusty</p>
          </div>

          <div v-else>
            <!-- Lista produktów -->
            <div class="space-y-4 mb-8">
              <div
                v-for="item in cart"
                :key="item.id"
                class="bg-gray-800 rounded-xl p-4 flex gap-4"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-20 h-20 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h4 class="font-bold mb-1">{{ item.title }}</h4>
                  <p class="text-primary font-bold">{{ item.price }} zł</p>
                </div>
                <button
                  @click="removeFromCart(item.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Podsumowanie -->
            <div class="border-t border-gray-800 pt-6 mb-6">
              <div class="flex justify-between mb-2 text-gray-400">
                <span>Produkty ({{ cart.length }})</span>
                <span>{{ cartSubtotal }} zł</span>
              </div>
              <div class="flex justify-between mb-4 text-2xl font-black">
                <span>Razem:</span>
                <span class="text-primary">{{ cartTotal }} zł</span>
              </div>
              <p class="text-xs text-gray-500">Płatność jednorazowa. Natychmiastowy dostęp.</p>
            </div>

            <!-- Przyciski -->
            <div class="space-y-3">
              <button
                class="w-full bg-primary hover:bg-red-600 text-white py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
              >
                Przejdź do płatności
              </button>
              <button
                @click="clearCart"
                class="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-full font-bold transition-all duration-300"
              >
                Wyczyść koszyk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Section -->
    <div class="py-32 px-4 bg-black">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl font-black text-center mb-16" data-aos="fade-up">
          Dlaczego <span class="text-primary">warto</span>?
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="text-6xl mb-4">🎨</div>
            <h3 class="text-2xl font-bold mb-3">Profesjonalna jakość</h3>
            <p class="text-gray-400">Stworzone podczas setek sesji. Sprawdzone na tysiącach zdjęć.</p>
          </div>

          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="text-6xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold mb-3">Natychmiastowy dostęp</h3>
            <p class="text-gray-400">Po zakupie otrzymasz link do pobrania w ciągu 5 minut.</p>
          </div>

          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="text-6xl mb-4">🔄</div>
            <h3 class="text-2xl font-bold mb-3">Darmowe aktualizacje</h3>
            <p class="text-gray-400">Lifetime updates bez dodatkowych opłat. Raz kupujesz, zawsze masz.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Slider -->
    <div class="py-32 px-4 bg-dark overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl font-black text-center mb-16" data-aos="fade-up">
          Co mówią <span class="text-primary">klienci</span>?
        </h2>

        <div class="relative">
          <!-- Slider Container -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
            >
              <div
                v-for="(testimonial, index) in testimonials"
                :key="index"
                class="w-full flex-shrink-0 px-4"
              >
                <div class="max-w-4xl mx-auto">
                  <div class="bg-gray-900 rounded-3xl p-12 text-center">
                    <!-- Stars -->
                    <div class="flex justify-center text-yellow-500 text-3xl mb-6">
                      ★★★★★
                    </div>
                    
                    <!-- Quote -->
                    <p class="text-gray-300 text-xl md:text-2xl mb-8 leading-relaxed italic">
                      "{{ testimonial.text }}"
                    </p>
                    
                    <!-- Author -->
                    <div class="flex items-center justify-center gap-4">
                      <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center font-bold text-2xl">
                        {{ testimonial.name.charAt(0) }}
                      </div>
                      <div class="text-left">
                        <div class="font-bold text-xl">{{ testimonial.name }}</div>
                        <div class="text-gray-500">{{ testimonial.role }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="prevTestimonial"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center text-2xl z-10"
          >
            ←
          </button>
          <button
            @click="nextTestimonial"
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center text-2xl z-10"
          >
            →
          </button>

          <!-- Dots -->
          <div class="flex justify-center gap-3 mt-8">
            <button
              v-for="(testimonial, index) in testimonials"
              :key="index"
              @click="goToTestimonial(index)"
              class="transition-all duration-300"
              :class="currentTestimonial === index ? 'w-12 h-3 bg-primary rounded-full' : 'w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-400'"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-32 px-4 bg-black">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-5xl font-black text-center mb-16" data-aos="fade-up">
          Często zadawane <span class="text-primary">pytania</span>
        </h2>

        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-gray-900 rounded-xl overflow-hidden"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800 transition-colors"
            >
              <span class="text-xl font-bold pr-4">{{ faq.question }}</span>
              <span class="text-3xl text-primary transition-transform duration-300" :class="{ 'rotate-45': faq.open }">
                +
              </span>
            </button>
            <div 
              v-show="faq.open"
              class="px-6 pb-6 text-gray-400 leading-relaxed whitespace-pre-line"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data() {
    return {
      searchQuery: '',
      activeFilter: 'all',
  sortBy: 'popular',
  cart: [],
  wishlist: [],
  showCart: false,
  quickViewProduct: null,
  currentImageIndex: 0,
  currentTestimonial: 0,
 products: [
  {
    id: 1,
    title: 'Automotive Pro',
    description: 'Pakiet 25 presetów idealnych do fotografii motoryzacyjnej. Intensywne kolory, mocne kontrasty.',
    category: 'automotive',
    price: 149,
    oldPrice: null,
    count: 25,
    downloads: 250,
    rating: 5,
    reviews: 45,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'Portrait Collection',
    description: 'Kompletna kolekcja 30 presetów portretowych. Od naturalnych po artystyczne.',
    category: 'portrait',
    price: 99,
    oldPrice: 149,
    count: 30,
    downloads: 180,
    rating: 5,
    reviews: 32,
    badge: 'PROMOCJA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 3,
    title: 'Complete Collection',
    description: 'Kompletna kolekcja wszystkich moich presetów. Najlepsza oferta!',
    category: 'universal',
    price: 199,
    oldPrice: 298,
    count: 50,
    downloads: 320,
    rating: 5,
    reviews: 67,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Moody Automotive',
    description: '15 presetów z klimatycznymi, ciemnymi tonacjami dla aut.',
    category: 'automotive',
    price: 79,
    oldPrice: null,
    count: 15,
    downloads: 95,
    rating: 4,
    reviews: 18,
    badge: null,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 5,
    title: 'Cinematic Pack',
    description: '20 presetów filmowych idealnych do storytelling.',
    category: 'universal',
    price: 119,
    oldPrice: null,
    count: 20,
    downloads: 140,
    rating: 5,
    reviews: 28,
    badge: 'NOWOŚĆ',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 6,
    title: 'Natural Beauty',
    description: '18 presetów z naturalnymi, ciepłymi tonacjami dla portretów.',
    category: 'portrait',
    price: 89,
    oldPrice: null,
    count: 18,
    downloads: 110,
    rating: 5,
    reviews: 24,
    badge: null,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=400&fit=crop'
    ]
  }
],
  testimonials: [
    {
      name: 'Michał K.',
      role: 'Fotograf motoryzacyjny',
      text: 'Używam tych presetów od pół roku. Ogromne przyspieszenie pracy przy obróbce. Klienci są zachwyceni efektami!'
    },
    {
      name: 'Anna W.',
      role: 'Fotografka portretowa',
      text: 'Najlepsze presety jakie kupiłam. Naturalne kolory, świetnie działają na różnych typach skóry. Polecam każdemu!'
    },
    {
      name: 'Paweł D.',
      role: 'Content creator',
      text: 'Complete Collection to najlepsza inwestycja. Jeden preset, dwa kliknięcia i zdjęcie wygląda profesjonalnie. Oszczędzam godziny pracy!'
    },
    {
      name: 'Karolina M.',
      role: 'Fotografka ślubna',
      text: 'Od kiedy kupiłam pakiet portretowy, moja obróbka nabrała spójności. Klienci pytają co zmieniłam - wszystko dzięki tym presetom!'
    },
    {
      name: 'Tomasz B.',
      role: 'Fotograf automotive',
      text: 'Automotive Pro to must-have dla każdego fotografa samochodowego. Kolory są intensywne, kontrasty idealne. 10/10!'
    },
    {
      name: 'Magda S.',
      role: 'Influencerka',
      text: 'Używam Cinematic Pack do wszystkich postów na Instagramie. Feed wygląda spójnie i profesjonalnie. Warto!'
    },
    {
      name: 'Jakub L.',
      role: 'Fotograf komercyjny',
      text: 'Kupiłem Complete Collection i nie żałuję ani złotówki. Mam preset na każdą okazję. Jakość rewelacyjna!'
    },
    {
      name: 'Ola K.',
      role: 'Fotografka lifestyle',
      text: 'Natural Beauty to mój ulubiony pakiet. Zdjęcia wyglądają naturalnie ale profesjonalnie. Moje klientki są szczęśliwe!'
    }
  ],
  faqs: [
    {
      question: 'Jak instalować presety?',
      answer: 'Do każdego pakietu dołączona jest szczegółowa instrukcja instalacji w formie PDF oraz video tutorial. Instalacja trwa 2-3 minuty.\n\nPresety działają na:\n• Lightroom Classic (Windows/Mac)\n• Lightroom CC (Windows/Mac)\n• Lightroom Mobile (iOS/Android)',
      open: false
    },
    {
      question: 'Czy mogę zwrócić produkt?',
      answer: 'Tak! Oferujemy 100% gwarancję zwrotu pieniędzy w ciągu 30 dni.\n\nJeśli z jakiegokolwiek powodu nie jesteś zadowolony, wystarczy napisać maila a zwrócimy całą kwotę - bez pytań.\n\nTwoje zadowolenie jest najważniejsze!',
      open: false
    },
    {
      question: 'Czy otrzymam aktualizacje?',
      answer: 'Tak! Wszystkie aktualizacje są DARMOWE i na zawsze.\n\nOtrzymasz:\n• Nowe presety dodawane do pakietu\n• Poprawki i optymalizacje\n• Dostęp do nowych wersji\n• Wsparcie techniczne\n\nRaz kupujesz, zawsze masz dostęp!',
      open: false
    },
    {
      question: 'Na ilu komputerach mogę używać?',
      answer: 'Możesz używać presetów na nieograniczonej liczbie swoich urządzeń.\n\nLicencja osobista obejmuje:\n• Wszystkie Twoje komputery\n• Wszystkie Twoje urządzenia mobilne\n• Użytek komercyjny (możesz edytować zdjęcia dla klientów)\n\nNie możesz: odsprzedawać presetów ani udostępniać innym osobom.',
      open: false
    }
  ]
}
},
computed: {
  filteredProducts() {
    let filtered = this.products

    // Filtrowanie po kategorii
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(p => p.category === this.activeFilter)
    }

    // Wyszukiwanie
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      )
    }

    // Sortowanie
    if (this.sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (this.sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (this.sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.downloads - a.downloads)
    } else if (this.sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => b.id - a.id)
    }

    return filtered
  },
  cartSubtotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0)
  },
  cartTotal() {
    return this.cartSubtotal
  },
  quickViewImages() {
    if (!this.quickViewProduct) return []
    
    // Jeśli produkt ma tablicę images, użyj jej
    if (this.quickViewProduct.images && this.quickViewProduct.images.length > 0) {
      return this.quickViewProduct.images
    }
    
    // Fallback - generuj z głównego zdjęcia
    const baseUrl = this.quickViewProduct.image
    return [
      baseUrl,
      baseUrl.replace('?w=', '?seed=1&w='),
      baseUrl.replace('?w=', '?seed=2&w='),
      baseUrl.replace('?w=', '?seed=3&w=')
    ]
  }
},
methods: {
getCategoryName(category) {
const names = {
'automotive': 'Motoryzacja',
'portrait': 'Portrety',
'universal': 'Uniwersalne'
}
return names[category] || category
},
addToCart(product) {
if (!this.isInCart(product.id)) {
this.cart.push({...product})
}
},
removeFromCart(productId) {
this.cart = this.cart.filter(item => item.id !== productId)
},
clearCart() {
if (confirm('Czy na pewno chcesz wyczyścić koszyk?')) {
this.cart = []
}
},
isInCart(productId) {
return this.cart.some(item => item.id === productId)
},
toggleWishlist(productId) {
const index = this.wishlist.indexOf(productId)
if (index > -1) {
this.wishlist.splice(index, 1)
} else {
this.wishlist.push(productId)
}
},
isInWishlist(productId) {
return this.wishlist.includes(productId)
},
openQuickView(product) {
this.quickViewProduct = product
this.currentImageIndex = 0
document.body.style.overflow = 'hidden'
},
closeQuickView() {
this.quickViewProduct = null
document.body.style.overflow = ''
},
toggleFaq(index) {
this.faqs[index].open = !this.faqs[index].open
},
nextTestimonial() {
this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
},
prevTestimonial() {
this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length
},
goToTestimonial(index) {
this.currentTestimonial = index
}
},
beforeUnmount() {
document.body.style.overflow = ''
}
}
</script>
<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}

</style>