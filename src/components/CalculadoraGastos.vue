<template>
    <div>
      <FormularioGastos @agregar="agregarGasto" />
      <ResumenReembolsos :gastos="gastos" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import FormularioGastos from './FormularioGastos.vue';
  import ResumenReembolsos from './ResumenReembolsos.vue';
  
  export default {
    components: {
      FormularioGastos,
      ResumenReembolsos,
    },
    setup() {
      const gastos = ref([]);
      const agregarGasto = (nuevoGasto) => {
        gastos.value.push(nuevoGasto);
      };
      return { gastos, agregarGasto };
    },
  };
  </script>
  