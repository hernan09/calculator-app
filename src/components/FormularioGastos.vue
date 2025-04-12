<!-- prettier-ignore -->
<template>
  <form class="formulario" @submit.prevent="agregarGasto">
    <input v-model="persona" placeholder="Nombre de la persona" required />
    <input v-model.number="monto" type="number" placeholder="Monto (ej. 2.500,50)" required />
    <input v-model="descripcion" placeholder="Descripción" />
    <button type="submit">Agregar Gasto</button>
  </form>
</template>

<!-- prettier-ignore -->
<script>
export default {
  name: 'FormularioGastos',
  props: {
    nombrePredeterminado: {
      type: String,
      default: ''
    },
    descripcionPredeterminada: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      persona: '',
      monto: '',
      descripcion: '',
    };
  },
  watch: {
    nombrePredeterminado(newVal) {
      this.persona = newVal;
    },
    descripcionPredeterminada(newVal) {
      this.descripcion = newVal;
    }
  },
  methods: {
    agregarGasto() {
      this.$emit('agregar', {
        persona: this.persona,
        monto: this.monto,
        descripcion: this.descripcion,
      });
      this.persona = '';
      this.monto = '';
      this.descripcion = '';
      this.$emit('deseleccionar-todo');
    },
  },
};
</script>

<!-- prettier-ignore -->
<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}
input, button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
button {
  background: #57aec9;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #005fa3;
}
</style>
