<!-- prettier-ignore -->
<template>
  <div class="selectores-container">
    <div class="reel-nombres" ref="reelNombres">
      <div 
        v-for="nombre in nombres" 
        :key="nombre"
        class="item-nombre"
        :class="{ 'seleccionado': nombreSeleccionado === nombre }"
        @click="seleccionarNombre(nombre)"
      >
        {{ nombre }}
      </div>
    </div>
    <div class="reel-compras" ref="reelCompras">
      <div 
        v-for="(compra, index) in compras" 
        :key="index"
        class="item-compra"
        :class="{ 'seleccionado': comprasSeleccionadas.includes(compra) }"
        @click="seleccionarCompra(compra)"
      >
        <span class="emoji">{{ compra.icono }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectoresRapidos',
  data() {
    return {
      nombreSeleccionado: '',
      comprasSeleccionadas: [],
      nombres: ['Herna','Joni', 'Chino', 'Fabro', 'Guido', 'Gusty', 'Deo', 'Galo', 'Cris', 'Tincho', 'Nico'],
      compras: [
        { nombre: 'Bebidas', icono: '🍺' },
        { nombre: 'Coquita', icono: '🥤' },
        { nombre: 'Carne', icono: '🥩' },
        { nombre: 'Pan', icono: '🥖' },
        { nombre: 'Verduras', icono: '🥬' },
        { nombre: 'Lácteos', icono: '🥛' },
        { nombre: 'Snacks', icono: '🍿' },
        { nombre: 'Postres', icono: '🍰' },
        { nombre: 'Condimentos', icono: '🧂' }
      ],
      autoScrollTimer: null,
      autoScrollActive: false,
      currentScrollIndex: {
        nombres: 0,
        compras: 0
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.startAutoScrollTimer();
    });
  },
  beforeUnmount() {
    this.stopAutoScroll();
    clearTimeout(this.autoScrollTimer);
  },
  methods: {
    seleccionarNombre(nombre) {
      this.nombreSeleccionado = nombre;
      this.$emit('nombre-seleccionado', nombre);
      this.resetAutoScrollTimer();
    },
    seleccionarCompra(compra) {
      const index = this.comprasSeleccionadas.findIndex(c => c.nombre === compra.nombre);
      if (index === -1) {
        this.comprasSeleccionadas.push(compra);
      } else {
        this.comprasSeleccionadas.splice(index, 1);
      }
      const descripcion = this.comprasSeleccionadas.map(c => c.nombre).join(', ');
      this.$emit('compras-seleccionadas', descripcion);
      this.resetAutoScrollTimer();
    },
    deseleccionarTodo() {
      this.nombreSeleccionado = '';
      this.comprasSeleccionadas = [];
      this.$emit('nombre-seleccionado', '');
      this.$emit('compras-seleccionadas', '');
    },
    startAutoScrollTimer() {
      this.autoScrollTimer = setTimeout(() => {
        this.autoScrollActive = true;
        this.startAutoScroll();
      }, 5000);
    },
    resetAutoScrollTimer() {
      this.stopAutoScroll();
      clearTimeout(this.autoScrollTimer);
      this.startAutoScrollTimer();
    },
    startAutoScroll() {
      if (!this.autoScrollActive) return;

      const scrollNombres = () => {
        if (!this.autoScrollActive || !this.$refs.reelNombres) return;
        const reel = this.$refs.reelNombres;
        const items = reel.querySelectorAll('.item-nombre');
        if (!items.length) return;
        
        const itemWidth = items[0].offsetWidth + 8; // 8px for gap
        const maxScroll = items.length * itemWidth - reel.offsetWidth;
        
        this.currentScrollIndex.nombres = (this.currentScrollIndex.nombres + 1) % items.length;
        const scrollTo = Math.min(this.currentScrollIndex.nombres * itemWidth, maxScroll);
        
        reel.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      };

      const scrollCompras = () => {
        if (!this.autoScrollActive || !this.$refs.reelCompras) return;
        const reel = this.$refs.reelCompras;
        const items = reel.querySelectorAll('.item-compra');
        if (!items.length) return;
        
        const itemWidth = items[0].offsetWidth + 8; // 8px for gap
        const maxScroll = items.length * itemWidth - reel.offsetWidth;
        
        this.currentScrollIndex.compras = (this.currentScrollIndex.compras + 1) % items.length;
        const scrollTo = Math.min(this.currentScrollIndex.compras * itemWidth, maxScroll);
        
        reel.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      };

      // Scroll cada 2 segundos
      this.autoScrollInterval = setInterval(() => {
        scrollNombres();
        scrollCompras();
      }, 2000);
    },
    stopAutoScroll() {
      this.autoScrollActive = false;
      if (this.autoScrollInterval) {
        clearInterval(this.autoScrollInterval);
      }
    }
  },
  watch: {
    nombreSeleccionado(newVal) {
      if (newVal) {
        this.$emit('nombre-seleccionado', newVal);
      }
    },
    comprasSeleccionadas: {
      handler(newVal) {
        const descripcion = newVal.map(c => c.nombre).join(', ');
        this.$emit('compras-seleccionadas', descripcion);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.selectores-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 140px;
  margin-bottom: 1rem;
}

.reel-nombres, .reel-compras {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  backdrop-filter: blur(5px);
  scrollbar-width: thin;
  scrollbar-color: #007ad9 rgba(255, 255, 255, 0.1);
  scroll-behavior: smooth;
  transition: scroll-left 0.5s ease;
}

.reel-nombres::-webkit-scrollbar,
.reel-compras::-webkit-scrollbar {
  height: 6px;
}

.reel-nombres::-webkit-scrollbar-track,
.reel-compras::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.reel-nombres::-webkit-scrollbar-thumb,
.reel-compras::-webkit-scrollbar-thumb {
  background: #007ad9;
  border-radius: 3px;
}

.item-nombre, .item-compra {
  flex: 0 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  opacity: 1;
  transform: scale(1);
}

.item-nombre {
  background: rgba(0, 122, 217, 0.1);
  border: 1px solid rgba(0, 122, 217, 0.2);
  color: #2c3e50;
}

.item-compra {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 122, 217, 0.1);
  border: 1px solid rgba(0, 122, 217, 0.2);
  min-width: 60px;
  color: #2c3e50;
}

.item-nombre:hover, .item-compra:hover {
  background: rgba(0, 122, 217, 0.2);
  transform: scale(1.05);
}

.item-nombre.seleccionado, .item-compra.seleccionado {
  background: #007ad9;
  color: white;
  border-color: #007ad9;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 122, 217, 0.3);
}

.emoji {
  font-size: 1.5rem;
  line-height: 1;
  transition: transform 0.3s ease;
}

.item-compra:hover .emoji {
  transform: scale(1.2);
}

.nombre-compra {
  font-size: 0.8rem;
  text-align: center;
  transition: opacity 0.3s ease;
}

.item-compra:hover .nombre-compra {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item-nombre, .item-compra {
  animation: fadeIn 0.3s ease forwards;
}

.item-nombre:nth-child(1) { animation-delay: 0.1s; }
.item-nombre:nth-child(2) { animation-delay: 0.2s; }
.item-nombre:nth-child(3) { animation-delay: 0.3s; }
.item-nombre:nth-child(4) { animation-delay: 0.4s; }
.item-nombre:nth-child(5) { animation-delay: 0.5s; }
.item-nombre:nth-child(6) { animation-delay: 0.6s; }
.item-nombre:nth-child(7) { animation-delay: 0.7s; }
.item-nombre:nth-child(8) { animation-delay: 0.8s; }
.item-nombre:nth-child(9) { animation-delay: 0.9s; }
.item-nombre:nth-child(10) { animation-delay: 1s; }

.item-compra:nth-child(1) { animation-delay: 0.1s; }
.item-compra:nth-child(2) { animation-delay: 0.2s; }
.item-compra:nth-child(3) { animation-delay: 0.3s; }
.item-compra:nth-child(4) { animation-delay: 0.4s; }
.item-compra:nth-child(5) { animation-delay: 0.5s; }
.item-compra:nth-child(6) { animation-delay: 0.6s; }
.item-compra:nth-child(7) { animation-delay: 0.7s; }
.item-compra:nth-child(8) { animation-delay: 0.8s; }
</style> 