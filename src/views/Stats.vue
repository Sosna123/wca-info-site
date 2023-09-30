<template>
    <input type="text">
    <button @click="displayData">Click me</button>

    <div class="info" v-if="isPersonData.bool">
        <p class="dataTxt dataTxtHeader">{{ person.name }} - {{ person.id }}</p>
        <p class="dataTxt">Byłeś na {{ person.numberOfCompetitions }} zawodach takich jak:</p>
        <ul>
            <li v-for="comp in person.competitionIds">
                <p class="dataTxt">{{ comp }}</p>
            </li>
        </ul>
        <p class="dataTxt">Twoje wyniki:</p>
        <ul>
            <li v-for="comp in person.results">
                <p>{{ comp }}</p>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { ref } from 'vue';

export default{
    name: 'stats',
    setup(){
        let person = ref({});
        let isPersonData = ref({bool: false});

        const fetchData = async () => {
            isPersonData.value.bool = false;
            const promise = await fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/2022AREZ01.json`)
            const fetchedData = promise.json();
            return fetchedData;
        }

        const displayData = () => {
            fetchData().then((fetchedData) => {
                person.value = fetchedData;
                isPersonData.value.bool = true;
            })
        }

        return{
            // vars
            person, isPersonData,
            // functions
            displayData
            // packages
        }
    }
}
</script>

<style>
.dataTxt{
    color: white;
    font-size: 16px;
    margin-left: 10px;
}

.dataTxtHeader{
    font-size: 24px;
}
</style>