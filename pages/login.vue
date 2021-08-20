<template>
    <div class="container">
        <section id="page-top">
            <div class="d-flex justify-content-between align-items-center">
                <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>         
                <div class="d-flex flex-column">
                    <nuxt-link to="/admin-manager" class="btn btn-light">
                        Se connecter
                    </nuxt-link>
                    <nuxt-link to="/" class="btn btn-light">
                        Retour sur le planning
                    </nuxt-link>
                </div>
            </div>
            <h1>Identifiez-vous</h1>
        </section> 
        <section id="page-login" class="card">
            <div class="form-signin">
                <form @submit.prevent="submit">
                    <p>Email d'identification :</p>
                    <input v-model="email" type="email" class="form-control" placeholder="Email" required>
                    <p>Mot de passe :</p>
                    <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                    <button class="w-100 btn btn-lg btn-info" type="submit">Sign in</button>
                </form>
            </div>
        </section> 
    </div>
</template>


<script>
export default {
    name:'Login',
    data() {
        return {
            email: '',
            //adminatcs@atcs.fr       @dm1n
            password: ''
        }
    },
    methods: {
        login: function() {
            this.$store.dispatch('login',{
            username: this.email,
            password: this.password,
            }).then(function (response) {
            console.log(response);
            }).catch(function(err) {
            console.log(err);
            });
        }
    }  
}
</script>


<style scoped>
p
{
    margin: 8px;
}
#page-login 
{
    border : solid 1px #000;
}
.form-signin 
{
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
.form-signin .checkbox 
{
    font-weight: 400;
}
.form-signin .form-control 
{
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus 
{
    z-index: 2;
}
.form-signin input[type="email"] 
{
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] 
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>