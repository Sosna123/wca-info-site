<template>
    <nav class="nb">
        <router-link class="nbText" to="/">WCA INFO</router-link>
        <router-link class="nbLink nbLinkFirst" to="/comps">Competitions</router-link>
        <router-link class="nbLink" to="/stats">Account Statistics</router-link>
    </nav>
</template>

<script>

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