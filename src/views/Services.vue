<template>
  <div class="services bg-dark min-h-screen">
    <!-- Hero Section -->
    <div class="relative py-32 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-black"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <h1 
            class="text-6xl md:text-7xl font-black mb-6"
            data-aos="fade-up"
          >
            Cennik <span class="text-primary">& Pakiety</span>
          </h1>
          <p 
            class="text-gray-400 text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Wybierz idealny pakiet dla siebie. Wszystkie ceny zawierają profesjonalną obróbkę i dostawę w formie cyfrowej.
          </p>
        </div>
      </div>
    </div>

    <!-- Przełącznik kategorii -->
    <div class="bg-black py-8 px-4 sticky top-20 z-30 border-b border-gray-800">
      <div class="max-w-7xl mx-auto flex justify-center gap-4">
        <button
          @click="activeCategory = 'motoryzacja'"
          :class="activeCategory === 'motoryzacja' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
          class="px-8 py-3 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
        >
          Motoryzacja
        </button>
        <button
          @click="activeCategory = 'portrety'"
          :class="activeCategory === 'portrety' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
          class="px-8 py-3 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
        >
          Portrety
        </button>
      </div>
    </div>

    <!-- Pakiety Motoryzacja -->
    <div v-if="activeCategory === 'motoryzacja'" class="py-20 px-4 bg-dark">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- BASIC -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full text-sm font-bold">
              BASIC
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">🚗</div>
              <h3 class="text-3xl font-bold mb-4">Motoryzacja<br/>BASIC</h3>
              <div class="text-6xl font-black text-primary mb-2">499 zł</div>
              <div class="text-gray-400">15 zdjęć • 1 lokalizacja</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja do 1 godziny</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>15 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>1 lokalizacja</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-gray-600 text-2xl">✗</span>
                <span class="text-gray-600">Video</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-gray-800 hover:bg-primary text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105"
            >
              Rezerwuj
            </router-link>
          </div>

          <!-- STANDARD - BESTSELLER -->
          <div 
            class="bg-gradient-to-br from-primary/20 to-gray-950 rounded-3xl p-10 border-2 border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-2 relative scale-105"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full text-sm font-bold">
              ⭐ BESTSELLER
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">🏎️</div>
              <h3 class="text-3xl font-bold mb-4">Motoryzacja<br/>STANDARD</h3>
              <div class="text-6xl font-black text-primary mb-2">799 zł</div>
              <div class="text-gray-400">25 zdjęć • 2 lokalizacje</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja do 2 godzin</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>25 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>2 lokalizacje</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Video 10-15s (Reels/TikTok)</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-primary hover:bg-red-600 text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105 shadow-lg shadow-primary/50"
            >
              Rezerwuj
            </router-link>
          </div>

          <!-- PREMIUM -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-600 px-6 py-2 rounded-full text-sm font-bold">
              PREMIUM
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">🏁</div>
              <h3 class="text-3xl font-bold mb-4">Motoryzacja<br/>PREMIUM</h3>
              <div class="text-6xl font-black text-primary mb-2">1299 zł</div>
              <div class="text-gray-400">40 zdjęć • 3+ lokalizacje</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja do 4 godzin</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>40 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>3+ lokalizacje</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Video 30-60s + montaż</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105"
            >
              Rezerwuj
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Pakiety Portrety -->
    <div v-if="activeCategory === 'portrety'" class="py-20 px-4 bg-dark">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- BASIC -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full text-sm font-bold">
              BASIC
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">📷</div>
              <h3 class="text-3xl font-bold mb-4">Portret<br/>BASIC</h3>
              <div class="text-6xl font-black text-primary mb-2">299 zł</div>
              <div class="text-gray-400">8 zdjęć • 1 stylizacja</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja 30 minut</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>8 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Studio lub plener</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Podstawowy retusz</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-gray-600 text-2xl">✗</span>
                <span class="text-gray-600">Zmiana stylizacji</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-gray-800 hover:bg-primary text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105"
            >
              Rezerwuj
            </router-link>
          </div>

          <!-- STANDARD - BESTSELLER -->
          <div 
            class="bg-gradient-to-br from-primary/20 to-gray-950 rounded-3xl p-10 border-2 border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-2 relative scale-105"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full text-sm font-bold">
              ⭐ BESTSELLER
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">🎭</div>
              <h3 class="text-3xl font-bold mb-4">Portret<br/>STANDARD</h3>
              <div class="text-6xl font-black text-primary mb-2">499 zł</div>
              <div class="text-gray-400">12 zdjęć • 2 stylizacje</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja 1 godzina</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>12 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Studio lub plener</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Profesjonalny retusz</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>2 stylizacje</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-primary hover:bg-red-600 text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105 shadow-lg shadow-primary/50"
            >
              Rezerwuj
            </router-link>
          </div>

          <!-- PREMIUM -->
          <div 
            class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-10 border border-gray-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-600 px-6 py-2 rounded-full text-sm font-bold">
              PREMIUM
            </div>
            <div class="text-center mb-8 pt-4">
              <div class="text-6xl mb-4">👑</div>
              <h3 class="text-3xl font-bold mb-4">Portret<br/>PREMIUM</h3>
              <div class="text-6xl font-black text-primary mb-2">799 zł</div>
              <div class="text-gray-400">20 zdjęć • 3+ stylizacje</div>
            </div>
            <ul class="text-gray-300 space-y-3 mb-10 text-lg">
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Sesja 2 godziny</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>20 zdjęć po obróbce</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Studio + plener</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>Profesjonalny retusz + beauty</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary text-2xl">✓</span>
                <span>3+ stylizacje + makeup artist</span>
              </li>
            </ul>
            <router-link
              to="/booking"
              class="block w-full text-center bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full transition-all duration-500 font-bold hover:scale-105"
            >
              Rezerwuj
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela porównawcza -->
    <div class="py-32 px-4 bg-black">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-5xl font-black text-center mb-16" data-aos="fade-up">
          Porównanie <span class="text-primary">Pakietów</span>
        </h2>

        <!-- Mobile: Accordion style -->
        <div class="md:hidden space-y-4">
          <div 
            v-for="(feature, index) in currentComparisonFeatures"
            :key="index"
            class="bg-gray-900 rounded-xl p-6"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <h4 class="font-bold text-lg mb-4">{{ feature.name }}</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Basic:</span>
                <span>{{ feature.basic }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Standard:</span>
                <span class="text-primary font-bold">{{ feature.standard }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Premium:</span>
                <span>{{ feature.premium }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Table -->
        <div class="hidden md:block overflow-x-auto" data-aos="fade-up">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-800">
                <th class="text-left py-4 px-6 text-xl font-bold">Funkcja</th>
                <th class="text-center py-4 px-6 text-xl font-bold">Basic</th>
                <th class="text-center py-4 px-6 text-xl font-bold bg-primary/10 border-x-2 border-primary">
                  Standard <span class="text-primary">⭐</span>
                </th>
                <th class="text-center py-4 px-6 text-xl font-bold">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(feature, index) in currentComparisonFeatures"
                :key="index"
                class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                <td class="py-4 px-6 font-semibold">{{ feature.name }}</td>
                <td class="text-center py-4 px-6 text-gray-400">{{ feature.basic }}</td>
                <td class="text-center py-4 px-6 text-primary font-bold bg-primary/5 border-x-2 border-primary/20">
                  {{ feature.standard }}
                </td>
                <td class="text-center py-4 px-6 text-gray-400">{{ feature.premium }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-32 px-4 bg-dark">
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

    <!-- CTA -->
    <div class="relative py-32 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-black"></div>
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10" data-aos="zoom-in">
        <h2 class="text-5xl md:text-6xl font-black mb-8">
          Nie możesz się <span class="text-white">zdecydować</span>?
        </h2>
        <p class="text-xl md:text-2xl mb-12 text-white/90">
          Skontaktuj się ze mną, a wspólnie dobierzemy idealny pakiet!
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link
            to="/contact"
            class="bg-white hover:bg-gray-100 text-black px-12 py-5 rounded-lg transition-all duration-300 text-lg font-bold hover:shadow-2xl hover:-translate-y-1"
          >
            Napisz do mnie
          </router-link>
          <router-link
            to="/booking"
            class="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-12 py-5 rounded-lg transition-all duration-300 text-lg font-bold"
          >
            Zarezerwuj termin
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      activeCategory: 'motoryzacja',
      comparisonFeatures: {
        motoryzacja: [
          { name: 'Liczba zdjęć', basic: '15 zdjęć', standard: '25 zdjęć', premium: '40 zdjęć' },
          { name: 'Czas sesji', basic: 'do 1h', standard: 'do 2h', premium: 'do 4h' },
          { name: 'Lokalizacje', basic: '1 miejsce', standard: '2 miejsca', premium: '3+ miejsca' },
          { name: 'Obróbka', basic: 'Podstawowa', standard: 'Zaawansowana', premium: 'Premium + retusz' },
          { name: 'Video', basic: '✗', standard: '10-15s Reels', premium: '30-60s + montaż' },
          { name: 'Czas realizacji', basic: '14 dni', standard: '7-10 dni', premium: '7 dni' },
          { name: 'Cena', basic: '499 zł', standard: '799 zł', premium: '1299 zł' },
        ],
        portrety: [
          { name: 'Liczba zdjęć', basic: '8 zdjęć', standard: '12 zdjęć', premium: '20 zdjęć' },
          { name: 'Czas sesji', basic: '30 minut', standard: '1 godzina', premium: '2 godziny' },
          { name: 'Miejsce', basic: 'Studio/Plener', standard: 'Studio/Plener', premium: 'Studio + Plener' },
          { name: 'Retusz', basic: 'Podstawowy', standard: 'Profesjonalny', premium: 'Premium + beauty' },
          { name: 'Stylizacje', basic: '1', standard: '2', premium: '3+ z MUA' },
          { name: 'Czas realizacji', basic: '14 dni', standard: '7-10 dni', premium: '7 dni' },
          { name: 'Cena', basic: '299 zł', standard: '499 zł', premium: '799 zł' },
        ]
      },
  faqs: [
  {
    question: 'Jak długo czekam na zdjęcia?',
    answer: 'Czas realizacji zależy od wybranego pakietu:\n\n• Basic: 14 dni\n• Standard: 7-10 dni\n• Premium: 7 dni\n\nOferuję również ekspresową realizację w 3 dni za dodatkową opłatą 150 zł.',
    open: false
  },
  {
    question: 'Czy mogę dokupić dodatkowe zdjęcia?',
    answer: 'Tak! Po sesji otrzymasz galerię ze wszystkimi zdjęciami (nieobrobionymi). Możesz dokupić dodatkowe zdjęcia:\n\n• Pojedyncze zdjęcie: 30 zł/szt\n• Pakiet 5 zdjęć: 120 zł (24 zł/szt)\n• Pakiet 10 zdjęć: 200 zł (20 zł/szt)',
    open: false
  },
  {
    question: 'W jakiej formie otrzymam zdjęcia?',
    answer: 'Wszystkie zdjęcia otrzymasz w formie cyfrowej:\n\n• Link do pobrania (ważny 30 dni)\n• Rozdzielczość: Full HD (gotowe do druku)\n• Format: JPG\n• Opcjonalnie: RAW za dodatkową opłatą\n\nZdjęcia będą gotowe do publikacji na social media i druku.',
    open: false
  },
  {
    question: 'Czy muszę wpłacić zaliczkę?',
    answer: 'Tak, aby zarezerwować termin:\n\n• Zaliczka: 30% wartości pakietu\n• Termin wpłaty: do 3 dni od rezerwacji\n• Pozostała kwota: po sesji, przed odbiorem zdjęć\n• Metody płatności: przelew, BLIK, gotówka',
    open: false
  },
  {
    question: 'Co jeśli pogoda będzie zła?',
    answer: 'Dla sesji plenerowych:\n\n• Monitoruję prognozy na 48h przed sesją\n• W razie złej pogody kontaktuję się z Tobą\n• Przenosimy sesję na inny termin (bez dodatkowych opłat)\n• Możliwa zamiana na sesję studyjną\n\nTwoja wygoda i jakość zdjęć są priorytetem!',
    open: false
  },
  {
    question: 'Czy mogę anulować rezerwację?',
    answer: 'Warunki anulacji:\n\n• Do 7 dni przed: 100% zwrotu zaliczki\n• 3-7 dni przed: 50% zwrotu zaliczki\n• Mniej niż 3 dni: brak zwrotu\n\nMożesz też przełożyć termin bez dodatkowych opłat (do 2 tygodni od pierwotnej daty).',
    open: false
  }
]
    }
  },
  computed: {
    currentComparisonFeatures() {
      return this.comparisonFeatures[this.activeCategory]
    }
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open
    }
  }
}
</script>

<style scoped>
/* Smooth transitions */
.rotate-45 {
  transform: rotate(45deg);
}
</style>