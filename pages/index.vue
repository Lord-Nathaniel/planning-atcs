<template>
  <div class="container">
    <section id="page-top">
      <div class="d-flex justify-content-between align-items-center">
        <img src="~/static/img/logo_atcs.jpg" alt="logo atcs association de tir de criquebeuf sur seine"/>
        <nuxt-link to="/connection" class="btn btn-light">
          Se connecter
        </nuxt-link>
      </div>
      <h1>Planning des permanences</h1>
    </section>
    <section id="page-planning">
      <div id="planning" class="row row-cols-4">
        <div v-for="plage in plages">
          <h4>
            {{ plage }}
          </h4>
        </div>        
        <Permanence v-for="permanence in permanences" :date="permanence.date" :event="permanence.event" :class="permanence.state" :key="permanence._id"/>
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
        plages: ["Lundi après-midi","Samedi matin","Samedi après-midi", "Dimanche matin"],
        permanences: [
          { week: 'Semaine 32', type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 32', type: 'Samedi matin', date: '14/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 32', type: 'Samedi après-midi', date: '14/08/2021', event: 'N/A', state: 'unavailable'},
          { week: 'Semaine 32', type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé', state: 'closed'},

          { week: 'Semaine 33', type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 33', type: 'Samedi matin', date: '14/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 33', type: 'Samedi après-midi', date: '14/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 33', type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé', state: 'closed'},

          { week: 'Semaine 34', type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 34', type: 'Samedi matin', date: '14/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 34', type: 'Samedi après-midi', date: '14/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 34', type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé', state: 'closed'},

          { week: 'Semaine 35', type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 35', type: 'Samedi matin', date: '14/08/2021', event: 'N/A', state: 'unavailable'},
          { week: 'Semaine 35', type: 'Samedi après-midi', date: '14/08/2021', event: 'N/A', state: 'unavailable'},
          { week: 'Semaine 35', type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé', state: 'closed'},

          { week: 'Semaine 36', type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud', state: 'available'},
          { week: 'Semaine 36', type: 'Samedi matin', date: '14/08/2021', event: 'N/A', state: 'unavailable'},
          { week: 'Semaine 36', type: 'Samedi après-midi', date: '14/08/2021', event: 'N/A', state: 'unavailable'},
          { week: 'Semaine 36', type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé', state: 'closed'},
        ]
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