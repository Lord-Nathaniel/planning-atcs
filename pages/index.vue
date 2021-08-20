<template>
  <div class="container">
    <section id="page-top">
      <div class="d-flex justify-content-between align-items-center">
        <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>
        <nuxt-link to="/login" class="btn btn-light">
          Se connecter
        </nuxt-link>
      </div>
      <h1>Planning des permanences</h1>
    </section>
    <section id="page-planning" class="card">
      <div id="planning" class="row row-cols-4">
        <!--<div v-for="semaine in semaines" :key="semaine._id">
          <h4>
            {{ numSemaine }}
          </h4>
        </div> -->       
        <div class="card" v-for="permanence in permanences" :semaine="permanence.semaine" :date="permanence.date" :Type="permanence.Type" :Evenement="permanence.Evenement" :class="permanence.Evenement.etat" :key="permanence._id">    
          <h4>{{ permanence.Evenement.nom }}</h4>
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
</template>

<script>
export default {
    data() {
        return {
          semaines:[],
          permanences:[]
        }
    },
    methods:{
        getData() {
          this.$axios.get('http://localhost:8000/api/permanences', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => {this.permanences = response.data;
            console.log(this.permanences);
            // let tempSemaine = '';
            this.permanences.forEach(function(permanence) {
                let tempdate = permanence.date.split(/-|T/);
                permanence.date = tempdate[2]+"-"+tempdate[1]+"-"+tempdate[0];
            //     console.log(permanence.semaine);
            //     console.log(this.semaines);
            //     if(this.permanences.semaine !== tempSemaine) {
            //       tempSemaine = this.permanences.semaine;
            //       this.semaines.push(tempSemaine);
            //       };
                })
            })
            .catch(err => this.permanences = [{title : "Erreur de chargement"}]);
        }
    },
    mounted: function(){
        this.getData();
    }  
} 
</script>


<style>
#__layout{
  background: linear-gradient(to right, #8C1E14, #F2F0D5);
}
#planning
{
  margin-top: 4px;
  height: 300px;
  overflow-y: scroll;
}
#planning>.card
{
  margin-top: 4px;
  padding-top: 4px;
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
.indisponible
{
  background-color: #f29206;
}
.ferme
{
  background-color: #818181;
}
.disponible
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