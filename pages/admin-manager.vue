<template>
<v-app>
  <div class="container">
    <section id="page-top">
      <div class="d-flex justify-content-between align-items-center">
        <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>
        <div class="d-flex flex-column">
            <nuxt-link to="/admin-list" class="btn btn-light">
                Aller sur la liste
            </nuxt-link>
            <nuxt-link to="/" class="btn btn-light">
                Se déconnecter
            </nuxt-link>
        </div>
      </div>
      <h1>Gestion des permanences</h1>
    </section>
    <section id="page-admin-manager" class="card">
      <div id="admin-manager" class="row row-cols-4">
        <!--<div v-for="plage in plages">
          <h4>
            {{ plage }}
          </h4>
        </div>-->   
        <div class="card" v-for="permanence in permanences" :semaine="permanence.semaine" :date="permanence.date" :Type="permanence.Type" :Evenement="permanence.Evenement" :class="permanence.Evenement.etat" :key="permanence._id">
          <v-select v-model="permanence.Evenement.id" :items="evenements" :reduce="evenements => evenement.id" name="evenements" item-text="nom" item-value="id" @input="updatePermanence(permanence.id,$event)">
          </v-select>
          <p>{{ permanence.date }}</p>
        </div>
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
  </v-app>
</template>

<script>
export default {
    data() {
        return {
          semaines:[],
          permanences:[],
          evenements:[],
          test:'test'
        }
    },
    methods:{
        getEvents() {
          this.$axios.get('http://localhost:8000/api/evenements', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => {this.evenements = response.data})
            .catch(err => this.evenements = [{title : "Erreur de chargement"}]);
        },
        getData() {
          this.$axios.get('http://localhost:8000/api/permanences', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => {this.permanences = response.data;
            this.permanences.forEach(function(permanence) {
                let tempdate = permanence.date.split(/-|T/);
                permanence.date = tempdate[2]+"-"+tempdate[1]+"-"+tempdate[0];
                })
            })
            .catch(err => this.permanences = [{title : "Erreur de chargement"}]);
        },
        updatePermanence(permanenceid, evenementid) {
          let url ="/api/evenements/"+evenementid;
          console.log("permanenceid= "+permanenceid+" / url= "+url);
            this.$axios.put(`http://localhost:8000/api/permanences/${encodeURIComponent(permanenceid)}`, {
                
                  Evenement: url
                 
            }).then(function (response) {
                console.log(response);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    mounted: function(){
        this.getData();
        this.getEvents();
    }  
} 
</script>

<style scoped>
#admin-manager
{
  margin-top: 4px;
  height: 300px;
  overflow-y: scroll;
}
#admin-manager>.card
{
  margin-top: 4px;
  padding-top: 4px;
}
</style>