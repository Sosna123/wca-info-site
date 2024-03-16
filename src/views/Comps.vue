<template>
    <div class="container-xl p-lg-3">
        <!--* form -->
        <div class="row g-3 align-items-center">
            <div class="col-lg-6">
                <select name="countrySelect" class="form-select d-inline" v-model="countryTag">
                    <option disabled value="">Please select a country</option>
                    <option v-for="country in countries" :value="country.iso2Code">{{ country.name }}</option>
                </select>
            </div>
            <div class="col-lg-6">
                <button @click="displayData" class="btn btn-outline-success">Search for competitions</button>
            </div>
        </div>

        <!--* alert -->
        <div v-if="fData.length === 0">
            <p class="lead alert alert-info mt-5" role="alert">There is no competitions for now...</p>
        </div>

        <!--* comps -->
        <ul v-else class="list-group list-group-flush mt-5">
            <li v-for="comp in fData" class="list-group-item">
                <a :href="`https://www.worldcubeassociation.org/competitions/${comp.id}`" target="_blank">
                    <p class="display-6 text-dark d-inline-block me-2 text-decoration-underline">{{ comp.name }}</p>
                </a>
                <p class="text-dark d-inline-block lead fs-4">
                    will be in {{ comp.city }} at {{ comp.venue.address }}. It will happen between
                    {{ moment(comp.date.from).format("Do MMMM YYYY") }} and
                    {{ moment(comp.date.till).format("Do MMMM YYYY") /* 14th September 2024 */ }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import countries from "../js/countries";

export default defineComponent({
    name: "comps",
    setup() {
        //* packages
        const moment = require("moment");

        //* types
        type items = {
            id: string;
            name: string;
            city: string;
            country: string;
            date: { from: string; till: string; numberOfDays: string };
            isCanceled: boolean;
            events: string[];
            wcaDelegates: { name: string; email: string }[];
            organizers: { name: string; email: string }[];
            venue: {
                name: string;
                address: string;
                details: string;
                coordinates: { latitude: number; longitude: number };
            };
            information: string;
            externalWebsite: string;
        };
        type fetchedData = { pagination: object; total: number; items: items[] };

        //* vars
        const currentDate = moment();
        let countryTag = ref("");
        let data: items[] = [];
        let fData = ref<items[]>([]);

        async function fetchData() {
            if (countryTag.value === "") {
                return;
            }

            const promise = await fetch(
                `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${countryTag.value.toUpperCase()}.json`
            );
            const fetchedData = promise.json();
            return fetchedData;
        }

        const displayData = () => {
            if (countryTag.value === "") {
                return;
            }

            fetchData().then((fetchedData: fetchedData) => {
                data = fetchedData.items;

                fData.value = [];
                for (const comp of data) {
                    if (moment(currentDate).isSameOrBefore(comp.date.till)) {
                        fData.value.push(comp);
                    }
                }
            });
        };

        return {
            // vars
            countryTag,
            fData,
            // functions
            displayData,
            // packages
            moment,
            countries,
        };
    },
});
</script>

<style></style>
