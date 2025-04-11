<!-- prettier-ignore -->
<template>
  <div class="lista-container">
    <h3>Lista de Gastos</h3>
    <div class="lista-content">
      <div v-if="gastos.length === 0" class="sin-gastos">
        No hay gastos registrados
      </div>
      <div v-else class="gastos-list">
        <div v-for="(gasto, index) in gastos" :key="index" class="gasto-item">
          <div class="gasto-info">
            <span class="persona">{{ gasto.persona }}</span>
            <span class="monto">${{ parseFloat(gasto.monto).toFixed(2) }}</span>
          </div>
          <div v-if="gasto.descripcion" class="descripcion">
            {{ gasto.descripcion }}
          </div>
          <button @click="$emit('eliminar', index)" class="eliminar-btn" title="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaGastos',
  props: {
    gastos: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.lista-container {
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.sin-gastos {
  text-align: center;
  color: #666;
  padding: 1rem;
}

.gastos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gasto-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;
}

.gasto-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.persona {
  font-weight: bold;
  color: #2c3e50;
}

.monto {
  color: #007ad9;
  font-weight: bold;
}

.descripcion {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.eliminar-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: white;
  border: 1px solid #dc3545;
  color: #dc3545;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.eliminar-btn:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.1);
}

.eliminar-btn svg {
  width: 14px;
  height: 14px;
}
</style>
