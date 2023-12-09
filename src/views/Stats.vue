<template>
<div class="container-xl p-lg-3">
    <!--* form -->
    <div class="input-group">
        <input type="text" v-model="wcaId" placeholder="Type in your wca id" class="form-control w-50">
        <button @click="displayData()" class="form-control btn btn-outline-success">Submit</button>
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
        <div>
            <button @click="compsShow = !compsShow" class="btn btn-outline-dark m-2">Hide</button>
            <p class="fs-4 lead d-inline-block">You were taking part in {{ person.numberOfCompetitions }} competitions like:</p>
            <p v-if="!compsShow" class="d-inline-block ms-1">...</p>
            <ul class="fs-5 lead" v-else>
                <li v-for="comp in person.competitionIds">
                    <p>{{ comp }}</p>
                </li>
            </ul>
        </div>

        <!--* rank -->
        <div>
            <button @click="rankingsShow = !rankingsShow" class="btn btn-outline-dark m-2">Hide</button>
            <p class="fs-4 lead d-inline-block"> Your rankings:</p>
            <p v-if="!rankingsShow" class="d-inline-block ms-1">...</p>
            <ul class="fs-5 lead" v-else>
                <li v-for="(rank, rankKey) in person.rank">
                    <p v-if="rankKey === 'singles'">Singles:</p>
                    <p v-else>Averages:</p>
                    <ul class="fs-5 lead">
                        <li v-for="event in rank">{{ eventsObj[event.eventId] }}:  
                            <!--! singles -->
                            <ul v-if="rankKey === 'singles'">
                                <!--* fmc -->
                                <div v-if="eventsObj[event.eventId] === 'Fewest moves challenge'">
                                    <li>Your best single is: {{ event.best }}.</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                                <!--* new-mbf -->
                                <div v-else-if="eventsObj[event.eventId] === 'Multi-blind (new)'">
                                    <li>Your best single is: {{ formatTime(event.best, "new-mbf") }}</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                                <!--* other -->
                                <div v-else>
                                    <li>Your best single is: {{ formatTime(event.best) }}</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                            </ul>
                            <!--! averages -->
                            <ul v-else>
                                <!--* fmc -->
                                <div v-if="eventsObj[event.eventId] === 'Fewest moves challenge'">
                                    <li>Your best average is: {{ formatTime(event.best) }}</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                                <!--* new-mbf -->
                                <div v-else-if="eventsObj[event.eventId] === 'Multi-blind (new)'"></div>
                                <!--* other -->
                                <div v-else>
                                    <li>Your best average is: {{ formatTime(event.best) }}</li>
                                    <li>Your best solve is in {{ event.rank.world }} place in world rankings, in {{ event.rank.continent }} place in continental ranking, in {{ event.rank.country }} place in country ranking</li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!--* results -->
        <div>
            <button @click="resultsShow = !resultsShow" class="btn btn-outline-dark m-2">Hide</button>
            <p class="fs-4 lead d-inline-block">Your results:</p>
            <p v-if="!resultsShow" class="d-inline-block ms-1">...</p>
            <ul class="fs-5 lead" v-else>
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
                                    <!--* mbf new -->
                                    <div v-else-if="eventsObj[eventKey] === 'Multi-blind (new)'">
                                        <p class="fs-5 lead">In the {{ round.round }} your solves were: {{ displayTimeArray(round.solves, 'new-mbf') }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ formatTime(round.best, 'new-mbf') }}.</p>
                                    </div>
                                    <!--* mbf old -->
                                    <div v-else-if="eventsObj[eventKey] === 'Multi-blind (old)'">
                                        <p class="fs-5 lead">{{ round }}</p>
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
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import eventsObj from '../js/events'
import formatTime from '../js/timeFormat'
import EventType from '../js/types'

export default defineComponent({
    name: 'stats',
    setup(){
        //* display vars
        let compsShow = ref(true);
        let rankingsShow = ref(true);
        let resultsShow = ref(true);

        //* vars
        const wcaId = ref('2022AREZ01')
        let person = ref({});
        let isPersonData = ref({bool: false});

        //* fetch data
        const fetchData = async () => {
            isPersonData.value.bool = false;
            const promise = await fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${wcaId.value.toUpperCase()}.json`)
            const fetchedData = promise.json().catch(e => {return 'error: ' + e});
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

        //* formating arrays
        function formatMultiple(times: string[], type: EventType = 'normal'){
            let results: string[] = [];

            //* times
            for(let time of times){
                results.push(formatTime(time, type))
            }
            
            return results
        }

        //* displaying arrays
        function displayTimeArray(arr: string[], type: EventType ='normal'){
            let finalStr = ''

            arr = formatMultiple(arr, type)

            finalStr = arr.join('; ')
            return finalStr
        }

        return{
            //* display vars
            compsShow, rankingsShow, resultsShow,
            //* vars
            person, isPersonData, wcaId, eventsObj,
            //* functions
            displayData, formatTime, formatMultiple, displayTimeArray
            //* packages
        }
    }
})
</script>

<style>

</style>../js/countries