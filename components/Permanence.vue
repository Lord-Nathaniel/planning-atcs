<template>
    <div class="col card">
        <h3>{{ event }}</h3>
        <p>{{ date }}</p>        
    </div>
</template>

<script>
    export default {
        name: 'Permanence',
        props: ["week","type","date","event"],
    }
</script>

<style scoped>

</style>