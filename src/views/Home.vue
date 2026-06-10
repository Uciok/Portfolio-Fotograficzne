<template>
  <div class="home relative">
    <!-- Slider -->
    <div class="slider relative overflow-hidden h-screen">
      <!-- Zdjęcia -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide absolute inset-0 transition-all duration-1000 ease-in-out"
        :class="{ 
          'opacity-100 scale-100': currentSlide === index, 
          'opacity-0 scale-110': currentSlide !== index 
        }"
      >
        <picture>
          <source 
            media="(min-width: 768px)" 
            :srcset="desktopImages[index]"
          >
          <img 
            :src="mobileImages[index]" 
            :alt="'Slide ' + (index + 1)" 
            class="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>

      <!-- Strzałki nawigacji -->
      <button
        @click="prevSlide"
        class="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-14 md:h-14 rounded-full z-20 transition-all duration-300 flex items-center justify-center text-lg md:text-2xl"
      >
        ←
      </button>
      <button
        @click="nextSlide"
        class="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-14 md:h-14 rounded-full z-20 transition-all duration-300 flex items-center justify-center text-lg md:text-2xl"
      >
        →
      </button>

      <!-- Dots -->
      <div class="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="goToSlide(index)"
          class="transition-all duration-300"
          :class="currentSlide === index ? 'w-8 md:w-12 h-2 md:h-3 bg-white rounded-full' : 'w-2 md:w-3 h-2 md:h-3 bg-white/50 rounded-full hover:bg-white/80'"
        ></button>
      </div>

      <!-- Licznik -->
      <div class="absolute bottom-6 md:bottom-12 right-4 md:right-8 text-white text-sm md:text-lg font-semibold z-20 bg-black/40 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
        {{ currentSlide + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Sekcja intro -->
    <div class="bg-dark py-20 md:py-32 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h2 
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8"
          data-aos="fade-up"
        >
          Uwieczniam Twoje chwile
        </h2>
        <p 
          class="text-gray-400 text-base md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Od samochodów po ludzi - Każdy kadr to dzieło sztuki. Nie ma być perfekcyjnie, ma być prawdziwie. 
          W sesjach stawiam na naturalność i zatrzymanie chwili.
        </p>
        <div 
          class="flex flex-col sm:flex-row justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <router-link
            to="/portfolio"
            class="bg-primary hover:bg-red-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all duration-300 text-base md:text-lg font-semibold hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-1"
          >
            Zobacz Portfolio
          </router-link>
          <router-link
            to="/contact"
            class="bg-gray-800 hover:bg-gray-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all duration-300 text-base md:text-lg font-semibold hover:shadow-lg hover:-translate-y-1"
          >
            Skontaktuj się
          </router-link>
        </div>
      </div>
    </div>

    <!-- Sekcja: O mnie -->
    <div class="bg-gradient-to-br from-gray-950 to-black py-20 md:py-32 px-4 relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div 
            class="order-2 md:order-1 relative"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-primary to-red-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                src="/images/ja-gero.JPG"
                alt="Dawid"
                class="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700 w-full"
              />
            </div>
          </div>

          <div 
            class="order-1 md:order-2 text-center md:text-left"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8">
              Poznaj <span class="text-primary">Fotografa</span>
            </h2>
            <p class="text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
              Jestem <span class="text-white font-bold">Dawid</span> i od lat zajmuję się fotografią motoryzacyjną oraz portretową. 
              Moją misją jest uchwycenie emocji, charakteru i piękna w każdym kadrze.
            </p>
            <p class="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Zrealizowałem ponad <span class="text-primary font-bold text-xl md:text-2xl">200 sesji</span>, a każda z nich była wyjątkowym wyzwaniem i przygodą.
            </p>
            <router-link
              to="/about"
              class="inline-block bg-primary hover:bg-red-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-500 font-bold shadow-2xl shadow-primary/50 hover:shadow-primary/80 hover:scale-110"
            >
              Dowiedz się więcej
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Sekcja: Bestseller pakiety -->
    <div class="bg-black py-20 md:py-32 px-4 relative overflow-hidden">
      <div class="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-12 md:mb-20">
          <h2 
            class="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6"
            data-aos="fade-up"
          >
            Popularne <span class="text-primary">Pakiety</span>
          </h2>
          <p 
            class="text-gray-400 text-base md:text-xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Najczęściej wybierane przez klientów
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <!-- Pakiet 1 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 relative"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="absolute top-4 right-4 bg-primary/10 text-primary px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold">
              BESTSELLER
            </div>
            <div class="text-center mb-6 md:mb-8">
              <h3 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Motoryzacja<br/>STANDARD</h3>
              <div class="text-5xl md:text-6xl font-black text-primary mb-2">799 zł</div>
              <div class="text-gray-400 text-sm md:text-base">25 zdjęć • 2 lokalizacje</div>
            </div>
            <ul class="text-gray-300 space-y-2 md:space-y-3 mb-6 md:mb-10 text-base md:text-lg">
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Ujęcia dynamiczne</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Video 10-15s</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Profesjonalna obróbka</span>
              </li>
            </ul>
            <router-link
              to="/services"
              class="block w-full text-center bg-primary hover:bg-red-600 text-white py-3 md:py-4 rounded-full transition-all duration-500 font-bold shadow-lg hover:shadow-primary/50 hover:scale-105"
            >
              Zobacz szczegóły
            </router-link>
          </div>

          <!-- Pakiet 2 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="text-center mb-6 md:mb-8">
              <h3 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Portret<br/>STANDARD</h3>
              <div class="text-5xl md:text-6xl font-black text-primary mb-2">499 zł</div>
              <div class="text-gray-400 text-sm md:text-base">12 zdjęć • 2 stylizacje</div>
            </div>
            <ul class="text-gray-300 space-y-2 md:space-y-3 mb-6 md:mb-10 text-base md:text-lg">
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Studio lub plener</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Profesjonalny retusz</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Czas: 1 godzina</span>
              </li>
            </ul>
            <router-link
              to="/services"
              class="block w-full text-center bg-gray-800 hover:bg-primary text-white py-3 md:py-4 rounded-full transition-all duration-500 font-bold hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
            >
              Zobacz szczegóły
            </router-link>
          </div>

          <!-- Pakiet 3 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="text-center mb-6 md:mb-8">
              <h3 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Complete<br/>Collection</h3>
              <div class="text-5xl md:text-6xl font-black text-primary mb-2">149 zł</div>
              <div class="text-gray-400 text-sm md:text-base">20 presetów Lightroom</div>
            </div>
            <ul class="text-gray-300 space-y-2 md:space-y-3 mb-6 md:mb-10 text-base md:text-lg">
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Wszystkie formaty</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Video tutorial</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 md:mr-3 text-xl md:text-2xl">✓</span>
                <span>Lifetime updates</span>
              </li>
            </ul>
            <router-link
              to="/shop"
              class="block w-full text-center bg-gray-800 hover:bg-primary text-white py-3 md:py-4 rounded-full transition-all duration-500 font-bold hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
            >
              Zobacz w sklepie
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Sekcja: CTA Rezerwacja -->
    <div class="relative py-16 md:py-24 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-black"></div>
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div 
        class="max-w-4xl mx-auto text-center relative z-10"
        data-aos="fade-up"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          Gotowy na swoją sesję?
        </h2>
        <p class="text-base md:text-lg lg:text-xl mb-6 md:mb-10 text-white/90 max-w-2xl mx-auto">
          Umów się już dziś i utwórz niezapomniane wspomnienia. 
          Dostępne terminy wypełniają się szybko!
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link
            to="/booking"
            class="bg-white hover:bg-gray-100 text-black px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all duration-300 text-base md:text-lg font-semibold hover:shadow-lg hover:-translate-y-1"
          >
            Zarezerwuj termin
          </router-link>
          <router-link
            to="/contact"
            class="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all duration-300 text-base md:text-lg font-semibold"
          >
            Zadaj pytanie
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      currentSlide: 0,
      // Zdjęcia poziome dla desktop (16:9)
      desktopImages: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=1920&h=1080&fit=crop',
      ],
      // Zdjęcia pionowe dla mobile (9:16)
      mobileImages: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1080&h=1920&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&h=1920&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1080&h=1920&fit=crop',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1080&h=1920&fit=crop',
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=1080&h=1920&fit=crop',
      ],
      autoplayInterval: null
    }
  },
  computed: {
    images() {
      return this.desktopImages
    }
  },
  mounted() {
    this.startAutoplay()
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length
      this.resetAutoplay()
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
      this.resetAutoplay()
    },
    goToSlide(index) {
      this.currentSlide = index
      this.resetAutoplay()
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
      }
    },
    resetAutoplay() {
      this.stopAutoplay()
      this.startAutoplay()
    }
  }
}
</script>