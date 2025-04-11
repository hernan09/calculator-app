<!-- prettier-ignore -->
<template>
  <div class="grafico-container">
    <h3>Distribución de Gastos</h3>
    <div class="chart-wrapper">
      <canvas ref="pieChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes necesarios
Chart.register(...registerables);

export default {
  name: 'GraficoGastos',
  props: {
    gastos: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const pieChart = ref(null);
    let chart = null;

    const updateChart = () => {
      if (!pieChart.value) return;

      // Destruir el gráfico existente si hay uno
      if (chart) {
        chart.destroy();
        chart = null;
      }

      // Calcular los gastos por persona
      const gastosPorPersona = {};
      props.gastos.forEach(gasto => {
        if (!gastosPorPersona[gasto.persona]) {
          gastosPorPersona[gasto.persona] = 0;
        }
        gastosPorPersona[gasto.persona] += parseFloat(gasto.monto);
      });

      // Crear el nuevo gráfico
      const ctx = pieChart.value.getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: Object.keys(gastosPorPersona),
            datasets: [{
              data: Object.values(gastosPorPersona),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateScale: true,
              animateRotate: true
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      }
    };

    // Inicializar el gráfico cuando el componente se monta
    onMounted(() => {
      // Pequeño retraso para asegurar que el DOM esté listo
      setTimeout(updateChart, 100);
    });

    // Limpiar el gráfico cuando el componente se desmonta
    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    });

    // Observar cambios en los gastos
    watch(() => props.gastos, () => {
      updateChart();
    }, { deep: true });

    return {
      pieChart
    };
  }
};
</script>

<style scoped>
.grafico-container {
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

.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}

@media (min-width: 768px) {
  .grafico-container {
    margin-bottom: 0;
  }
}
</style> 