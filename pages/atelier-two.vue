<template>
    <div>
    <h1>Bienvenue dans l'atelier de test de la communication avec les API</h1>
        <button v-on:click="updatePost()">
            Mettre à jour
        </button>
        <button v-on:click="createPost()">
            Créer un post
        </button>
        <ul>
            <li v-for="post in posts" :key="post._id">
                {{ post.title }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts:[],
            }
        },
        methods: {
            updatePost(){
                this.$axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => this.posts = response.data)
                .catch(err => this.posts = [{title : "Erreur de chargement"}]);
            },
            createPost(){
                this.$axios.post('https://jsonplaceholder.typicode.com/posts', {
                    id: 101,
                    title: 'foo',
                    body: 'bar',
                    userId: 1
                }).then(response => console.log(response));
            }
        }
    }    
</script>

<style>

</style>