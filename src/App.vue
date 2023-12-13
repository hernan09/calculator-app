<template>
  <Menubar :model="items" class="custom-menubar" />
  <router-view />
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import Menubar from "primevue/menubar";
import router from "./router.js";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    Menubar,
  },
  setup() {
    const items = ref([
      { label: "Inicio", icon: "pi pi-home", command: () => navigateTo("/") },
      {
        label: "Productos",
        icon: "pi pi-th-large",
        command: () => navigateTo("/productos"),
      },
      {
        label: "Servicios",
        icon: "pi pi-cog",
        command: () => navigateTo("/servicios"),
      },
      {
        label: "Contacto",
        icon: "pi pi-envelope",
        command: () => navigateTo("/contactos"),
      },
    ]);

    const navigateTo = (path) => {
      console.log(path);
      router.push(path);
    };

    return {
      items,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.p-menubar {
  background: rgba(76, 190, 255, 0.6);
  padding: 0;
  height: 50px;
}
</style>
