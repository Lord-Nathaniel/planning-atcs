<template>
  <div class="container">
    <section id="page-top">
      <div class="d-flex justify-content-between align-items-center">
        <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>
        <nuxt-link to="/connection" class="btn btn-light">
          Se connecter
        </nuxt-link>
        <button v-on:click="getData()">
            Mettre à jour
        </button>
      </div>
      <h1>Planning des permanences</h1>
    </section>
    <section id="page-planning">
      <div id="planning" class="row row-cols-4">
        <div v-for="plage in types">
          <h4>
            {{ plage.nom }}
          </h4>
        </div>        
        <Permanence v-for="permanence in permanences" :date="permanence.date" :evenement="permanence.evenement" :class="permanence.evenement" :key="permanence._id"/>
      </div>
      <div id="legende" class="row row-cols-4">
        <div class="d-flex flex-row">
          <div id="carre-blanc"></div>
          <p>permanence assurée</p>
        </div>
        <div class="d-flex flex-row">
          <div id="carre-orange"></div>
          <p>permanence non-assurée</p>
        </div>
        <div class="d-flex flex-row">
          <div id="carre-gris"></div>
          <p>fermeture de l'association</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Permanence from '~/components/Permanence';

  export default {
    data() {
        return {
            types:[],
            permanences:[]
        }
    },
    methods: {
        getData(){
          console.log("bonton Mettre à jour cliqué");
          this.$axios.get('http://localhost:8000/api/types', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => this.types = response.data)
            .catch(err => this.types = [{title : "Erreur de chargement"}]);
          this.$axios.get('http://localhost:8000/api/permanences', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => this.permanences = response.data)
            .catch(err => this.permanences = [{title : "Erreur de chargement"}]);
            console.log(this.types);
        }
    },
    components: {
      Permanence
    },
  }    
</script>


<style>
#planning
{
  height: 300px;
  overflow-y: scroll;
}
#planning>.card
{
  margin-top : 4px;
}
#carre-blanc
{ 
  height: 30px;
  width: 30px;
  background-color: #fff;
  border: solid 0.5mm #000;
}
#carre-orange
{ 
  height: 30px;
  width: 30px;
  background-color: #f29206;
  border: solid 0.5mm #000;
}
#carre-gris
{ 
  height: 30px;
  width: 30px;
  background-color: #818181;
  border: solid 0.5mm #000;
}
.unavailable
{
  background-color: #f29206;
}
.closed
{
  background-color: #818181;
}
.available
{
  background-color: #fff;
}
#page-top>h1
{ 
  text-align: center;
  margin: 35px;
}
#page-planning
{ 
  padding: 10px 40px;
  border : solid 1px #000;
}
#legende
{ 
  margin-top : 20px;
}
#legende > div > div
{
  margin-right: 8px;
}
#page-top .btn
{ 
  padding: 8px 25px;
  border : solid 1px #000;
  margin : 10px;
}
</style>