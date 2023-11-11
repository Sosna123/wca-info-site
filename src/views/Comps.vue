<template>
    <div class="container-xl p-lg-3">
        <select name="countrySelect" class="form-select d-inline" v-model="countryTag">
            <option disabled value="">Please select a country</option>
            <option v-for="country in countries" :value="country.iso2Code">{{ country.name }}</option>
        </select>
        <button @click="displayData" class="btn btn-outline-success d-inline w-100">Search for competitions</button>
        <div v-if="fData.length === 0">
                <p class="lead alert alert-warning mt-5" role="alert">There is no competitions for now...</p>
            </div>
        <ul v-else class="list-group list-group-flush mt-5">
            <li v-for="comp in fData" class="list-group-item">
                <a :href="`https://www.worldcubeassociation.org/competitions/${comp.id}`" target="_blank">
                    <p class="display-6 text-dark d-inline-block me-2 text-decoration-underline ">{{ comp.name }}</p>
                </a>
                <p class="text-dark d-inline-block lead fs-4">will be in {{ comp.city }} at {{ comp.venue.address }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';
import { countries } from '../js/objects.js'

export default{
    name: "comps",
    setup(){
        // packages
        const moment = require('moment')

        // vars
        const currentDate = moment();
        let countryTag = ref('');
        let data = '';
        let fData = ref([]);
        

        const fetchData = async () => {
            if(countryTag.value === ''){
                return
            }

            const promise = await fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/${countryTag.value.toUpperCase()}.json`)
            const fetchedData = promise.json();
            return fetchedData;
        }

        const displayData = () => {
            if(countryTag.value === ''){
                return
            }
            
            fetchData().then((fetchedData) => {
                data = fetchedData;
                
                fData.value = []
                for(const comp of data.items){
                    if(moment(currentDate).isSameOrBefore(comp.date.till)){
                        fData.value.push(comp)
                    }
                }
            })
        }

        return{
            // vars
            countryTag, fData,
            // functions
            displayData,
            // packages
            moment, countries
        }
    }
}
</script>

<style>
/* .compTxt{
    color: white;
    display: inline-block;
}

.compName{
    font-weight: bold;
    font-size: 24px;
    margin-right: 5px;
    text-decoration: underline;
}

.warningMessage{
    color: orange;
    font-size: 24px;
}

li{
    color: white;
}

button{
    background: #08f;
    border: none;
    padding: 10px 15px;
    color: black;
    border-radius: 15px;
}

select{
    background: #fff;
    border: none;
    padding: 10px 20px;
    color: black;
    border-radius: 15px; 
}

.compsContainer{
    margin: 0 0 0 20px;
} */
</style>