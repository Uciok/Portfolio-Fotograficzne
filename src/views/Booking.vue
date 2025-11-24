<template>
  <div class="booking bg-dark min-h-screen">
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
            Rezerwacja <span class="text-primary">Terminu</span>
          </h1>
          <p 
            class="text-gray-400 text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Zarezerwuj swoją sesję w kilku prostych krokach. Terminy wypełniają się szybko!
          </p>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-black py-8 px-4 sticky top-20 z-30 border-b border-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <div 
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center flex-1"
          >
            <div class="flex flex-col items-center flex-1">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 mb-2"
                :class="currentStep > index ? 'bg-primary text-white' : currentStep === index ? 'bg-primary text-white scale-110' : 'bg-gray-800 text-gray-500'"
              >
                <span v-if="currentStep > index">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span 
                class="text-sm font-semibold transition-colors hidden md:block"
                :class="currentStep >= index ? 'text-white' : 'text-gray-500'"
              >
                {{ step }}
              </span>
            </div>
            <div 
              v-if="index < steps.length - 1"
              class="h-1 flex-1 mx-2 transition-colors"
              :class="currentStep > index ? 'bg-primary' : 'bg-gray-800'"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        
        <!-- Krok 1: Typ sesji -->
        <div v-if="currentStep === 0" data-aos="fade-up">
          <h2 class="text-4xl font-black mb-8 text-center">Wybierz typ sesji</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              @click="selectSessionType('motoryzacja')"
              :class="booking.sessionType === 'motoryzacja' ? 'border-primary bg-primary/10' : 'border-gray-800 hover:border-primary/50'"
              class="bg-gray-900 rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            >
              <div class="text-6xl mb-4 text-center">🚗</div>
              <h3 class="text-3xl font-bold text-center mb-4">Motoryzacja</h3>
              <p class="text-gray-400 text-center mb-6">Sesje fotograficzne samochodów. Dynamika, detale, charakterystyka.</p>
              <ul class="text-gray-300 space-y-2">
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Sesje outdoor</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Ujęcia dynamiczne</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Video opcjonalne</span>
                </li>
              </ul>
            </div>

            <div
              @click="selectSessionType('portret')"
              :class="booking.sessionType === 'portret' ? 'border-primary bg-primary/10' : 'border-gray-800 hover:border-primary/50'"
              class="bg-gray-900 rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            >
              <div class="text-6xl mb-4 text-center">📷</div>
              <h3 class="text-3xl font-bold text-center mb-4">Portret</h3>
              <p class="text-gray-400 text-center mb-6">Sesje portretowe i lifestylowe. Studio lub plener.</p>
              <ul class="text-gray-300 space-y-2">
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Studio lub plener</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Profesjonalny retusz</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-primary">✓</span>
                  <span>Zmiana stylizacji</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Krok 2: Pakiet -->
        <div v-if="currentStep === 1" data-aos="fade-up">
          <h2 class="text-4xl font-black mb-8 text-center">Wybierz pakiet</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="pkg in availablePackages"
              :key="pkg.id"
              @click="selectPackage(pkg)"
              :class="booking.package?.id === pkg.id ? 'border-primary bg-primary/10 scale-105' : 'border-gray-800 hover:border-primary/50'"
              class="bg-gray-900 rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 relative"
            >
              <div v-if="pkg.badge" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-bold">
                {{ pkg.badge }}
              </div>
              <div class="text-5xl mb-4 text-center">{{ pkg.icon }}</div>
              <h3 class="text-2xl font-bold text-center mb-2">{{ pkg.name }}</h3>
              <div class="text-4xl font-black text-primary text-center mb-4">{{ pkg.price }} zł</div>
              <p class="text-gray-400 text-center text-sm mb-6">{{ pkg.subtitle }}</p>
              <ul class="text-gray-300 space-y-2 text-sm">
                <li v-for="feature in pkg.features" :key="feature" class="flex items-start gap-2">
                  <span class="text-primary text-lg">✓</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Krok 3: Data i godzina -->
        <div v-if="currentStep === 2" data-aos="fade-up">
          <h2 class="text-4xl font-black mb-8 text-center">Wybierz datę i godzinę</h2>
          
          <!-- Quick suggestions -->
          <div class="bg-gray-900 rounded-2xl p-6 mb-8">
            <h3 class="font-bold text-xl mb-4">⚡ Najbliższe wolne terminy:</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <button
                v-for="suggestion in quickDateSuggestions"
                :key="suggestion"
                @click="selectQuickDate(suggestion)"
                class="bg-gray-800 hover:bg-primary text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105"
              >
                {{ formatDate(suggestion) }}
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Kalendarz -->
            <div class="bg-gray-900 rounded-2xl p-6">
              <div class="flex justify-between items-center mb-6">
                <button
                  @click="changeMonth(-1)"
                  class="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-lg transition-colors"
                >
                  ←
                </button>
                <h3 class="text-xl font-bold">{{ currentMonthName }} {{ currentYear }}</h3>
                <button
                  @click="changeMonth(1)"
                  class="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>

              <!-- Dni tygodnia -->
              <div class="grid grid-cols-7 gap-2 mb-2">
                <div v-for="day in ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd']" :key="day" class="text-center text-gray-500 text-sm font-bold">
                  {{ day }}
                </div>
              </div>

              <!-- Dni miesiąca -->
              <div class="grid grid-cols-7 gap-2">
                <button
                  v-for="date in calendarDays"
                  :key="date?.toISOString()"
                  @click="selectDate(date)"
                  :disabled="!isDateAvailable(date)"
                  :class="{
                    'bg-primary text-white': isDateSelected(date),
                    'bg-gray-800 hover:bg-gray-700 text-white': isDateAvailable(date) && !isDateSelected(date),
                    'bg-gray-900 text-gray-700 cursor-not-allowed': !isDateAvailable(date),
                    'opacity-30': !date
                  }"
                  class="aspect-square rounded-lg transition-all duration-300 font-semibold text-sm disabled:cursor-not-allowed"
                >
                  {{ date ? date.getDate() : '' }}
                </button>
              </div>

              <div class="mt-6 space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-primary rounded"></div>
                  <span class="text-gray-400">Data wybrana</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-800 rounded"></div>
                  <span class="text-gray-400">Termin dostępny</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-900 border border-gray-800 rounded"></div>
                  <span class="text-gray-400">Termin zajęty</span>
                </div>
              </div>
            </div>

            <!-- Godziny -->
            <div class="bg-gray-900 rounded-2xl p-6">
              <h3 class="text-xl font-bold mb-6">Wybierz godzinę:</h3>
              <div class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                <button
                  v-for="time in availableTimes"
                  :key="time"
                  @click="selectTime(time)"
                  :disabled="!isTimeAvailable(time)"
                  :class="{
                    'bg-primary text-white': booking.time === time,
                    'bg-gray-800 hover:bg-gray-700 text-white': booking.time !== time && isTimeAvailable(time),
                    'bg-gray-900 text-gray-700 cursor-not-allowed': !isTimeAvailable(time)
                  }"
                  class="py-3 rounded-lg transition-all duration-300 font-semibold disabled:cursor-not-allowed"
                >
                  {{ time }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Krok 4: Dane kontaktowe -->
        <div v-if="currentStep === 3" data-aos="fade-up">
          <h2 class="text-4xl font-black mb-8 text-center">Twoje dane</h2>
          <div class="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-bold mb-2">Imię i nazwisko *</label>
                <input
                  v-model="booking.name"
                  type="text"
                  required
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors"
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2">Email *</label>
                <input
                  v-model="booking.email"
                  type="email"
                  required
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2">Telefon *</label>
                <input
                  v-model="booking.phone"
                  type="tel"
                  required
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div v-if="booking.sessionType === 'motoryzacja'">
                <label class="block text-sm font-bold mb-2">Marka i model auta *</label>
                <input
                  v-model="booking.carModel"
                  type="text"
                  required
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors"
                  placeholder="BMW M3 2020"
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2">Lokalizacja sesji *</label>
                <input
                  v-model="booking.location"
                  type="text"
                  required
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors"
                  placeholder="np. Warszawa, Stare Miasto"
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2">Dodatkowe informacje</label>
                <textarea
                  v-model="booking.notes"
                  rows="4"
                  class="w-full bg-gray-800 text-white px-6 py-4 rounded-lg border border-gray-700 focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Opisz swoją wizję sesji, preferencje dotyczące stylu, itp."
                ></textarea>
              </div>

              <div class="flex items-start gap-3">
                <input
                  v-model="booking.agreedToTerms"
                  type="checkbox"
                  id="terms"
                  class="w-5 h-5 mt-1 accent-primary"
                />
                <label for="terms" class="text-gray-400 text-sm leading-relaxed">
                  Akceptuję <a href="#" class="text-primary hover:underline">regulamin</a> i <a href="#" class="text-primary hover:underline">politykę prywatności</a>. Zgadzam się na przetwarzanie moich danych osobowych.
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Krok 5: Podsumowanie -->
        <div v-if="currentStep === 4" data-aos="fade-up">
          <h2 class="text-4xl font-black mb-8 text-center">Podsumowanie rezerwacji</h2>
          <div class="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <div class="space-y-6">
              <!-- Pakiet -->
              <div class="border-b border-gray-800 pb-6">
                <h3 class="text-xl font-bold mb-4">Wybrany pakiet:</h3>
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-2xl font-bold">{{ booking.package?.name }}</div>
                    <div class="text-gray-400">{{ booking.package?.subtitle }}</div>
                  </div>
                  <div class="text-3xl font-black text-primary">{{ booking.package?.price }} zł</div>
                </div>
              </div>

              <!-- Data i czas -->
              <div class="border-b border-gray-800 pb-6">
                <h3 class="text-xl font-bold mb-4">Termin:</h3>
                <div class="flex items-center gap-3 text-lg">
                  <span class="text-4xl">📅</span>
                  <div>
                    <div class="font-bold">{{ formatDate(booking.date) }}</div>
                    <div class="text-gray-400">{{ booking.time }}</div>
                  </div>
                </div>
              </div>

              <!-- Dane kontaktowe -->
              <div class="border-b border-gray-800 pb-6">
                <h3 class="text-xl font-bold mb-4">Twoje dane:</h3>
                <div class="space-y-2 text-gray-300">
                  <div><span class="text-gray-500">Imię i nazwisko:</span> {{ booking.name }}</div>
                  <div><span class="text-gray-500">Email:</span> {{ booking.email }}</div>
                  <div><span class="text-gray-500">Telefon:</span> {{ booking.phone }}</div>
                  <div v-if="booking.carModel"><span class="text-gray-500">Auto:</span> {{ booking.carModel }}</div>
                  <div><span class="text-gray-500">Lokalizacja:</span> {{ booking.location }}</div>
                </div>
              </div>

              <!-- Płatność -->
              <div>
                <h3 class="text-xl font-bold mb-4">Do zapłaty:</h3>
                <div class="bg-black rounded-xl p-6">
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-gray-400">Cena pakietu:</span>
                    <span class="text-xl font-bold">{{ booking.package?.price }} zł</span>
                  </div>
                  <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
                    <span class="text-gray-400">Zaliczka (30%):</span>
                    <span class="text-xl font-bold text-primary">{{ calculateDeposit() }} zł</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold">Do zapłaty teraz:</span>
                    <span class="text-4xl font-black text-primary">{{ calculateDeposit() }} zł</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-4">
                    Pozostała kwota ({{ booking.package?.price - calculateDeposit() }} zł) płatna po sesji.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-12 max-w-2xl mx-auto">
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold"
          >
            ← Wstecz
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 4"
            @click="nextStep"
            :disabled="!canProceed"
            :class="canProceed ? 'bg-primary hover:bg-red-600' : 'bg-gray-700 cursor-not-allowed'"
            class="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold disabled:opacity-50"
          >
            Dalej →
          </button>

          <button
            v-if="currentStep === 4"
            @click="submitBooking"
            class="bg-primary hover:bg-red-600 text-white px-12 py-4 rounded-lg transition-all duration-300 font-bold text-lg hover:scale-105 shadow-2xl shadow-primary/50"
          >
            Potwierdź rezerwację →
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      @click="showSuccessModal = false"
    >
      <div 
        class="bg-gray-900 rounded-3xl p-12 max-w-2xl w-full text-center"
        @click.stop
        data-aos="zoom-in"
      >
        <div class="text-8xl mb-6">🎉</div>
        <h2 class="text-5xl font-black mb-6">Rezerwacja potwierdzona!</h2>
        <p class="text-xl text-gray-400 mb-8 leading-relaxed">
          Dziękuję za rezerwację! Potwierdzenie zostało wysłane na adres <span class="text-primary font-bold">{{ booking.email }}</span>.
        </p>
        <p class="text-gray-400 mb-8">
          Skontaktuję się z Tobą w ciągu 24h, aby omówić szczegóły sesji.
        </p>
        <div class="space-y-4">
          <button
            @click="showSuccessModal = false; resetBooking()"
            class="w-full bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold"
          >
            Zamknij
          </button>
          <router-link
            to="/"
            class="block w-full bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-bold"
          >
            Wróć do strony głównej
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Booking',
  data() {
    return {
    currentStep: 0,
    steps: ['Typ sesji', 'Pakiet', 'Data i czas', 'Dane', 'Podsumowanie'],
      booking: {
        sessionType: null,
        package: null,
        date: null,
        time: null,
        name: '',
        email: '',
        phone: '',
        carModel: '',
        location: '',
        notes: '',
        agreedToTerms: false
      },
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      showSuccessModal: false,
      packages: {
        motoryzacja: [
          {
            id: 'moto-basic',
            name: 'BASIC',
            icon: '🚗',
            price: 499,
            subtitle: '15 zdjęć • 1 lokalizacja',
            features: ['Sesja do 1h', '15 zdjęć', '1 lokalizacja', 'Podstawowa obróbka'],
            badge: null
          },
          {
            id: 'moto-standard',
            name: 'STANDARD',
            icon: '🏎️',
            price: 799,
            subtitle: '25 zdjęć • 2 lokalizacje',
            features: ['Sesja do 2h', '25 zdjęć', '2 lokalizacje', 'Video 10-15s'],
            badge: 'BESTSELLER'
          },
          {
            id: 'moto-premium',
            name: 'PREMIUM',
            icon: '🏁',
            price: 1299,
            subtitle: '40 zdjęć • 3+ lokalizacje',
            features: ['Sesja do 4h', '40 zdjęć', '3+ lokalizacje', 'Video 30-60s + montaż'],
            badge: null
          }
        ],
        portret: [
          {
            id: 'portrait-basic',
            name: 'BASIC',
            icon: '📷',
            price: 299,
            subtitle: '8 zdjęć • 1 stylizacja',
            features: ['Sesja 30 min', '8 zdjęć', 'Studio/plener', 'Podstawowy retusz'],
            badge: null
          },
          {
            id: 'portrait-standard',
            name: 'STANDARD',
            icon: '🎭',
            price: 499,
            subtitle: '12 zdjęć • 2 stylizacje',
            features: ['Sesja 1h', '12 zdjęć', 'Studio/plener', '2 stylizacje'],
            badge: 'BESTSELLER'
          },
          {
            id: 'portrait-premium',
            name: 'PREMIUM',
            icon: '👑',
            price: 799,
            subtitle: '20 zdjęć • 3+ stylizacje',
            features: ['Sesja 2h', '20 zdjęć', 'Studio + plener', '3+ stylizacje + MUA'],
            badge: null
          }
        ]
      },
      availableTimes: [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
      ],
      bookedDates: [] // Tu będą zajęte terminy z backendu
    }
  },
  computed: {
    availablePackages() {
      return this.booking.sessionType ? this.packages[this.booking.sessionType] : []
    },
    currentMonthName() {
      const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
      return months[this.currentMonth]
    },
    calendarDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
      const days = []
      
      // Puste dni na początku (przesunięcie do poniedziałku)
      const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
      for (let i = 0; i < startDay; i++) {
        days.push(null)
      }
      
      // Dni miesiąca
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(this.currentYear, this.currentMonth, i))
      }
      
      return days
    },
    quickDateSuggestions() {
      const suggestions = []
      const today = new Date()
      let daysChecked = 0
      let suggestionsFound = 0
      
      while (suggestionsFound < 3 && daysChecked < 30) {
        const date = new Date(today)
        date.setDate(date.getDate() + daysChecked + 1)
        
        if (this.isDateAvailable(date)) {
          suggestions.push(date)
          suggestionsFound++
        }
        daysChecked++
      }
      
      return suggestions
    },
    canProceed() {
      switch (this.currentStep) {
        case 0:
          return !!this.booking.sessionType
        case 1:
          return !!this.booking.package
        case 2:
          return !!this.booking.date && !!this.booking.time
        case 3:
          return this.booking.name && this.booking.email && this.booking.phone && this.booking.location && this.booking.agreedToTerms
        default:
          return true
      }
    }
  },
  methods: {
    selectSessionType(type) {
      this.booking.sessionType = type
  this.booking.package = null
},
selectPackage(pkg) {
  this.booking.package = pkg
},
changeMonth(direction) {
  this.currentMonth += direction
  if (this.currentMonth > 11) {
    this.currentMonth = 0
    this.currentYear++
  } else if (this.currentMonth < 0) {
    this.currentMonth = 11
    this.currentYear--
  }
},
isDateAvailable(date) {
  if (!date) return false
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Sprawdź czy data nie jest w przeszłości
  if (date < today) return false
  
  // Sprawdź czy to nie niedziela
  if (date.getDay() === 0) return false
  
  // Sprawdź czy data nie jest zajęta
  const dateStr = date.toISOString().split('T')[0]
  return !this.bookedDates.includes(dateStr)
},
isDateSelected(date) {
  if (!date || !this.booking.date) return false
  return date.toDateString() === this.booking.date.toDateString()
},
selectDate(date) {
  if (!this.isDateAvailable(date)) return
  this.booking.date = date
},
selectQuickDate(date) {
  this.currentMonth = date.getMonth()
  this.currentYear = date.getFullYear()
  this.booking.date = date
},
isTimeAvailable(time) {
  // Tutaj można dodać logikę sprawdzania dostępności godzin
  return true
},
selectTime(time) {
  if (!this.isTimeAvailable(time)) return
  this.booking.time = time
},
formatDate(date) {
  if (!date) return ''
  const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
  const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
},
calculateDeposit() {
  return Math.round(this.booking.package?.price * 0.3) || 0
},
nextStep() {
  if (this.canProceed && this.currentStep < this.steps.length - 1) {
    this.currentStep++
  }
},
prevStep() {
  if (this.currentStep > 0) {
    this.currentStep--
  }
},
submitBooking() {
  // Tutaj wysyłka do backendu
  console.log('Booking submitted:', this.booking)
  this.showSuccessModal = true
},
resetBooking() {
  this.currentStep = 0
  this.booking = {
    sessionType: null,
    package: null,
    date: null,
    time: null,
    name: '',
    email: '',
    phone: '',
    carModel: '',
    location: '',
    notes: '',
    agreedToTerms: false
  }
}
}
}
</script>