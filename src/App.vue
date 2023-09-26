<template>
    <Navbar />
    <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue'
export default{
    components: {
        Navbar
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Montserrat:wght@300;400&display=swap');

body{
    margin: 0;
    padding: 0;
    background-color: #444;
}

p, a, h1, button{
    font-family: "inter", sans-serif;
}
</style>
