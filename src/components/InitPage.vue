<template>
  <div class="contenedor">
    <!-- Banner o menú principal, si querés mantener algo arriba -->
    <header class="header">
      <h1 class="title">Calculadora de gastos</h1>
      <div class="wave-border">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#007ad9"
            d="M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,58.7C672,53,768,75,864,101.3C960,128,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div class="wave-container">
        <div class="wave wave-back"></div>
        <div class="wave wave-front"></div>
      </div>
    </header>

    <!-- Acá podés importar tus otras secciones -->
    <section class="formulario-section">
      <!-- Ejemplo: <FormularioGastos /> -->
      <CalculadoraGastos />
    </section>

    <!-- Footer si querés -->
    <!-- <footer class="footer">
      <p>© 2025 Mi Calculadora de Gastos Compartidos</p>
    </footer> -->
  </div>
</template>

<script>
import CalculadoraGastos from "@/components/CalculadoraGastos.vue";
export default {
  components: {
    CalculadoraGastos,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background: #007ad9;
  color: white;
  padding: 2rem 1rem 6rem;
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  max-height: 155px;
}
.title{
  z-index: 100000;
}

/* Esta es la ola decorativa del borde */
.wave-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  overflow: hidden;
}

.wave-border svg {
  display: block;
  width: 100%;
  height: 60px;
}

/* Olas animadas */
.wave-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat-x;
  background-size: 50% 100%;
  opacity: 0.4;
  animation: wave 8s linear infinite;
  transform: translateY(0);
}

.wave-front {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,58.7C672,53,768,75,864,101.3C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  z-index: 2;
  opacity: 0.5;
  animation-delay: 0s;
}

.wave-back {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a6d7f2' fill-opacity='1' d='M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,58.7C672,53,768,75,864,101.3C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  z-index: 1;
  opacity: 0.3;
  animation-delay: 2s;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.formulario-section {
  margin-top: 3rem;
  width: 90%;
  /* Aquí podés agregar estilos para el formulario de gastos */
}

.footer {
  margin-top: 4rem;
  padding: 1rem;
  background-color: #f2f2f2;
  width: 100%;
  text-align: center;
}
</style>
