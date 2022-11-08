<script setup lang="ts">
    import { ref } from "vue"
    import type { WeatherForecast } from "@api"
    import { getWeathers } from "@common/weatherService"
    import HelloWorld from "../components/HelloWorld.vue"

    const weathers = ref<WeatherForecast[]>([])


    const get = async () => {

    }

</script>

<template>
    <article>
        <HelloWorld msg="gen" />

        <h2>Weathers</h2>

        <p v-for="(w, index) in weathers">

        </p>

    </article>
</template>
