<template>
  <div class="about bg-dark min-h-screen">
    <!-- Hero Section z parallax -->
    <div class="relative overflow-hidden" style="height: calc(100vh - 80px); margin-top: 80px;">
      <div 
        class="absolute inset-0 bg-cover"
        :style="{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: 'url(/images/sony.jpg)',
          backgroundPosition: 'center 10%'
        }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark"></div>
      
      <div class="relative h-full flex items-center justify-center text-center px-4">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            Dawid <span class="text-primary">Uciński</span>
          </h1>
          <p class="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8">
            Fotograf Motoryzacyjny & Portretowy
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a href="#story" class="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 font-bold">
              Poznaj moją historię
            </a>
            <router-link to="/contact" class="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full transition-all duration-300 font-bold">
              Skontaktuj się
            </router-link>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <a 
        href="#story" 
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>

    <!-- Statystyki -->
    <div class="bg-black py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="text-4xl md:text-6xl font-black text-primary mb-2">{{ animatedSessions }}+</div>
            <div class="text-gray-400 text-sm md:text-lg">Zrealizowanych sesji</div>
          </div>
          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="text-4xl md:text-6xl font-black text-primary mb-2">{{ animatedYears }}+</div>
            <div class="text-gray-400 text-sm md:text-lg">Lat doświadczenia</div>
          </div>
          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="text-4xl md:text-6xl font-black text-primary mb-2">{{ animatedClients }}+</div>
            <div class="text-gray-400 text-sm md:text-lg">Zadowolonych klientów</div>
          </div>
          <div 
            class="text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="text-4xl md:text-6xl font-black text-primary mb-2">{{ animatedPhotos }}k+</div>
            <div class="text-gray-400 text-sm md:text-lg">Wykonanych zdjęć</div>
          </div>
        </div>
      </div>
    </div>

   <!-- Historia - Story Section -->
<div id="story" class="bg-dark py-20 md:py-32 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div data-aos="fade-right">
        <div class="relative group">
          <div class="absolute -inset-4 bg-gradient-to-r from-primary to-red-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <img
            src="/images/ja-gero.JPG"
            alt="Dawid"
            class="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700 max-w-md mx-auto w-full"
          />
        </div>
      </div>

      <div data-aos="fade-left" class="text-center md:text-left">
        <h2 class="text-4xl md:text-5xl font-black mb-6 md:mb-8">Moja <span class="text-primary">Historia</span></h2>
        <p class="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          Fotografuję od <span class="text-primary font-bold">ponad 3 lat</span>. 
          Zaczynałem z aparatem i fascynacją samochodami – chciałem pokazać ich <span class="text-white font-bold">moc i charakter</span> 
          w sposób, jakiego nikt wcześniej nie widział.
        </p>
        <p class="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          Dziś specjalizuję się w fotografii <span class="text-primary font-bold">motoryzacyjnej i portretowej</span>. 
          Każda sesja to dla mnie wyzwanie – jak połączyć technikę z emocją? 
          Jak sprawić, by jedno zdjęcie opowiadało całą historię?
        </p>
        <p class="text-gray-300 text-base md:text-lg leading-relaxed">
          Nie tworzę zdjęć "na Instagram". Tworzę <span class="text-white font-bold">wspomnienia</span>, 
          które będziesz chciał oglądać za 10 lat. Bo dobre zdjęcie nie starzeje się – ono dojrzewa.
        </p>
      </div>
    </div>
  </div>
</div>

    <!-- Karty z informacjami -->
    <div class="bg-black py-20 md:py-32 px-4">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-4xl md:text-5xl font-black text-center mb-12 md:mb-16" data-aos="fade-up">
          Co mnie <span class="text-primary">wyróżnia</span>
        </h3>

        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <!-- Karta 1 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-8 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="text-5xl md:text-6xl mb-4 md:mb-6">🎨</div>
            <h4 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Unikalny Styl</h4>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed">
              Każde zdjęcie ma swoją historię. Łączę techniczne umiejętności z artystyczną wizją, tworząc niepowtarzalne kadry.
            </p>
          </div>

          <!-- Karta 2 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-8 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="text-5xl md:text-6xl mb-4 md:mb-6">📸</div>
            <h4 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Profesjonalny Sprzęt</h4>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed">
              Używam najnowszego sprzętu Sony Alpha, obiektywy prime oraz profesjonalne oświetlenie studyjne i plenerowe.
            </p>
          </div>

          <!-- Karta 3 -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-8 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="text-5xl md:text-6xl mb-4 md:mb-6">⚡</div>
            <h4 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Szybka Realizacja</h4>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed">
              Zdjęcia otrzymasz w ciągu 7-14 dni. Priorytetem jest jakość, ale nie zapominam o terminowości.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sprzęt Section -->
    <div class="bg-dark py-20 md:py-32 px-4">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-4xl md:text-5xl font-black text-center mb-12 md:mb-16" data-aos="fade-up">
          Mój <span class="text-primary">Sprzęt</span>
        </h3>

        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
          <div data-aos="fade-right" class="text-center">
            <h4 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-3">
              <span class="text-primary">📷</span> Aparaty
            </h4>
            <ul class="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Sony Alpha 7R IV</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Sony Alpha 7 III</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>DJI Mavic 3</span>
              </li>
            </ul>
          </div>

          <div data-aos="fade-left" class="text-center">
            <h4 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-3">
              <span class="text-primary">🔭</span> Obiektywy
            </h4>
            <ul class="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Sony FE 24-70mm f/2.8 GM II</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Sony FE 85mm f/1.4 GM</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Sony FE 16-35mm f/2.8 GM</span>
              </li>
            </ul>
          </div>

          <div data-aos="fade-right" class="text-center">
            <h4 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-3">
              <span class="text-primary">💡</span> Oświetlenie
            </h4>
            <ul class="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Profoto B10 Plus</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Aputure 300D II</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Softboxy, reflektory, beauty dish</span>
              </li>
            </ul>
          </div>

          <div data-aos="fade-left" class="text-center">
            <h4 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center justify-center gap-3">
              <span class="text-primary">💻</span> Post-produkcja
            </h4>
            <ul class="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Adobe Lightroom Classic</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Adobe Photoshop CC</span>
              </li>
              <li class="flex items-center justify-center gap-3">
                <span class="text-primary">•</span>
                <span>Davinci Resolve</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative py-20 md:py-32 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-black"></div>
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10" data-aos="zoom-in">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8">
          Gotowy na <span class="text-white">współpracę</span>?
        </h2>
        <p class="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-white/90">
          Skontaktuj się ze mną i omówmy Twój projekt!
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link
            to="/contact"
            class="bg-white hover:bg-gray-100 text-black px-8 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-300 text-base md:text-lg font-bold hover:shadow-2xl hover:-translate-y-1"
          >
            Napisz do mnie
          </router-link>
          <router-link
            to="/services"
            class="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-300 text-base md:text-lg font-bold"
          >
            Zobacz ofertę
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      scrollY: 0,
      animatedSessions: 0,
      animatedYears: 0,
      animatedClients: 0,
      animatedPhotos: 0,
      hasAnimated: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.checkStatsVisibility()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
      this.checkStatsVisibility()
    },
    checkStatsVisibility() {
      if (this.hasAnimated) return

      const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4')
      if (!statsSection) return

      const rect = statsSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

      if (isVisible) {
        this.hasAnimated = true
        this.animateStats()
      }
    },
    animateStats() {
      this.animateValue('animatedSessions', 0, 200, 2000)
      this.animateValue('animatedYears', 0, 3, 2000)
      this.animateValue('animatedClients', 0, 200, 2000)
      this.animateValue('animatedPhotos', 0, 30, 2000)
    },
    animateValue(key, start, end, duration) {
      const startTime = performance.now()
      
      const step = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuad = progress * (2 - progress)
        
        this[key] = Math.floor(start + (end - start) * easeOutQuad)
        
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      
      requestAnimationFrame(step)
    }
  }
}
</script>

<style scoped>
.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>