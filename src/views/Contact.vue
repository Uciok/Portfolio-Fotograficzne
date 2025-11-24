<template>
  <div class="contact min-h-screen py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Nagłówek -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold mb-4" data-aos="fade-up">Kontakt</h1>
        <p
          class="text-gray-400 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Masz pytania? Skontaktuj się ze mną!
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Formularz kontaktowy -->
        <div
          class="bg-gray-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gray-800/50 transition-all duration-500"
          data-aos="fade-right"
        >
          <h2 class="text-2xl font-bold mb-6">Wyślij wiadomość</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Imię i nazwisko *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Jan Kowalski"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="jan@example.com"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Telefon</label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="+48 123 456 789"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Temat</label>
              <select
                v-model="form.subject"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="general">Pytanie ogólne</option>
                <option value="motoryzacja">Sesja motoryzacyjna</option>
                <option value="portret">Sesja portretowa</option>
                <option value="inne">Inne</option>
              </select>
            </div>

            <div class="mb-6">
              <label class="block text-gray-300 mb-2">Wiadomość *</label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Opisz czego potrzebujesz..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300 font-semibold hover:shadow-lg hover:-translate-y-1"
            >
              Wyślij wiadomość
            </button>

            <!-- Komunikat po wysłaniu -->
            <div
              v-if="submitMessage"
              class="mt-4 p-4 bg-green-900/50 text-green-300 rounded-lg text-center"
            >
              {{ submitMessage }}
            </div>
          </form>
        </div>

        <!-- Informacje kontaktowe -->
        <div data-aos="fade-left">
          <div
            class="bg-gray-900 rounded-2xl p-8 mb-6 hover:shadow-2xl hover:shadow-gray-800/50 transition-all duration-500"
          >
            <h2 class="text-2xl font-bold mb-6">Dane kontaktowe</h2>

            <div class="space-y-6">
              <div
                class="flex items-start group"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div
                  class="text-primary text-3xl mr-4 group-hover:scale-110 transition-transform duration-300"
                >
                  📧
                </div>
                <div>
                  <div class="text-gray-400 text-sm">Email</div>
                  
                   <a href="mailto:uciomedia@gmail.com"
                    class="text-white hover:text-primary transition-colors duration-300 text-lg"
                  >
                    uciomedia@gmail.com
                  </a>
                </div>
              </div>

              <div
                class="flex items-start group"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div
                  class="text-primary text-3xl mr-4 group-hover:scale-110 transition-transform duration-300"
                >
                  📱
                </div>
                <div>
                  <div class="text-gray-400 text-sm">Telefon</div>
                  
                    <a href="tel:+48512345678"
                    class="text-white hover:text-primary transition-colors duration-300 text-lg"
                  >
                    +48 512 345 678
                  </a>
                </div>
              </div>

              <div
                class="flex items-start group"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  class="text-primary text-3xl mr-4 group-hover:scale-110 transition-transform duration-300"
                >
                  📍
                </div>
                <div>
                  <div class="text-gray-400 text-sm">Lokalizacja</div>
                  <div class="text-white text-lg">Warszawa, Lublin</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div
            class="bg-gray-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gray-800/50 transition-all duration-500"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 class="text-xl font-bold mb-4">Znajdź mnie w social media</h3>
            <div class="space-y-3">
              
                <a href="https://www.instagram.com/uciomedia/"
                target="_blank"
                class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span class="text-2xl">📸</span>
                <span class="font-semibold">MOTORYZACJA</span>
              </a>
              
                <a href="https://www.instagram.com/portretyucia/"
                target="_blank"
                class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span class="text-2xl">📸</span>
                <span class="font-semibold">PORTRETY | LIFESTYLE</span>
              </a>
              
                <a href="https://www.facebook.com/profile.php?id=100091895816365"
                target="_blank"
                class="bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-600/40 hover:to-blue-800/40 text-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span class="text-2xl">👤</span>
                <span class="font-semibold">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      },
      submitMessage: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Formularz wysłany:", this.form);

      this.submitMessage = "✅ Wiadomość wysłana! Odezwę się wkrótce.";

      this.form = {
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      };

      setTimeout(() => {
        this.submitMessage = "";
      }, 5000);
    },
  },
};
</script>