<template>
    <div class="container">
        <section id="page-top">
            <div class="d-flex justify-content-between align-items-center">
                <img src="~/static/src/img/logo_atcs.png" alt="logo atcs association de tir de criquebeuf sur seine"/>         
                <div class="d-flex flex-column">
                    <nuxt-link to="/" class="btn btn-light">
                        Retour sur le planning
                    </nuxt-link>
                </div>
            </div>
            <h1>Identifiez-vous</h1>
        </section> 
        <section id="page-login">
            <div id="login" class="card form-signin">
                <p>Email d'identification :</p>
                <input v-model="email" type="email" class="form-control" placeholder="Email" required>
                <p>Mot de passe :</p>
                <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                <p id="error-text" v-if="error">Identifiant ou mot de passe incorrect</p>
                <button class="w-100 btn btn-lg btn-info" type="submit" v-on:click="login()">Sign in</button>                
            </div>
        </section> 
    </div>
</template>


<script>
export default {
    name:'Login',
    data() {
        return {
            email: '', //adminatcs@atcs.fr
            password: '', //@dm1n
            jwtoken:'',
            error:false,
            messagetext:false,
        }
    },
    methods: {
        login() {
            this.$axios.post('http://localhost:8000/api/login', {
                username: this.email,
                password: this.password
            })
            .then(response => { this.$cookies.set('jwt', response.data.token, {
                path:'/',
                maxAge: 60*60*24*7, //one week
                }); 
                this.$router.push('/admin-manager');})
            .catch(error => { this.error = true;
                console.log(error) });
        },       
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

}
#login 
{
    
}
.form-signin 
{
    border: solid 1px #000;
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
#error-text{
    color: #f00;
}
</style>