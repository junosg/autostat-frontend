<template>
    <section>
        <AppHeader v-if="!headerExclusions.includes(route.path)"></AppHeader>
    </section>
    <section class="grid grid-cols-12 gap-4 p-4">
        <NuxtPage class="col-span-12"/>
        <div class="col-span-12">
            <Adsbygoogle v-if="headerInclusions.includes(route.path)"></Adsbygoogle>
        </div>
    </section>
</template>
<script setup>
const route = useRoute();

const headerInclusions = [
    '/tools/comparison'
]
</script>