<template>
  <div class="container">
    <h1>Bienvenue dans l'atelier de test général</h1>
    <section>
      <div>
        <button type="button" class="btn btn-warning">
          <nuxt-link to="/connection">
            Se connecter
          </nuxt-link>
        </button>
        
      </div>
    </section>
    <section>
      <div>
        <h2>passage du component Permanence</h2>
        <Permanence
          type="Lundi Après-midi"
          date="09/08/2021"
          event="M. Arnaud"
        />  
      </div>
    </section>
    <section>
      <div class="row">
        <h2> utilisation de data()</h2>
        <div class="col-3" v-for="permanence in permanences" :key="permanence._id">
          <h3>{{ permanence.event }}</h3>
          <p>{{ permanence.type }}</p>
          <p>{{ permanence.date }}</p>     
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <h2> utilisation du composant et biding</h2>
        <Permanence v-for="permanence in permanences" v-bind:type="permanence.type" :date="permanence.date" :event="permanence.event" :key="permanence._id"/> 
      </div>
    </section>
  </div>
</template>

<script>
  import Permanence from '~/components/Permanence';

  export default {
    data() {
      return {
        permanences: [
          { type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud'},
          { type: 'Samedi matin', date: '14/08/2021', event: 'M. Arnaud'},
          { type: 'Samedi après-midi', date: '14/08/2021', event: 'M. Arnaud'},
          { type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé'},
          
          { type: 'Lundi après-midi', date: '09/08/2021', event: 'M. Arnaud'},
          { type: 'Samedi matin', date: '14/08/2021', event: 'M. Arnaud'},
          { type: 'Samedi après-midi', date: '14/08/2021', event: 'M. Arnaud'},
          { type: 'Dimanche matin', date: '15/08/2021', event: 'Fermé'},
        ]
      }
    },
    components: {
      Permanence
    },
  }
</script>

<style>

</style>