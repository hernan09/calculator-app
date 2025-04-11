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
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

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
      if (chart) {
        chart.destroy();
      }

      const gastosPorPersona = {};
      props.gastos.forEach(gasto => {
        if (!gastosPorPersona[gasto.persona]) {
          gastosPorPersona[gasto.persona] = 0;
        }
        gastosPorPersona[gasto.persona] += parseFloat(gasto.monto);
      });

      const ctx = pieChart.value.getContext('2d');
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
    };

    onMounted(() => {
      updateChart();
    });

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
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
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