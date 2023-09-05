<template>
    <section>
        <AppHeader v-if="!headerExclusions.includes(route.path)"></AppHeader>
    </section>
    <section class="grid grid-cols-12 gap-4 p-4">
        <NuxtPage class="col-span-12"/>
        <div class="col-span-12">
            <Adsbygoogle></Adsbygoogle>
        </div>
    </section>
</template>
<script setup>
const route = useRoute();

const headerExclusions = [
    '/about'
]
</script>