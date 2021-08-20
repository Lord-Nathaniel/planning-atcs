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
            <div id="day" class="row" :class="nbCol">
                <div v-for="typ in types" :nom="typ.nom" :key="typ._id">
                    <p><b>{{ typ.nom }}</b></p>
                </div>  
            </div>
            <div id="planning">
                    <div class="col">
                        <div v-for="semaine in semaines" class="row" :class="nbCol">
                            <p class="d-flex align-items-center justify-content-center"><b>Semaine{{ semaine }}</b></p>
                            <div class="card" v-for="permanence in permanences" :semaine="permanence.semaine" :date="permanence.date" :Type="permanence.Type" :Evenement="permanence.Evenement" :class="permanence.Evenement.etat" :key="permanence._id" v-if="permanence.semaine == semaine">
                                <h4>{{ permanence.Evenement.nom }}</h4>
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
        </section>
    </div>
</template>


<script>
export default {
    data() {
        return {
            semaines:[],
            permanences:[],
            types:[],
        }
    },
    methods:{
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
        }
    },
    mounted: function(){
        this.getData();        
        this.getTypes();
    },
    computed: {
        nbCol: function() {            
            let nbcol = this.types.length;
            let url = "row-cols-" + nbcol;
            return url;
        }  
    }  
} 
</script>


<style>
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
#page-top .btn
{ 
    padding: 8px 25px;
    border : solid 1px #000;
    margin : 10px;
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
#legende
{ 
    margin-top : 20px;
}
#legende > div > div
{
    margin-right: 8px;
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
#day
{
    text-align: center;
    margin-top: 5px; 
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
</style>