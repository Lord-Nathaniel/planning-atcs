<template lang="">
    <div>
        <p>{{ message }}</p>
    </div>
</template>
<script>
/*export default {
    data() {
        return {
            message:'not logged in'
        }
    },
    async mounted() {
        const response = await fetch('http://localhost:8000/api/utilisateurs', {
            header: { 'Content-Type':'application/json' },
            credentials: 'include',
        })
        const content = await response.json();
        
        this.message = 'Hello' + content.name;
    }
}*/
</script>
<style>
    
</style>