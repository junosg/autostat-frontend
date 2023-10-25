<template>
    <section>
        <AppHeader v-if="headerInclusions.includes(route.path)"></AppHeader>
    </section>
    <section class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
        </div>
        <NuxtPage class="col-span-6"/>
        <div class="col-span-3">
            <Adsbygoogle v-if="headerInclusions.includes(route.path)"></Adsbygoogle>
        </div>
    </section>
</template>
<script setup>
const config = useAppConfig();
const route = useRoute();

const headerInclusions = [
    '/tools/comparison'
];

onMounted(async () => {
    await useFetch(`${config.apiUrl}/init`, {
        method: 'post'
    });
});
</script>