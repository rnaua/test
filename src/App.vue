<template>
  <div id="app">
  <Cotisation></Cotisation>
  <Membre></Membre>
  </div>
</template>

<script>
import Membre from "./components/Membre.vue";
import Cotisation from "./components/Cotisation";

export default {
  name: "app",
  components: {
    Membre,
    Cotisation
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
