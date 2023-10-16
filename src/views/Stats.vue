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
            <li v-for="(comp, compKey) in person.results">
                <p>Your results in {{ compKey }}:</p>
                <ul>
                    <li v-for="(event, eventKey) in comp">
                        <p>Your results in {{ eventsObj[eventKey] }}:</p>
                        <ul>
                            <li v-for="round in event">
                                <p>
                                    In the {{ round.round }}. Your solves were: {{ round.solves }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ round.best }}. Your average was {{ round.average }}
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';

export default{
    name: 'stats',
    setup(){
        const wcaId = ref('2022arez01')
        const eventsObj = {
            "222": "2x2",
            "333": "3x3",
            "333bf": "3x3 blindfolded",
            "333fm": "Fewest moves challenge",
            "333mbf": "Multi-blind",
            "333mbo": "Multi-blind",
            "333oh": "3x3 one handed",
            "333ft": "3x3 with feet",
            "444": "4x4",
            "444bf": "4x4 blindfolded",
            "555": "5x5",
            "555bf": "5x5 blindfolded",
            "666": "6x6",
            "777": "7x7",
            "clock": "Clock",
            "magic": "Rubik's magic",
            "mmagic": "Master magic",
            "minx": "Megaminx",
            "pyram": "Pyraminx",
            "skewb": "Skweb",
            "sq1": "Square-1"
        }
        let person = ref({});
        let isPersonData = ref({bool: false});

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
                console.log(person.value)
            })
        }

        return{
            // vars
            person, isPersonData, wcaId, eventsObj,
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