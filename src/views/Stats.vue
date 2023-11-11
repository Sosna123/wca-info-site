<template>
    <div class="container-xl p-lg-3">
        <!--* form -->
        <div class="input-group">
            <input type="text" v-model="wcaId" placeholder="Type in your wca id" class="form-control w-50">
            <button @click="displayData()" class="form-control btn btn-outline-success">Click me</button>
        </div>
    
        <!--* alert -->
        <div v-if="!isPersonData.bool">
            <p class="lead alert alert-warning mt-5" role="alert">Wrong WCA id</p>
        </div>

        <!--* data -->
        <div v-if="isPersonData.bool" class="mt-5">
            <!--* header -->
            <p class="display-5">{{ person.name }} - <a :href="`https://www.worldcubeassociation.org/persons/${person.id}`" target="_blank" class="text-dark">{{ person.id }}</a></p>
            
            <!--* comps someone took part in -->
            <p class="fs-4 lead">Byłeś na {{ person.numberOfCompetitions }} zawodach takich jak:</p>
            <ul class="fs-5 lead">
                <li v-for="comp in person.competitionIds">
                    <p>{{ comp }}</p>
                </li>
            </ul>

            <!--* rank -->
            <p class="fs-4 lead">Twoje rankingi:</p>
            <ul class="fs-5 lead">
                <li v-for="(rank, rankKey) in person.rank">
                    <p v-if="rankKey === 'singles'">Pojedyńcze ułożenia:</p>
                    <p v-else>Średnie:</p>
                    <ul class="fs-5 lead">
                        <li v-for="event in rank">{{ eventsObj[event.eventId] }}:  
                            <ul v-if="rankKey === 'singles'">
                                <li>Twój najlepszy czas to: {{ formatTime(event.best) }}:</li>
                                <li>Jest on na {{ event.rank.world }} miejscu w rankingu światowym, {{ event.rank.continent }} miejscu w rankingu kontynentalnym i {{ event.rank.country }} miejscu w rankingu krajowym</li>
                            </ul>
                            <ul v-else>
                                <li>Twoja najlepsza średnia to: {{ formatTime(event.best) }}:</li>
                                <li>Jest on na {{ event.rank.world }} miejscu w rankingu światowym, {{ event.rank.continent }} miejscu w rankingu kontynentalnym i {{ event.rank.country }} miejscu w rankingu krajowym</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

            <!--* results -->
            <p class="fs-4 lead">Twoje wyniki:</p>
            <ul class="fs-5 lead">
                <li v-for="(comp, compKey) in person.results">
                    <p class="fs-5 lead">Your results in {{ compKey }}:</p>
                    <ul>
                        <li v-for="(event, eventKey) in comp">
                            <p class="fs-5 lead">Your results in {{ eventsObj[eventKey] }}:</p>
                            <ul>
                                <li v-for="round in event">
                                    <!-- <div v-if="eventsObj[eventKey] === 'Fewest moves challenge' || eventsObj[eventKey] === 'Multi-blind'">
                                        <p class="fs-5 lead">In the {{ round.round }}, your average was {{ round.average }} Your solves were: {{ round.solves }}. You were in {{ round.position }} position on the leaderboards. Your best solve was {{ formatTime(round.best) }}.</p>
                                    </div> -->
                                    <div>
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

        // time formatting
        function formatTime(time, type='normal'){
            time = time.toString()
            if(type === 'normal'){
                // DNF, DNS check
                if(time === "0"){
                    return 'DNS'
                }
                if(time === "-1"){
                    return 'DNF'
                }
    
                // Actual time formatting
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

            if(type === 'fmc'){
                // DNF, DNS check
                if(time === "0"){
                    return 'DNS'
                }
                if(time === "-1"){
                    return 'DNF'
                }
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

        //* displaying arrays
        function displayTimeArray(arr){
            let finalStr = ''
            arr = formatMultiple(arr)

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