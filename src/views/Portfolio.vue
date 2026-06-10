<template>
  <div class="portfolio bg-dark min-h-screen">
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
            Moje <span class="text-primary">Portfolio</span>
          </h1>
          <p 
            class="text-gray-400 text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Wybrane projekty z sesji motoryzacyjnych i portretowych
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div class="text-center">
            <div class="text-4xl font-black text-primary mb-2">{{ totalProjects }}+</div>
            <div class="text-gray-400 text-sm">Zrealizowanych sesji</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-black text-primary mb-2">{{ yearsExp }}+</div>
            <div class="text-gray-400 text-sm">Lat doświadczenia</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-black text-primary mb-2">{{ happyClients }}+</div>
            <div class="text-gray-400 text-sm">Zadowolonych klientów</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-black text-primary mb-2">{{ totalPhotos }}k+</div>
            <div class="text-gray-400 text-sm">Wykonanych zdjęć</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtry -->
    <div class="bg-black py-8 px-4 sticky top-20 z-30 border-b border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex gap-3 flex-wrap justify-center">
          <button
            @click="activeFilter = 'motoryzacja'"
            :class="activeFilter === 'motoryzacja' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
            class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
          >
            🚗 Motoryzacja ({{ motoCount }})
          </button>
          <button
            @click="activeFilter = 'portret'"
            :class="activeFilter === 'portret' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'"
            class="px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white font-semibold"
          >
            📷 Portrety ({{ portraitCount }})
          </button>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div 
          class="grid gap-6"
          :class="activeFilter === 'motoryzacja' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'"
        >
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 50"
          >
            <div 
              class="overflow-hidden"
              :class="project.category === 'portret' ? 'aspect-[3/4]' : 'aspect-[16/9]'"
            >
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span 
                class="text-sm font-bold mb-2"
                :class="project.category === 'motoryzacja' ? 'text-blue-400' : 'text-purple-400'"
              >
                {{ project.category === 'motoryzacja' ? '🚗 MOTORYZACJA' : '📷 PORTRET' }}
              </span>
              <h3 class="text-2xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-gray-300 text-sm">{{ project.description }}</p>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="text-center mt-12" data-aos="fade-up">
          <button
            @click="loadMore"
            class="bg-primary hover:bg-red-600 text-white px-12 py-4 rounded-lg transition-all duration-300 font-bold text-lg hover:scale-105 shadow-lg shadow-primary/50"
          >
            Załaduj więcej
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-32 px-4 bg-black">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl font-black mb-6" data-aos="fade-up">
          Gotowy na swoją <span class="text-primary">sesję</span>?
        </h2>
        <p class="text-gray-400 text-xl mb-12" data-aos="fade-up" data-aos-delay="100">
          Zarezerwuj termin i stwórzmy coś wyjątkowego razem!
        </p>
        <div class="flex gap-6 justify-center flex-wrap" data-aos="fade-up" data-aos-delay="200">
          <router-link
            to="/booking"
            class="bg-primary hover:bg-red-600 text-white px-12 py-4 rounded-lg transition-all duration-300 font-bold text-lg hover:scale-105 shadow-lg shadow-primary/50"
          >
            Zarezerwuj sesję
          </router-link>
          <router-link
            to="/contact"
            class="bg-gray-800 hover:bg-gray-700 text-white px-12 py-4 rounded-lg transition-all duration-300 font-bold text-lg hover:scale-105"
          >
            Skontaktuj się
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      activeFilter: 'motoryzacja',
      visibleCount: 20,
      totalProjects: 200,    
      happyClients: 200,      
      totalPhotos: 30,        
      yearsExp: 3,            
      projects: [
        // Motoryzacja - 10 zdjęć
        {
          id: 1,
          category: 'motoryzacja',
          title: 'BMW M3',
          description: 'Sesja dla pasjonata motoryzacji',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&h=800&fit=crop'
        },
        {
          id: 2,
          category: 'motoryzacja',
          title: 'Audi RS6',
          description: 'Moc i elegancja w jednym',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&h=800&fit=crop'
        },
        {
          id: 3,
          category: 'motoryzacja',
          title: 'Porsche 911',
          description: 'Ikona motoryzacji',
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&h=800&fit=crop'
        },
        {
          id: 4,
          category: 'motoryzacja',
          title: 'Mercedes AMG GT',
          description: 'Bestia na torze',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&h=800&fit=crop'
        },
        {
          id: 5,
          category: 'motoryzacja',
          title: 'Lamborghini Huracan',
          description: 'Włoska pasja',
          image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1400&h=800&fit=crop'
        },
       {
  id: 6,
  category: 'motoryzacja',
  title: 'Ford Mustang',
  description: 'Amerykański muscle car',
  image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&h=800&fit=crop'
},
        {
          id: 7,
          category: 'motoryzacja',
          title: 'Tesla Model S',
          description: 'Elektryczna przyszłość',
          image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1400&h=800&fit=crop'
        },
        {
          id: 8,
          category: 'motoryzacja',
          title: 'Nissan GT-R',
          description: 'Japońska legenda',
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&h=800&fit=crop'
        },
        {
          id: 9,
          category: 'motoryzacja',
          title: 'McLaren 720S',
          description: 'Brytyjska perfekcja',
          image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1400&h=800&fit=crop'
        },
        {
          id: 10,
          category: 'motoryzacja',
          title: 'Corvette C8',
          description: 'Amerykańska rakieta',
          image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1400&h=800&fit=crop'
        },
        // Portrety - 10 zdjęć
        {
          id: 11,
          category: 'portret',
          title: 'Sesja portretowa Anna',
          description: 'Naturalne piękno w obiektywie',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop'
        },
        {
          id: 12,
          category: 'portret',
          title: 'Fashion shoot Kasia',
          description: 'Sesja modowa w plenerze',
          image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop'
        },
        {
          id: 13,
          category: 'portret',
          title: 'Business portrait Michał',
          description: 'Profesjonalny wizerunek',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop'
        },
        {
          id: 14,
          category: 'portret',
          title: 'Outdoor portrait Ola',
          description: 'Naturalne światło',
          image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop'
        },
        {
          id: 15,
          category: 'portret',
          title: 'Elegant portrait Julia',
          description: 'Elegancja i styl',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop'
        },
        {
          id: 16,
          category: 'portret',
          title: 'Urban portrait Marcin',
          description: 'Miejski klimat',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop'
        },
        {
          id: 17,
          category: 'portret',
          title: 'Creative portrait Marta',
          description: 'Artystyczna wizja',
          image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop'
        },
        {
          id: 18,
          category: 'portret',
          title: 'Natural light Aleksandra',
          description: 'Światło słoneczne',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop'
        },
        {
          id: 19,
          category: 'portret',
          title: 'Professional portrait Tomasz',
          description: 'Biznesowy wizerunek',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop'
        },
        {
          id: 20,
          category: 'portret',
          title: 'Lifestyle portrait Natalia',
          description: 'Naturalna sesja',
          image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1200&fit=crop'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(p => p.category === this.activeFilter).slice(0, this.visibleCount)
    },
    motoCount() {
      return this.projects.filter(p => p.category === 'motoryzacja').length
    },
    portraitCount() {
      return this.projects.filter(p => p.category === 'portret').length
    },
    hasMore() {
      const totalFiltered = this.projects.filter(p => p.category === this.activeFilter).length
      return this.visibleCount < totalFiltered
    }
  },
  methods: {
    loadMore() {
      this.visibleCount += 6
    }
  }
}
</script>
