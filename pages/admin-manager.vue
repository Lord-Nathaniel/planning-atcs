<template>
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
            <v-app id="planning-manager">  
                <div id="day" class="row" :class="nbCol">
                    <div v-for="typ in types" :nom="typ.nom" :key="typ._id">
                        <p><b>{{ typ.nom }}</b></p>
                    </div>  
                </div>
                <div id="admin-manager">
                    <div class="col">
                        <div v-for="semaine in semaines" class="row" :class="nbCol">
                            <p class="d-flex align-items-center justify-content-center"><b>Semaine{{ semaine }}</b></p>
                            <div class="card" v-for="permanence in permanences" :semaine="permanence.semaine" :date="permanence.date" :Type="permanence.Type" :Evenement="permanence.Evenement" :class="permanence.Evenement.etat" :key="permanence._id" v-if="permanence.semaine == semaine">
                                <v-select v-model="permanence.Evenement.id" :items="evenements" :reduce="evenements => evenement.id" name="evenements" item-text="nom" item-value="id" @input="updatePermanence(permanence.id,$event)">
                                </v-select>
                                <p>{{ permanence.date }}</p>
                            </div>
                        </div>                    
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
                <div>
                    <p id="permanences-alert" class="card" v-if="nbIndisponibles > 1">{{ nbIndisponibles }} permanences ne sont pas assurées !</p>
                    <p id="permanences-alert" class="card" v-if="nbIndisponibles === 1">{{ nbIndisponibles }} permanence n'est pas assurée !</p>
                </div>
            </v-app>   
        </section>
    </div>
</template>


<script>
export default {
    name:'admin-manager',
    data() {
        return {
            semaines:[],
            permanences:[],
            evenements:[],
            types:[],
        }
    },
    methods:{
        getEvents() { //fetch the evenements, save them in data => used to view and modify the evenement of a permanence
            this.$axios.get('http://localhost:8000/api/evenements', {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => {this.evenements = response.data})
            .catch(err => this.evenements = [{title : "Erreur de chargement"}]);
        },
        getTypes() { //fetch the evenements, save them in data => used to view and modify the evenement of a permanence            
            this.$axios.get('http://localhost:8000/api/types', {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => {this.types = response.data;
            this.types.unshift('');})
            .catch(err => this.evenements = [{title : "Erreur de chargement"}]);
        },
        getData() { //fetch the permanences, save them in data, changes the date format => used to view the permanences in the planning
            this.$axios.get('http://localhost:8000/api/permanences', {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => {this.permanences = response.data;
                let tempWeek=0;
                let tempArray=[];
                this.permanences.forEach(function(permanence) {
                    let tempdate = permanence.date.split(/-|T/);
                    permanence.date = tempdate[2]+"-"+tempdate[1]+"-"+tempdate[0];
                    if (permanence.semaine !== tempWeek){
                        tempWeek = permanence.semaine;
                        tempArray.push(tempWeek);
                    };                    
                });
                this.semaines=tempArray;
            })
            .catch(err => this.permanences = [{title : "Erreur de chargement"}]);
        },
        updatePermanence(permanenceid, evenementid) { //update the evenements bindded to a permanence
            let url ="/api/evenements/"+evenementid;
            this.$axios.put(`http://localhost:8000/api/permanences/${encodeURIComponent(permanenceid)}`, {
                
                Evenement: url
                
            }).then(function (response) {
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
        this.getTypes();
    },
    computed: {
        nbIndisponibles: function() {
            let tempNb=0;
            this.permanences.forEach(function(permanence) {
                if (permanence.Evenement.etat === "indisponible"){
                    tempNb ++;
                }; 
            });
            return tempNb;
        },
        nbCol: function() {            
            let nbcol = this.types.length;
            let url = "row-cols-" + nbcol;
            return url;
        }   
    }  
} 
</script>


<style scoped>
#page-admin-manager
{
    padding: 10px 20px;
    border : solid 1px #000;
}
#admin-manager
{
    margin-top: 4px;
    height: 400px;
    overflow-y: scroll;
}
#admin-manager>.card
{
    margin-top: 4px;
    padding-top: 4px;
}
#planning-manager
{
    min-height: auto;
}
::v-deep .v-application--wrap 
{
    min-height: fit-content;
}
#permanences-alert
{
    display: inline-block;
    padding: 4px;
    margin: 8px;
    background-color: #f29206;    
    border: solid 0.5mm #000;
}
</style>