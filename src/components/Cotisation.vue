<template>
   <div >
       <div v-for="(cotisation,index) in cotisations"
        v-bind:cotisation="cotisation"
        v-bind:index="index" 
        v-bind:key="cotisation._id">
        {{cotisation.membre.nom}}
        </div>
        <input type="text" v-model="cotisation.annee" placeholder="annee"><br/>
        <input type="text" v-model="cotisation.montant" placeholder ="montant"> <br/>
        <button type="submit" class="btn btn-primary" v-on:click="createCotisation">Créer</button>
        </div>
</template>

<script>
import CotisationService from "../CotisationService.js";
export default {
  name: "Cotisation",
  data() {
    return {
      cotisations: [],
      err: "",
      test: null,
      cotisation: {
        annee: null,
        montant: null
      }
    };
  },
  async created() {
    try {
      this.cotisations = await CotisationService.getCotisations();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createCotisation() {
      await CotisationService.postCotisation(
        this.cotisation.annee,
        this.cotisation.montant
      );
      this.getCotisation();
    },
    async getCotisation() {
      this.cotisations = await CotisationService.getCotisations();
    }
  }
};
</script>

<style>
</style>