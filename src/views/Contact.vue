<template>
  <div class="contact min-h-screen pt-24 pb-20 px-4" style="position: relative; z-index: 1;">
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
          <form @submit.prevent="submitForm" novalidate>
            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Imię i nazwisko *</label>
              <input
                v-model="form.name"
                type="text"
                @blur="validateField('name')"
                @input="errors.name && validateField('name')"
                :class="errors.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-primary'"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Jan Kowalski"
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-2">{{ errors.name }}</p>
            </div>

            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Email *</label>
              <input
                v-model="form.email"
                type="email"
                @blur="validateField('email')"
                @input="errors.email && validateField('email')"
                :class="errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-primary'"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="jan@example.com"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-2">{{ errors.email }}</p>
            </div>

            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Telefon</label>
              <input
                v-model="form.phone"
                type="tel"
                @blur="validateField('phone')"
                @input="errors.phone && validateField('phone')"
                :class="errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-primary'"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="+48 123 456 789"
              />
              <p v-if="errors.phone" class="text-red-500 text-sm mt-2">{{ errors.phone }}</p>
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
                rows="5"
                @blur="validateField('message')"
                @input="errors.message && validateField('message')"
                :class="errors.message ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-primary'"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Opisz czego potrzebujesz..."
              ></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-2">{{ errors.message }}</p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300 font-semibold hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {{ isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość' }}
            </button>

            <!-- Komunikat po wysłaniu -->
            <div
              v-if="submitMessage"
              class="mt-4 p-4 bg-green-900/50 text-green-300 rounded-lg text-center"
            >
              {{ submitMessage }}
            </div>

            <!-- Komunikat błędu -->
            <div
              v-if="submitError"
              class="mt-4 p-4 bg-red-900/50 text-red-300 rounded-lg text-center"
            >
              {{ submitError }}
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
                  <div class="text-white text-lg">Warszawa, Lublin, Polska</div>
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

import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
      errors: {},
      isSubmitting: false,
      submitMessage: "",
      submitError: "",
    };
  },
  methods: {
    validateField(field) {
      const v = this.form;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+48[\s-]?)?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/;

      switch (field) {
        case "name":
          if (!v.name.trim()) this.errors.name = "Imię i nazwisko jest wymagane";
          else if (v.name.trim().length < 3) this.errors.name = "Podaj pełne imię i nazwisko";
          else delete this.errors.name;
          break;
        case "email":
          if (!v.email.trim()) this.errors.email = "Adres email jest wymagany";
          else if (!emailRegex.test(v.email.trim())) this.errors.email = "Podaj poprawny adres email";
          else delete this.errors.email;
          break;
        case "phone":
          // Telefon jest opcjonalny - walidujemy tylko jeśli coś wpisano
          if (v.phone.trim() && !phoneRegex.test(v.phone.trim())) {
            this.errors.phone = "Podaj poprawny numer telefonu (9 cyfr, np. +48 123 456 789)";
          } else {
            delete this.errors.phone;
          }
          break;
        case "message":
          if (!v.message.trim()) this.errors.message = "Wiadomość jest wymagana";
          else if (v.message.trim().length < 10) this.errors.message = "Wiadomość powinna mieć co najmniej 10 znaków";
          else delete this.errors.message;
          break;
      }
    },
    validateForm() {
      ["name", "email", "phone", "message"].forEach((f) => this.validateField(f));
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      this.submitError = "";

      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      try {
        await addDoc(collection(db, "messages"), {
          name: this.form.name.trim(),
          email: this.form.email.trim(),
          phone: this.form.phone.trim() || null,
          subject: this.form.subject,
          message: this.form.message.trim(),
          read: false,
          createdAt: serverTimestamp(),
        });

        this.submitMessage = "✅ Wiadomość wysłana! Odezwę się wkrótce.";

        this.form = {
          name: "",
          email: "",
          phone: "",
          subject: "general",
          message: "",
        };
        this.errors = {};

        setTimeout(() => {
          this.submitMessage = "";
        }, 5000);
      } catch (error) {
        console.error("Błąd wysyłania wiadomości:", error);
        this.submitError = "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na uciomedia@gmail.com.";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>