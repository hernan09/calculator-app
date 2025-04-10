<!-- prettier-ignore -->
<template>
    <div class="total-gastos">
      Total: ${{ total.toFixed(2) }}
    </div>
  </template>
<!-- prettier-ignore -->
<script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    gastos: {
      type: Array,
      required: true,
    },
  });
  
  const total = computed(() =>
    props.gastos.reduce((acc, gasto) => acc + gasto.monto, 0)
  );
  </script>
<!-- prettier-ignore -->
<style scoped>
  .total-gastos {
    font-weight: bold;
    margin-top: 1rem;
  }
</style>
