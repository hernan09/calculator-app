<template>
  <router-view />
</template>

<script>
import router from "./router.js";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    //Menubar,
  },
  setup() {
    const items = ref([
      { label: "Inicio", icon: "pi pi-home", command: () => navigateTo("/") },
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
