<template>
<div>
  <div class="form-group ">
   <b>Ajouter un membre</b> <br /><br />
    <input type="text" class="form-control" id="create-membre"  placeholder="nom" v-model="nom">
    <input type="text" class="form-control" id="create-membre"  placeholder="prenom" v-model="pre">
    <input type="text" class="form-control" id="create-membre"  placeholder="adresse" v-model="adr">
    <input type="email" class="form-control" id="create-membre"  placeholder="mail" v-model="mail">
    <input type="tel" class="form-control" id="create-membre"  placeholder="telephone" v-model="tel">
    <input type="date" class="form-control" id="date"  placeholder="date naissance" v-model="naiss" @keyup.enter="createMembre">

    <button type="submit" class="btn btn-primary" v-on:click="createMembre">Submit</button>  
  </div>
    <b>liste des membres</b> <br /><br />

    <button type="submit" class="btn btn-primary" v-on:click="getFiltredMembres('nom')">Trier par nom</button>
    <button type="submit" class="btn btn-primary" v-on:click="getFiltredMembres('prenom')">Trier par prenom</button>
    <button type="submit" class="btn btn-primary" v-on:click="getFiltredMembres('age')">Trier par age</button>
    <br /><br />
    <input type="text" class="form-control" placeholder="Chercher par nom" v-model="search" @change="getMembres()">
    <br /><br />
    <table class ="table">
      <thead class ="thead-dark">
        <tr>
          <th scope ="col">Index</th>
          <th scope ="col">Nom</th>
          <th scope  ="col">Prenom</th>
          <th scope  ="col">Date de naissance</th>
          <th scope  ="col">Age</th>
          <th scope  ="col">Adresse</th>
          <th scope  ="col">Telephone</th>
          <th scope  ="col">Mail</th>
          <th scope  ="col">Inscription</th>
          <th scope  ="col">Supprimer</th>
        </tr>
      </thead>
      <tbody
        v-for="(membre,index) in membres" 
        v-bind:membre="membre" 
        v-bind:index="index" 
        v-bind:key="membre._id"
      >
        <tr>
          <td>
            <div>{{index + 1}}</div>
          </td>
          <td @click="modifier(membre,'nom')">
              <input v-if="control(membre,'nom')" type="text" v-model="membre.nom" @keyup.enter="updateMembre(membre._id,'nom',membre.nom)" >
              <div v-if="!control(membre,'nom')">{{membre.nom}}</div>
          </td>
          <td @click="modifier(membre,'prenom')">
              <input v-if="control(membre,'prenom')" type="text" v-model="membre.prenom" @keyup.enter="updateMembre(membre._id,'prenom',membre.prenom)" >
              <div v-if="!control(membre,'prenom')">{{membre.prenom}} </div>
          </td>
          <td @click="modifier(membre,'naissance')">
              <input v-if="control(membre,'naissance')" type="date" v-model="membre.naissance" @keyup.enter="updateMembre(membre._id,'naissance',membre.naissance)" >
              <div v-if="!control(membre,'naissance')">{{`${membre.naissance.getDate()}.${membre.naissance.getMonth()+1}.${membre.naissance.getFullYear()}`}} </div>
          </td>
          <td>
              {{membre.age}}
          </td>
          <td @click="modifier(membre,'adresse')">
              <input v-if="control(membre,'adresse')" type ="text" v-model="membre.adresse" @keyup.enter="updateMembre(membre._id,'adresse',membre.adresse)">
              <div v-if="!control(membre,'adresse')">{{membre.adresse}} </div>
          </td>
          <td @click="modifier(membre,'telephone')">
              <input v-if="control(membre,'telephone')" type ="text" v-model="membre.telephone" @keyup.enter="updateMembre(membre._id,'telephone',membre.telephone)">
              <div v-if="!control(membre,'telephone')">{{membre.telephone}} </div>
          </td>
          <td @click="modifier(membre,'mail')">
              <input v-if="control(membre,'mail')" type ="text" v-model="membre.mail" @keyup.enter="updateMembre(membre._id,'mail',membre.mail)">
              <div v-if="!control(membre,'mail')">{{membre.mail}} </div>
          </td>
          <td @click="modifier(membre,'inscription')">
              <input v-if="control(membre,'inscription')" type="date" v-model="membre.inscription" @keyup.enter="updateMembre(membre._id,'inscription',membre.inscription)" >
              <div v-if="!control(membre,'inscription')">{{`${membre.inscription.getDate()}.${membre.inscription.getMonth()+1}.${membre.inscription.getFullYear()}`}} </div>
          </td>
          <td><button type="submit" class="btn btn-primary" v-on:click="deleteMembre(membre._id)">Delete</button>  </td>
        </tr>
    </tbody>
    </table>
    
  </div>
</template>

<script>
import MembreService from "../MembreService";

export default {
  name: "Membre",
  data() {
    return {
      membres: [],
      nom1: "nom",
      nom: "",
      pre: "",
      adr: "",
      mail: "",
      tel: "",
      naiss: "",
      error: "",
      sort: "nom",
      editing: "", //membre en train d'être éditer
      champ: "", //champ du membre en train d'être éditer
      index: 0,
      search: ""
    };
  },
  async created() {
    try {
      this.membres = await MembreService.getMembresAndActualise(this.sort);
    } catch (err) {
      this.error = err.message;
    }
  },

  methods: {
    getFiltredMembres(sort) {
      this.sort = sort;
      this.getMembres();
    },
    async getMembres() {
      this.membres = await MembreService.getFiltredMembres(
        this.sort,
        this.search
      );
    },

    async updateMembre(id, a, b) {
      if (a === "nom") {
        await MembreService.udpateMembreNom(id, b);
      }
      if (a === "prenom") {
        await MembreService.udpateMembrePrenom(id, b);
      }
      if (a === "adresse") {
        await MembreService.udpateMembreAdresse(id, b);
      }
      if (a === "naissance") {
        await MembreService.udpateMembreNaissance(id, b);
        await MembreService.MembreActualiseAge(id, b);
      }
      if (a === "telephone") {
        await MembreService.udpateMembreTelephone(id, b);
      }
      if (a === "inscription") {
        await MembreService.udpateMembreInscription(id, b);
      }
      if (a === "mail") {
        await MembreService.udpateMembreMail(id, b);
      }
      this.editing = "";
      this.champ = "";
      this.getMembres();
    },
    async createMembre() {
      await MembreService.postMembre(
        this.nom,
        this.pre,
        this.adr,
        this.mail,
        this.tel,
        this.naiss
      );
      this.nom = "";
      this.pre = "";
      this.adr = "";
      this.mail = "";
      this.tel = "";
      this.naiss = "";

      this.getMembres();
    },
    async deleteMembre(id) {
      await MembreService.deleteMembre(id);
      this.getMembres();
    },
    modifier(membre, champ) {
      this.editing = membre._id;
      this.champ = champ;
    },

    control(membre, champ) {
      return this.editing == membre._id && this.champ == champ;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
