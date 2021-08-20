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
        <section id="page-admin-list" class="card">
            <div id="admin-list" class="d-flex flex-column justify-content">
                <div class="card d-flex flex-row bg-info">
                    <div class="d-flex flex-row align-items-center inside-card">
                        <input type="text" class="form-control" name="create" placeholder="Nouveau..." v-model="postname"/>
                        <v-button class="btn btn-light" name="create" v-on:click="createEvent()">Créer</v-button>
                    </div>
                </div>
                <div class="card d-flex flex-md-row" v-for="evenement in evenements" :nom="evenement.nom" :etat="evenement.etat" :class="evenement.etat" :Permanences="evenement.Permanences" :key="evenement._id" v-if="evenement.etat==='disponible'">
                    <div class="d-flex flex-row align-items-center inside-card">
                        <input type="text" class="form-control" name="create" placeholder="Evenement" v-model="evenement.nom"/>
                        <p>nombre de permanences : {{ evenement.Permanences.length }}</p>
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
    name:'admin-list',
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
        createEvent() { //create a new evenement => automatically given the 'disponible' state, since the admin will only create new responsibles
            this.$axios.post('http://localhost:8000/api/evenements', {
                nom: this.postname,
                etat: 'disponible'
            })
            .then(response => { window.location.reload() })
            .catch(error => { console.log(error) });
        },
        modifyEvent(id,name) { //update the evenement name
            this.$axios.put(`http://localhost:8000/api/evenements/${encodeURIComponent(id)}`, {
                nom: name
            })
            .then(response => { window.location.reload() })
            .catch(error => { console.log(error) });
        },
        deleteEvent(id) { //first time => trigger an alert //second time => delete the evenement
            if (this.warning){
                alert('Vous êtes sur le point de supprimer cet utilisateur ! Si vous êtes sûr, rappuyez sur le bouton de suppression');
                this.warning=false;
            } else {
                this.$axios.delete(`http://localhost:8000/api/evenements/${encodeURIComponent(id)}`)
                .then(response => { window.location.reload() })
                .catch(error => { console.log(error) });
            }
        },
    },
    mounted: function(){
        this.getData();
    }  
} 
</script>


<style scoped>
#page-admin-list
{
    border : solid 1px #000;
}
#admin-list
{
    margin-top: 4px;  
    padding : 4px;
    height: 300px;
    overflow-y: scroll;
}
v-button
{
    margin: 2px;
}
p{
    display: inline-block;
    width: fit-content;
    margin-bottom: 0;
    margin-left: 8px;
}
.card{
    padding: 5px;
    margin: 2px;
}
.btn{
    margin: 5px;
}
.inside-card{
    width: 100%;
}
</style>