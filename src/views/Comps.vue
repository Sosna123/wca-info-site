<template>
    <input type="text" v-bind="countryTag">
    <button @click="displayData">button</button>
    <ul>
        <li v-for="comp in data.items">
            <p v-if="!comp.isCanceled">{{ comp.name }}</p>
            <!--  && comp.date.from > currentDate -->
        </li>
    </ul>
</template>

<script>
import { ref } from 'vue';

export default{
    name: "comps",
    setup(){
        const countryTag = ref('')
        // const apiUri = `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${countryTag.value.toUpperCase()}.json`
        const apiUri = `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/PL.json`
        const currentDate = new Date().getTime()
        let data = ref('')

        const fetchData = async () => {
            const promise = await fetch(apiUri)
            const fdata = promise.json();

            return fdata
        }

        const displayData = () => {
            console.log('fetching started')
            fetchData().then((fdata) => {
                data.value = fdata;
                console.log('done', data.value)
            })
        }

        return{
            // vars
            countryTag, data, currentDate,
            // functions
            displayData
        }
    }
}
</script>

<style>

</style>