<template>
    <div class="container">
        <section id="page-top">
            <div class="d-flex justify-content-between align-items-center">
                <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>         
                <div class="d-flex flex-column">
                    <nuxt-link to="/admin-manager" class="btn btn-light">
                        Retour sur le gestionnaire
                    </nuxt-link>
                    <nuxt-link to="/" class="btn btn-light">
                        Se déconnecter
                    </nuxt-link>
                </div>
            </div>
            <h1>Liste des responsables</h1>
        </section> 
        <section id="page-admin-list">
            <div id="admin-list" class="d-flex flex-column justify-content">
                <div class="card d-flex flex-md-row">
                    <input type="text" class="form-control" name="create" placeholder="Nouveau..." v-model="postname"/>
                    <v-button class="btn btn-outline-success" name="create" v-on:click="createEvent()">Créer</v-button>
                </div>
                <div class="card d-flex flex-md-row" v-for="evenement in evenements" :nom="evenement.nom" :etat="evenement.etat" :class="evenement.etat" :key="evenement._id" v-if="evenement.etat==='disponible'">
                    <input type="text" class="form-control" name="create" placeholder="Evenement" v-model="evenement.nom"/>
                    <div class="d-flex flex-md-row">
                        <v-button class="btn btn-outline-warning" name="modify" v-on:click="modifyEvent(evenement.id, evenement.nom)">Modifier</v-button>
                        <v-button class="btn btn-outline-danger" name="delete" v-on:click="deleteEvent(evenement.id)">Supprimer</v-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
export default {
    data() {
        return {
          warning: true,
          evenements:[],
          postname: ''
        }
    },
    methods:{
        getData() {
          this.$axios.get('http://localhost:8000/api/evenements', {
              headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
              }
          })
            .then(response => {this.evenements = response.data})
            .catch(err => this.evenements = [{title : "Erreur de chargement"}]);
        },
        createEvent() {
            this.$axios.post('http://localhost:8000/api/evenements', {
                nom: this.postname,
                etat: 'disponible'
            }).then(function (response) {
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        modifyEvent(id,name) {
            this.$axios.put(`http://localhost:8000/api/evenements/${encodeURIComponent(id)}`, {
                nom: name
            }).then(function (response) {
                console.log(response);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteEvent(id) {
            if (this.warning){
                alert('Vous êtes sur le point de supprimer cet utilisateur ! Si vous êtes sûr, rappuyez sur le bouton de suppression');
                this.warning=false;
            } else {
                this.$axios.delete(`http://localhost:8000/api/evenements/${encodeURIComponent(id)}`)
                .then(function (response) {
                    window.location.reload()
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
    },
    mounted: function(){
        this.getData();
    }  
} 
</script>

<style scoped>

#admin-list
{
  margin-top: 4px;  
  padding : 4px;
  height: 300px;
  overflow-y: scroll;
}
v-button
{
    margin : 2px;
}
</style>