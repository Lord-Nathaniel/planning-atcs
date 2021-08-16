<template>
    <div class="col card">
        <h3>{{ evenement }}</h3>
        <p>{{ date }}</p>        
    </div>
</template>

<script>
    export default {
        name: 'Permanence',
        props: ["type","evenement","semaine","date"],
    }
</script>

<style scoped>

</style>