<!-- prettier-ignore -->
<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Calculadora de Gastos Compartidos</h1>
    </header>
    <SelectoresRapidos 
      @nombre-seleccionado="actualizarNombrePredeterminado" 
      @compras-seleccionadas="actualizarDescripcionPredeterminada" 
      ref="selectoresRapidos"
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
    },
    eliminarGasto(index) {
      this.gastos.splice(index, 1);
    },
    actualizarNombrePredeterminado(nombre) {
      this.nombrePredeterminado = nombre;
    },
    actualizarDescripcionPredeterminada(descripcion) {
      this.descripcionPredeterminada = descripcion;
    },
    deseleccionarTodo() {
      this.$refs.selectoresRapidos.deseleccionarTodo();
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
  min-height: 100vh;
  background-image: url('./assets/images/fondo.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-header {
  background-image: url('./assets/images/fondo.svg');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1;
}

.app-header h1 {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
