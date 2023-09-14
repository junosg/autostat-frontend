<template>
    <section>
        <AppHeader v-if="!headerExclusions.includes(route.path)"></AppHeader>
    </section>
    <section class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
        </div>
        <NuxtPage class="col-span-6"/>
        <div class="col-span-3">
            <Adsbygoogle v-if="!headerExclusions.includes(route.path)"></Adsbygoogle>
        </div>
    </section>
</template>
<script setup>
const route = useRoute();

const headerExclusions = [
    '/about'
]
</script>