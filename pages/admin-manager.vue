<template>
  <div class="container">
    <section id="page-top">
      <div class="d-flex justify-content-between align-items-center">
        <img src="~/static/img/logo_atcs.jpg" alt="logo atcs association de tir de criquebeuf sur seine"/>
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

</script>

<style scoped>

</style>