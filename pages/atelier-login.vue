<template>
<!--SAVE-->
    <div class="form-signin">
        <form v-on:click="login()">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required>
            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        
        <h1>Page atelier || Login</h1>

        <AuthForm buttonText="Login" :submitForm="loginUser"/>

        <div v-if="$auth.loggedIn">
            {{ $auth.user.email }}
            <v-btn text @click="$auth.logout()">Logout</v-btn>
        </div>
        
    </div>
</template>

<script>
    import validations from "~/static/src/js/validations";
    import AuthForm from '~/components/AuthForm';
    export default {
        components: {
            AuthForm
        },
        methods: {
            async loginUser(loginInfo){
                try {
                    await this.$auth.loginWith('local', {
                        data: loginInfo
                    });
                    this.$store.dispatch('snackbar/setSnackbar', { text:'Vous êtes connecté en tant qu\'Administeur.' });
                    this.$router.push('/');
                } catch(err) {
                    this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text:'Erreur d\'identification. Veuillez réessayer.' });
                }                
            }
        }
    };
</script>

<style scoped>

</style>