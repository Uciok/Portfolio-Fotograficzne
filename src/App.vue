<template>
  <div id="app" class="min-h-screen bg-black text-white relative">
    <!-- Loading Screen -->
   <div v-if="loading" class="loading-screen">
  <img 
    src="/images/logo-biale.png" 
    alt="UCIO MEDIA" 
    class="logo-image glitch w-64 md:w-80"
  />
</div>

    <!-- Animated Background Particles -->
    <div id="particles-js"></div>

    <Navbar />
    <main class="relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // Loading screen
    setTimeout(() => {
      this.loading = false;
    }, 1500);

    // Particles
    this.initParticles();
  },
  methods: {
    initParticles() {
      // Simple particle effect with canvas
      const canvas = document.createElement("canvas");
      canvas.id = "particles-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "0";
      canvas.style.pointerEvents = "none";

      const particlesContainer = document.getElementById("particles-js");
      if (particlesContainer) {
        particlesContainer.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
          }

          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(201, 67, 43, 0.3)";
            ctx.fill();
          }

          update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
          }
        }

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((particle) => {
            particle.update();
            particle.draw();
          });

          requestAnimationFrame(animate);
        };
        animate();

        // Resize handler
        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      }
    },
  },
};
</script>

<style scoped>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.logo-image {
  max-width: 320px;
  width: 80%;
  height: auto;
  animation: breathe 1.5s ease-in-out infinite;
}

/* Powolne oddychanie */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}
</style>
