<template>
    <input type="text" v-model="wcaId" placeholder="Type in your wca id">
    <button @click="displayData()">Click me</button>

    <div class="info" v-if="isPersonData.bool">
        <p class="dataTxt dataTxtHeader">{{ person.name }} - {{ person.id }}</p>
        <p class="dataTxt">Byłeś na {{ person.numberOfCompetitions }} zawodach takich jak:</p>
        <ul class="competitionList">
            <li v-for="comp in person.competitionIds">
                <p>{{ comp }}</p>
            </li>
        </ul>
        <p class="dataTxt">Twoje wyniki:</p>
        <ul class="resultsList">
            <li><p>{{ person.results }}</p></li>
            <li><p>{{ resultsRemap }}</p></li>
            <!-- <li v-for="comp in person.results">
                <p class="dataTxt">{{ comp }}</p>
            </li> -->
        </ul>
        
    </div>
</template>

<script>
import { ref } from 'vue';

export default{
    name: 'stats',
    setup(){
        const wcaId = ref('2022arez01')
        let person = ref({});
        let isPersonData = ref({bool: false});
        let resultsRemap = ref({});

        const fetchData = async () => {
            isPersonData.value.bool = false;
            const promise = await fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${wcaId.value.toUpperCase()}.json`)
            const fetchedData = promise.json();
            wcaId.value = ''
            return fetchedData;
        }

        const displayData = () => {
            fetchData().then((fetchedData) => {
                person.value = fetchedData;
                isPersonData.value.bool = true;
                remapResultObj();
            })
        }

        const remapResultObj = () => {
            resultsRemap.value = {}

            for(let comp in person.value.results){
                const events = Object.entries(person.value.results[comp])
                console.log(events)
    }
            
            console.log(resultsRemap.value)
        }

        return{
            // vars
            person, isPersonData, wcaId, resultsRemap,
            // functions
            displayData, remapResultObj
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