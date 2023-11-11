<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-4">
        <router-link class="navbar-brand me-3 fs-1 fw-light" to="/">WCA INFO</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link fs-3 fw-light" :class="{active: checkRoute('comps')}" to="/comps">Competitions</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link fs-3 fw-light" :class="{active: checkRoute('stats')}" to="/stats">Account Statistics</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {useRoute} from 'vue-router'

export default{
    setup(){

        function checkRoute(name){
            const route = useRoute()
            const currentRouteName = route.name;

            if(currentRouteName == name){
                return true;
            }
            return false;
        }
        
        return {
            checkRoute
        }
    }
}
</script>

<style>
.nb{
    display: flex;
    background: #222;
    padding: 20px;
    margin: 0 0 30px 0;
}

    /* nb-text */

.nbText{
    text-decoration: none;
    color: white;
    font-size: 48px;
    margin: 0;
}

.nbText:hover{
    color: rgb(200, 200, 200);
}

.nbText:active{
    color: rgb(150, 150, 150);
}

    /* nb-link */

.nbLink{
    text-decoration: none;
    color: white;
    font-size: 28px;
    margin: 0 5px;
    align-self: center;
}

.nbLinkFirst{
    margin-left: auto;
}

.nbLink:hover{
    color: rgb(200, 200, 200);
}

.nbLink:active{
    color: rgb(150, 150, 150);
}
</style>