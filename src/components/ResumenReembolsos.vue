<template>
    <div class="resumen">
      <h3>Resumen de Reembolsos</h3>
  
      <ul>
        <li v-for="(gasto, persona) in gastosPorPersona" :key="persona">
          <strong>{{ persona }}</strong> gastó ${{ gasto.toFixed(2) }}
        </li>
      </ul>
  
      <p><strong>Total:</strong> ${{ total.toFixed(2) }}</p>
      <p><strong>Promedio por persona:</strong> ${{ promedio.toFixed(2) }}</p>
  
      <div v-if="deudas.length">
        <h4>Reembolsos sugeridos:</h4>
        <ul>
          <li v-for="(deuda, i) in deudas" :key="i">
            <strong>{{ deuda.deudor }}</strong> le debe
            <strong>${{ deuda.monto }}</strong> a
            <strong>{{ deuda.acreedor }}</strong>
          </li>
        </ul>
      </div>
  
      <p v-else>Todas las personas gastaron lo mismo. ¡No hay reembolsos pendientes! 🎉</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResumenReembolsos",
    props: {
      gastos: Array,
    },
    computed: {
      gastosPorPersona() {
        const resumen = {};
        this.gastos.forEach(({ persona, monto }) => {
          if (!resumen[persona]) resumen[persona] = 0;
          resumen[persona] += monto;
        });
        return resumen;
      },
      total() {
        return Object.values(this.gastosPorPersona).reduce((acc, val) => acc + val, 0);
      },
      promedio() {
        const personas = Object.keys(this.gastosPorPersona).length;
        return personas > 0 ? this.total / personas : 0;
      },
      deudas() {
        const promedio = this.promedio;
        const balance = [];
  
        // Calcular cuánto debe o le sobra a cada persona
        for (const persona in this.gastosPorPersona) {
          const diferencia = (this.gastosPorPersona[persona] - promedio).toFixed(2);
          balance.push({ persona, diferencia: parseFloat(diferencia) });
        }
  
        const deudores = balance.filter(p => p.diferencia < 0);
        const acreedores = balance.filter(p => p.diferencia > 0);
        const resultado = [];
  
        let i = 0, j = 0;
        while (i < deudores.length && j < acreedores.length) {
          const deuda = Math.min(
            Math.abs(deudores[i].diferencia),
            acreedores[j].diferencia
          ).toFixed(2);
  
          resultado.push({
            deudor: deudores[i].persona,
            acreedor: acreedores[j].persona,
            monto: parseFloat(deuda),
          });
  
          deudores[i].diferencia += parseFloat(deuda);
          acreedores[j].diferencia -= parseFloat(deuda);
  
          if (Math.abs(deudores[i].diferencia) < 0.01) i++;
          if (acreedores[j].diferencia < 0.01) j++;
        }
  
        return resultado;
      },
    },
  };
  </script>
  
  <style scoped>
  .resumen {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f1f8ff;
    border: 1px solid #cce0f5;
    border-radius: 1rem;
    font-family: 'Arial', sans-serif;
    position: relative;
    bottom: 21px;
    max-height: 250px;
    /* overflow: hidden; */
    overflow-y: auto;
  }
  h3, h4 {
    margin-bottom: 0.5rem;
  }
  ul {
    margin: 0.5rem 0 1rem;
    padding-left: 1.5rem;
  }
  li {
    margin-bottom: 0.4rem;
  }
  strong {
    font-weight: 600;
  }
  </style>
  