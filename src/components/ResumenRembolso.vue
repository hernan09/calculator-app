<!-- prettier-ignore -->
<template>
  <div class="resumen-container">
    <h3>Resumen de Gastos</h3>
    <div class="resumen-content">
      <div v-if="gastos.length === 0" class="sin-gastos">
        No hay gastos registrados
      </div>
      <div v-else>
        <div class="total-gastos">
          <span>Total Gastado:</span>
          <span>${{ totalGastado.toFixed(2) }}</span>
        </div>
        <div class="promedio">
          <span>Promedio por Persona:</span>
          <span>${{ promedioPorPersona.toFixed(2) }}</span>
        </div>
        <div class="reembolsos">
          <h4>Reembolsos Necesarios:</h4>
          <div v-for="(reembolso, index) in reembolsos" :key="index" class="reembolso-item">
            <span>{{ reembolso.de }} debe pagar a {{ reembolso.a }}:</span>
            <span>${{ reembolso.monto.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumenRembolso',
  props: {
    gastos: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalGastado() {
      return this.gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);
    },
    promedioPorPersona() {
      const personas = [...new Set(this.gastos.map(gasto => gasto.persona))];
      return this.totalGastado / personas.length;
    },
    gastosPorPersona() {
      const gastosPorPersona = {};
      this.gastos.forEach(gasto => {
        if (!gastosPorPersona[gasto.persona]) {
          gastosPorPersona[gasto.persona] = 0;
        }
        gastosPorPersona[gasto.persona] += parseFloat(gasto.monto);
      });
      return gastosPorPersona;
    },
    reembolsos() {
      const reembolsos = [];
      const personas = Object.keys(this.gastosPorPersona);
      
      personas.forEach(de => {
        personas.forEach(a => {
          if (de !== a) {
            const diferenciaDe = this.gastosPorPersona[de] - this.promedioPorPersona;
            const diferenciaA = this.gastosPorPersona[a] - this.promedioPorPersona;
            
            if (diferenciaDe > 0 && diferenciaA < 0) {
              const monto = Math.min(diferenciaDe, Math.abs(diferenciaA));
              if (monto > 0) {
                reembolsos.push({
                  de: a,
                  a: de,
                  monto: monto
                });
              }
            }
          }
        });
      });
      
      return reembolsos;
    }
  }
};
</script>

<style scoped>
.resumen-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  backdrop-filter: blur(5px);
}

h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

h4 {
  margin: 1rem 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.resumen-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.total-gastos, .promedio, .reembolso-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.reembolso-item:last-child {
  border-bottom: none;
}

.sin-gastos {
  text-align: center;
  color: #666;
  padding: 1rem;
}

@media (min-width: 768px) {
  .resumen-container {
    margin-bottom: 0;
  }
}
</style> 