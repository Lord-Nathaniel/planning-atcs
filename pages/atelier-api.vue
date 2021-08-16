<template lang="">
    <div>
        <h1>Atelier sur l'API</h1>
        <div v-for="permanence in permanences" :semaine="permanence.semaine" :date="permanence.date" :Type="permanence.Type" :Evenement="permanence.Evenement" :class="permanence.Evenement.etat" :key="permanence._id">    
        {{ permanence.semaine }} 
        {{ permanence.Type.nom }} 
        {{ permanence.Evenement.nom }} 
        {{ permanence.date }}
        </div>
        <!--<div v-for="property in obj.filter(property => property != 'image')"> {{ property }} </div>-->
        <!--<div v-for="permanence in permanences.filter(permanence => semaine !== '32')"> {{ permanence }} </div>-->


        <!--<div>
            <div class="col card">
                <h3>{{ permanence.Evenement.nom }}</h3>
                <p>{{ permanence.date }}</p>        
            </div>
        </div>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            types:[],
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
            this.permanences.forEach(function(permanence) {
                let tempdate = permanence.date.split(/-|T/);
                permanence.date = tempdate[2]+"-"+tempdate[1]+"-"+tempdate[0];
                })
            })
            .catch(err => this.permanences = [{title : "Erreur de chargement"}]);
        } 
    },
    mounted: function(){
        this.getData();
    },
    computed: {
        numSemaine: function(){
            return _.pickBy(this.permanences, function(permanence){
                return permanence.semaine;
            })
        }
    }    
}
</script>
<style>
div{
    border : solid 1px #000;
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