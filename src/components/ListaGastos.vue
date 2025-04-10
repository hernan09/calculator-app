<!-- prettier-ignore -->
<template>
  <ul class="lista-gastos">
    <GastoItem v-for="(gasto, index) in gastos" :key="index" :gasto="gasto" />
  </ul>
</template>
<!-- prettier-ignore -->
<script setup>
import GastoItem from './GastoItem.vue';

defineProps({
  gastos: {
    type: Array,
    required: true,
  },
});
</script>
<!-- prettier-ignore -->
<style scoped>
.lista-gastos {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}
</style>
