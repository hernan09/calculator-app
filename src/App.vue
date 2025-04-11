<!-- prettier-ignore -->
<template>
  <div class="app-container">
    <h1>Calculadora de Gastos Compartidos</h1>
    <div class="main-content">
      <div class="left-section">
        <FormularioGastos @agregar="agregarGasto" />
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

export default {
  name: 'App',
  components: {
    FormularioGastos,
    ListaGastos,
    ResumenRembolso,
    GraficoGastos
  },
  data() {
    return {
      gastos: []
    };
  },
  methods: {
    agregarGasto(gasto) {
      this.gastos.push(gasto);
    },
    eliminarGasto(index) {
      this.gastos.splice(index, 1);
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

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
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
