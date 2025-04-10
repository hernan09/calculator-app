<!-- prettier-ignore -->
<template>
    <li class="gasto-item">
      {{ gasto.nombre }} — ${{ gasto.monto.toFixed(2) }}
    </li>
</template>

<!-- prettier-ignore -->

<script setup>
  defineProps({
    gasto: {
      type: Object,
      required: true,
    },
  });
</script>
<!-- prettier-ignore -->
<style scoped>
  .gasto-item {
    padding: 0.25rem 0;
  }
</style>
