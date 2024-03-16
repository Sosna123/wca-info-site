<template>
    <Navbar />
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        Navbar,
    },
});
</script>

<style></style>
