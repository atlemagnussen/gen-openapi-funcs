<script setup lang="ts">
    import { ref } from "vue"
    import type { WeatherForecast } from "@api"
    import { getWeathers } from "@common/weatherService"
    import HelloWorld from "../components/HelloWorld.vue"

    const weathers = ref<WeatherForecast[]>([])

    const get = async () => {
        const ws = await getWeathers()
        weathers.value = ws
    }

</script>

<template>
    <article>
        <HelloWorld msg="gen" />

        <button role="button" @click="get">GET</button>
        <h2>Weathers</h2>

        <p v-for="(w) in weathers" :key="w.date">
            <span>{{w.date}}</span>
            :
            <span>{{w.summary}}</span>
            -
            <span>{{w.temperatureC}}C</span>
            -
            <span>{{w.temperatureF}}F</span>
        </p>

    </article>
</template>
