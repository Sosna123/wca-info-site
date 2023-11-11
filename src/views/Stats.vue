<template>
    <div class="container-xl p-lg-3">
        <!--* form -->
        <div class="input-group">
            <input type="text" v-model="wcaId" placeholder="Type in your wca id" class="form-control w-50">
            <button @click="displayData()" class="form-control btn btn-outline-success">Click me</button>
        </div>
    
        <!--* alert -->
        <div v-if="!isPersonData.bool">
            <p class="lead alert alert-danger mt-5" role="alert">Wrong WCA ID</p>
        </div>

        <!--* data -->
        <div v-if="isPersonData.bool" class="mt-5">
            <!--* header -->
            <p class="display-5">{{ person.name }} - <a :href="`https://www.worldcubeassociation.org/persons/${person.id}`" target="_blank" class="text-dark">{{ person.id }}</a></p>
            
            <!--* comps someone took part in -->
            <p class="fs-4 lead">You were taking part in {{ person.numberOfCompetitions }} competitions like:</p>
            <ul class="fs-5 lead">
                <li v-for="comp in person.competitionIds">
                    <p>{{ comp }}</p>
                </li>
            </ul>

            <!--* rank -->
            <p class="fs-4 lead"> Your rankings:</p>
            <ul class="fs-5 lead">
                <li v-for="(rank, rankKey) in person.rank">
                    <p v-if="rankKey === 'singles'">Singles:</p>
                    <p v-else>Averages:</p>
                    <ul class="fs-5 lead">
                        <li v-for="event in rank">{{ eventsObj[event.eventId] }}:  
                            <!--! singles -->
                            <ul v-if="rankKey === 'singles'">
                                <!--* fmc display -->
                                <div v-if="eventsObj[event.eventId] === 'Fewest moves challenge'">
                                    <li>Your best single is: {{ event.best }}:</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                                <!--* other -->
                                <div v-else>
                                    <li>Your best single is: {{ formatTime(event.best) }}:</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                            </ul>
                            <!--! averages -->
                            <ul v-else>
                                <!--* fmc display -->
                                <div v-if="eventsObj[event.eventId] === 'Fewest moves challenge'">
                                    <li>Your best average is: {{ formatTime(event.best) }}:</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                                <!--* other -->
                                <div v-else>
                                    <li>Your best average is: {{ formatTime(event.best) }}:</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

            <!--* results -->
            <p class="fs-4 lead">Your results:</p>
            <ul class="fs-5 lead">
                <li v-for="(comp, compKey) in person.results">
                    <p class="fs-5 lead">Your results in {{ compKey }}:</p>
                    <ul>
                        <li v-for="(event, eventKey) in comp">
                            <p class="fs-5 lead">Your results in {{ eventsObj[eventKey] }}:</p>
                            <ul>
                                <li v-for="round in event">
                                    <!--* fmc -->
                                    <div v-if="eventsObj[eventKey] === 'Fewest moves challenge'">
                                        <p class="fs-5 lead">In the {{ round.round }}, your average was {{ formatTime(round.average) }} Your solves were: {{ displayTimeArray(round.solves, 'fmc') }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ round.best }}.</p>
                                    </div>
                                    <!--* other ones -->
                                    <div v-else>
                                        <p class="fs-5 lead">In the {{ round.round }}, your average was {{ formatTime(round.average) }} Your solves were: {{ displayTimeArray(round.solves) }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ formatTime(round.best) }}.</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
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

        //* fetch data
        const fetchData = async () => {
            isPersonData.value.bool = false;
            const promise = await fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${wcaId.value.toUpperCase()}.json`)
            const fetchedData = promise.json().catch(e => {return 'error'});
            wcaId.value = ''
            return fetchedData;
        }

        //* display data
        const displayData = () => {
            fetchData().then((fetchedData) => {
                if(fetchedData === 'error'){
                    isPersonData.value.bool = false;
                }else{
                    person.value = fetchedData;
                    isPersonData.value.bool = true;
                }
                
            })
        }

        //* time formatting
        function formatTime(time, type='normal'){
            time = time.toString()
            //* normal type
            if(type === 'normal'){
                //* DNF, DNS check
                if(time === "0"){
                    return 'DNS'
                }
                if(time === "-1"){
                    return 'DNF'
                }
    
                //* Actual time formatting
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
            }

            //* fmc
            if(type === 'fmc'){
                //* DNF, DNS check
                if(time === "0"){
                    return 'DNS'
                }
                if(time === "-1"){
                    return 'DNF'
                }
            }
            
            return time;
        }

        function formatMultiple(times, type='normal'){
            let results = [];
            //* normal times
            for(let time of times){
                results.push(formatTime(time, type))
            }
            
            return results
        }

        //* displaying arrays
        function displayTimeArray(arr, type='normal'){
            let finalStr = ''
            if(type === 'normal'){
                arr = formatMultiple(arr)
            }
            if(type ==='fmc'){
                
            }

            finalStr = arr.join('; ')
            return finalStr
        }

        return{
            //* vars
            person, isPersonData, wcaId, eventsObj,
            //* functions
            displayData, formatTime, formatMultiple, displayTimeArray
            //* packages
        }
    }
    
}
</script>

<style>

</style>