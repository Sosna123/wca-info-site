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
                                    In the {{ round.round }}, your average was {{ formatTime(round.average) }} Your solves were: {{ displayTimeArray(round.solves) }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ formatTime(round.best) }}.
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
import { eventsObj } from '../js/objects.js'

export default{
    name: 'stats',
    setup(){
        const wcaId = ref('2022arez01')
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

        function formatTime(time){
            // time = time.match(/.{1,2}/g);
            time = time.toString()

            if(time.length === 6){
                time = `${time[0]}${time[1]}:${time[2]}${time[3]}.${time[4]}${time[5]}` 
            }
            if(time.length === 5){
                time = `${time[0]}:${time[1]}${time[2]}.${time[3]}${time[4]}` 
            }
            if(time.length === 4){
                time = `${time[0]}${time[1]}.${time[2]}${time[3]}` 
            }
            if(time.length === 3){
                time = `${time[0]}.${time[1]}${time[2]}` 
            }
            if(time.length === 2){
                time = `0.${time[0]}${time[1]}` 
            }
            
            return time;
        }

        function formatMultiple(times){
            let results = [];
            for(let time of times){
                results.push(formatTime(time))
            }
            
            return results
        }

        function displayTimeArray(arr){
            let finalStr = ''
            arr = formatMultiple(arr)
            
            for(let i = 0; i < arr.length; i++){
                finalStr += `${arr[i]}; `
            }

            return finalStr.slice(0, -2)
        }

        return{
            // vars
            person, isPersonData, wcaId, eventsObj,
            // functions
            displayData, formatTime, formatMultiple, displayTimeArray
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