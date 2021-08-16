<template>
    <div>
        <h1>Bienvenue dans l'atelier de test de l'authentification</h1>
        <div v-if="$auth.loggedIn">
            <h2>Actuellement connecté</h2>
            <p>Bienvenue {{ $auth.user.email }} </p>
            <v-btn text >Logout</v-btn>
        </div>
        <div v-else>
            <v-btn text to="/atelier-login">Login</v-btn>
            <v-btn text to="/atelier-register">Register</v-btn>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

</style>