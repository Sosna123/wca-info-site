<template>
    <div class="container-xl p-lg-3">
        <!--* form -->
        <div class="input-group">
            <input type="text" v-model="wcaId" placeholder="Type in your wca id" class="form-control w-50" />
            <button @click="displayData()" class="form-control btn btn-outline-success">Submit</button>
        </div>

        <!--* alert -->
        <div v-if="!isPersonData.bool">
            <p class="lead alert alert-danger mt-5" role="alert">Wrong WCA ID</p>
        </div>

        <!--* data -->
        <div v-if="isPersonData.bool" class="mt-5">
            <!--* header -->
            <p class="display-5">
                {{ person.name }} -
                <a
                    :href="`https://www.worldcubeassociation.org/persons/${person.id}`"
                    target="_blank"
                    class="text-dark"
                    >{{ person.id }}</a
                >
            </p>

            <!--* comps someone took part in -->
            <div>
                <p class="fs-4 lead d-inline-block">
                    You took part in
                    {{ person.numberOfCompetitions }} competitions.
                </p>
            </div>

            <!--* rank -->
            <div>
                <button @click="rankingsShow = !rankingsShow" class="btn btn-outline-dark m-2">Hide</button>
                <p class="fs-4 lead d-inline-block">Your rankings:</p>
                <p v-if="!rankingsShow" class="d-inline-block ms-1">...</p>
                <ul class="fs-5 lead" v-else>
                    <li v-for="event in ranksObj">
                        <p class="fs-5 lead m-0">{{ eventsObj[event.single.eventId] }}:</p>
                        <ul>
                            <!-- !single -->
                            <li v-if="eventsObj[event.single.eventId] === 'Fewest moves challenge'">
                                <div>
                                    <p class="fs-5 lead m-0">
                                        Your best single is:
                                        {{ formatTime(event.single.best, "fmc") }}. Your best solve is in
                                        {{ event.single.rank.world }} place in world rankings, in
                                        {{ event.single.rank.continent }} place in continental ranking, in
                                        {{ event.single.rank.country }} place in country ranking.
                                    </p>
                                </div>
                            </li>
                            <li v-else-if="eventsObj[event.single.eventId] === 'Multi-blind (new)'">
                                <div>
                                    <p class="fs-5 lead m-0">
                                        Your best single is:
                                        {{ formatTime(event.single.best, "new-mbf") }}. Your best solve is in
                                        {{ event.single.rank.world }} place in world rankings, in
                                        {{ event.single.rank.continent }} place in continental ranking, in
                                        {{ event.single.rank.country }} place in country ranking.
                                    </p>
                                </div>
                            </li>
                            <li v-else-if="eventsObj[event.single.eventId] === 'Multi-blind (old)'">
                                <div>
                                    <p class="fs-5 lead m-0">
                                        Your best single is:
                                        {{ formatTime(event.single.best, "old-mbf") }}. Your best solve is in
                                        {{ event.single.rank.world }} place in world rankings, in
                                        {{ event.single.rank.continent }} place in continental ranking, in
                                        {{ event.single.rank.country }} place in country ranking.
                                    </p>
                                </div>
                            </li>
                            <li v-else>
                                <div>
                                    <p class="fs-5 lead m-0">
                                        Your best single is:
                                        {{ formatTime(event.single.best) }}. Your best solve is in
                                        {{ event.single.rank.world }} place in world rankings, in
                                        {{ event.single.rank.continent }} place in continental ranking, in
                                        {{ event.single.rank.country }} place in country ranking.
                                    </p>
                                </div>
                            </li>
                            <!-- !average -->
                            <li v-if="event.avg">
                                <div>
                                    <p class="fs-5 lead m-0">
                                        Your best average is:
                                        {{ formatTime(event.avg.best) }}. Your best solve is in
                                        {{ event.avg.rank.world }} place in world rankings, in
                                        {{ event.avg.rank.continent }} place in continental ranking, in
                                        {{ event.avg.rank.country }} place in country ranking.
                                    </p>
                                </div>
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
                <ul class="fs-5 lead m-0" v-else>
                    <li v-for="(comp, compKey) in person.results">
                        <p class="fs-5 lead m-0">Your results in {{ compKey }}:</p>
                        <ul>
                            <li v-for="(event, eventKey) in comp">
                                <p class="fs-5 lead m-0">Your results in {{ eventsObj[eventKey] }}:</p>
                                <ul>
                                    <li v-for="round in event">
                                        <!--* fmc -->
                                        <div v-if="eventsObj[eventKey] === 'Fewest moves challenge'">
                                            <p class="fs-5 lead m-0">
                                                In the {{ round.round }}, your average was
                                                {{ formatTime(round.average) }}
                                                Your solves were:
                                                {{ displayTimeArray(round.solves, "fmc") }}. You were in
                                                {{ round.position }} position on the leaderboards. Your best solve was
                                                {{ round.best }}.
                                            </p>
                                        </div>
                                        <!--* mbf new -->
                                        <div v-else-if="eventsObj[eventKey] === 'Multi-blind (new)'">
                                            <p class="fs-5 lead m-0">
                                                In the {{ round.round }} your solves were:
                                                {{ displayTimeArray(round.solves, "new-mbf") }}. You were in
                                                {{ round.position }} position on the leaderboards. Your best solve was
                                                {{ formatTime(round.best, "new-mbf") }}.
                                            </p>
                                        </div>
                                        <!--* mbf old -->
                                        <div v-else-if="eventsObj[eventKey] === 'Multi-blind (old)'">
                                            <p class="fs-5 lead m-0">
                                                In the {{ round.round }} your solves were:
                                                {{ displayTimeArray(round.solves, "old-mbf") }}. You were in
                                                {{ round.position }} position on the leaderboards. Your best solve was
                                                {{ formatTime(round.best, "old-mbf") }}
                                            </p>
                                        </div>
                                        <!--* other ones -->
                                        <div v-else>
                                            <p class="fs-5 lead m-0">
                                                In the {{ round.round }}, your average was
                                                {{ formatTime(round.average) }}
                                                Your solves were:
                                                {{ displayTimeArray(round.solves) }}. You were in
                                                {{ round.position }} position on the leaderboards. Your best solve was
                                                {{ formatTime(round.best) }}.
                                            </p>
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
import { defineComponent, ref } from "vue";
import eventsObj from "../js/events";
import formatTime from "../js/timeFormat";
import { EventType } from "../js/types";

export default defineComponent({
    name: "stats",
    setup() {
        //* display vars
        let compsShow = ref(true);
        let rankingsShow = ref(true);
        let resultsShow = ref(true);

        //* vars
        const wcaId = ref("2007HESS01");
        let person = ref<any>({});
        let isPersonData = ref({ bool: false });
        let ranksObj = ref<any>({});

        //* fetch data
        const fetchData = async () => {
            isPersonData.value.bool = false;
            const promise = await fetch(
                `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${wcaId.value.toUpperCase()}.json`
            );
            const fetchedData = promise.json().catch((e) => {
                return "error: " + e;
            });
            wcaId.value = "";
            return fetchedData;
        };

        //* display data
        const displayData = () => {
            fetchData().then((fetchedData) => {
                if (fetchedData === "error") {
                    isPersonData.value.bool = false;
                } else {
                    person.value = fetchedData;
                    isPersonData.value.bool = true;
                    changeRankingsObj(person.value.rank);
                }
            });
        };

        //* formating arrays
        function formatMultiple(times: string[], type: EventType = "normal") {
            let results: string[] = [];

            //* times
            for (let time of times) {
                results.push(formatTime(time, type));
            }

            results = results.filter((value) => value != "false");
            console.log(results);

            return results;
        }

        //* displaying arrays
        function displayTimeArray(arr: string[], type: EventType = "normal") {
            let finalStr = "";

            arr = formatMultiple(arr, type);

            finalStr = arr.join("; ");
            return finalStr;
        }

        function changeRankingsObj(rankObj: any): void {
            ranksObj.value = {};

            for (let x of rankObj.singles) {
                ranksObj.value[x.eventId] = {};
                ranksObj.value[x.eventId].single = x;
            }

            for (let x of rankObj.averages) {
                ranksObj.value[x.eventId].avg = x;
            }
        }

        return {
            //* display vars
            compsShow,
            rankingsShow,
            resultsShow,
            ranksObj,
            //* vars
            person,
            isPersonData,
            wcaId,
            eventsObj,
            //* functions
            displayData,
            formatTime,
            formatMultiple,
            displayTimeArray,
            changeRankingsObj,
            //* packages
        };
    },
});
</script>

<style></style>
