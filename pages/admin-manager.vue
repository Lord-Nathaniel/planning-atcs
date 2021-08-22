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
            <div>
                <input type="checkbox" id="checkboxShowAllWeeks" v-model="showAllWeeks">                
                <label for="checkboxShowAllWeeks">Montrer les semaines précédentes</label>
            </div>
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
                        <div v-for="semaine in semaines" class="row" :class="nbCol" v-if="semaine >= currentDate.week || showAllWeeks">
                            <p class="d-flex align-items-center justify-content-center"><b>Semaine {{ semaine }}</b></p>
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
                <div class="d-flex justify-content-around">
                    <p id="permanences-alert" class="card" v-if="nbIndisponibles > 1">{{ nbIndisponibles }} permanences ne sont pas assurées !</p>
                    <p id="permanences-alert" class="card" v-if="nbIndisponibles === 1">{{ nbIndisponibles }} permanence n'est pas assurée !</p>  
                    <div>                  
                        <v-button id="createNextWeek" class="btn btn-secondary" name="createNextWeek" v-on:click="createNextWeek()">Créer</v-button>
                        <label for>Créer la semaine suivante</label>
                    </div>
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
            currentDate:{
                day:"",
                week:"",
                year:"",
            },
            showAllWeeks:false,
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
        },
        getCurrentDate() { //take the current date
            let date = new Date();
            this.currentDate.day = date.getDay();
            this.currentDate.year = date.getFullYear();
            date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
            let currentYear = new Date(Date.UTC(date.getUTCFullYear(),0,1));
            let currentWeek = Math.ceil(( ( (date - currentYear) / 86400000) + 1)/7);;
            this.currentDate.week = currentWeek;
        },
        async createNextWeek() { //create X new permanences, with X = nb of Types
            console.log("createNextWeek started!");
            //get the nextWeek
            let nextWeek = this.semaines.slice(-1);
            nextWeek ++;
            //get the date, regarding the type's day
            let nextDays = [];
            //get the nb of types
            let nextTypes = [];
            let currentDateWeek = this.currentDate.week;
            let currentDateDay = this.currentDate.day;
            this.types.forEach(function(typ) {
                if (typ != ""){
                    console.log(typ.nom);
                    nextTypes.push("/api/types/" + typ.id);
                    //to get the date in regard of the day
                    let regex = /^([\w\-]+)/;
                    let word = typ.nom.match(regex);
                    let futureDay ="";
                    switch (word[0]) {
                        case "Lundi": 
                            futureDay = 1;
                        break;
                        case "Mardi":
                            futureDay = 2;
                        break;
                        case "Mercredi":
                            futureDay = 3;
                        break;
                        case "Jeudi":
                            futureDay = 4;
                        break;
                        case "Vendredi":
                            futureDay = 5;
                        break;
                        case "Samedi":
                            futureDay = 6;
                        break;
                        case "Dimanche":
                            futureDay = 0;
                        break;
                        default: 
                            console.log("error");
                        break;                        
                    };
                    //math for having the number of days differing for the requested date
                    
                    let diffWeek = nextWeek - currentDateWeek -1;
                    let diffDay = futureDay - currentDateDay;
                    if (diffDay === 0){ //if the two days are exactly the same, add one week
                        diffDay = 7;
                    };
                    let totalDiff = diffWeek*7 + diffDay;

                    //adding the date to the array
                    let futureDate = new Date();
                    futureDate = new Date(Date.UTC(futureDate.getFullYear(), futureDate.getMonth(), futureDate.getDate()+totalDiff));
                    nextDays.push(futureDate);
                }; 
            });
            
            console.log("nextDays :"+nextDays);
            console.log("nextTypes :"+nextTypes);


            for(let i=0; i<nextTypes.length; i++){
                console.log("nouvelle permanence:")
                console.log("semaine: "+nextWeek);
                console.log("date: "+nextDays[i]);
                console.log("Type: "+nextTypes[i]);
                console.log("Evenement: "+"/api/evenements/2");
            };
            //no need to get the evenement, it is automatically set to "N/A"                  
            for(let i=0; i<nextTypes.length; i++){
            await this.$axios.post('http://localhost:8000/api/permanences', {
                semaine:nextWeek,
                date: nextDays[i],
                Type: nextTypes[i],
                Evenement:"/api/evenements/2"
            })
            .then(response => {
                console.log(response)
                if (i == nextTypes.length-1){
                    window.location.reload() }})
            .catch(error => { console.log(error) });
            }        
        }
    },
    mounted: function(){
        this.getData();
        this.getEvents();
        this.getTypes();
        this.getCurrentDate();
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