<!-- prettier-ignore -->
<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Calculadora de Gastos Compartidos</h1>
      <div class="wave-border">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,170.7C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
    <SelectoresRapidos 
      ref="selectoresRapidos"
      @nombre-seleccionado="actualizarNombre" 
      @compras-seleccionadas="actualizarDescripcion" 
    />
    <div class="main-content">
      <div class="left-section">
        <FormularioGastos 
          @agregar="agregarGasto" 
          :nombre-predeterminado="nombrePredeterminado" 
          :descripcion-predeterminada="descripcionPredeterminada"
          @deseleccionar-todo="deseleccionarTodo"
        />
        <ListaGastos :gastos="gastos" @eliminar="eliminarGasto" />
      </div>
      <div class="right-section">
        <ResumenRembolso :gastos="gastos" />
        <GraficoGastos :gastos="gastos" />
      </div>
    </div>
  </div>
</template>

<script>
import FormularioGastos from './components/FormularioGastos.vue';
import ListaGastos from './components/ListaGastos.vue';
import ResumenRembolso from './components/ResumenRembolso.vue';
import GraficoGastos from './components/GraficoGastos.vue';
import SelectoresRapidos from './components/SelectoresRapidos.vue';

export default {
  name: 'App',
  components: {
    FormularioGastos,
    ListaGastos,
    ResumenRembolso,
    GraficoGastos,
    SelectoresRapidos
  },
  data() {
    return {
      gastos: [],
      nombrePredeterminado: '',
      descripcionPredeterminada: ''
    };
  },
  methods: {
    agregarGasto(gasto) {
      this.gastos.push(gasto);
      // Limpiar los valores predeterminados después de agregar
      this.nombrePredeterminado = '';
      this.descripcionPredeterminada = '';
      // Deseleccionar los reels
      this.deseleccionarTodo();
    },
    eliminarGasto(index) {
      this.gastos.splice(index, 1);
    },
    actualizarNombre(nombre) {
      this.nombrePredeterminado = nombre;
    },
    actualizarDescripcion(descripcion) {
      this.descripcionPredeterminada = descripcion;
    },
    deseleccionarTodo() {
      if (this.$refs.selectoresRapidos) {
        this.$refs.selectoresRapidos.deseleccionarTodo();
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
  padding: 1rem;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.wave-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  overflow: hidden;
}

.wave-border svg {
  display: block;
  width: 100%;
  height: 60px;
}

.app-header {
  position: relative;
  background: linear-gradient(135deg, #007ad9, #2da59f);
  padding: 2rem 1rem 4rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
}

.app-header h1 {
  text-align: center;
  color: white;
  margin-bottom: 1rem;
  position: relative;
  z-index: 3;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.left-section, .right-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .main-content {
    flex-direction: row;
  }

  .left-section {
    flex: 2;
  }

  .right-section {
    flex: 1;
  }
}
</style>
