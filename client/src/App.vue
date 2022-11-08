<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
    <main>
        <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
    <section>
        <RouterView />
    </section>
    </main>
    
</template>

<style scoped>
    main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    header {
        line-height: 1.5;
        max-height: 100vh;
    }
    section {
        padding: 2rem 10rem;
        align-content: center;
        align-items: center;
        width: 100%;
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
    }
    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
        border: 0;
    }

</style>
