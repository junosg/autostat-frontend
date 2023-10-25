<template>
    <section>
        <AppHeader v-if="headerInclusions.includes(route.path)"></AppHeader>
    </section>
    <section class="grid grid-cols-12 gap-4 p-4">
        <NuxtPage class="col-span-12"/>
        <div class="col-span-12">
            <Adsbygoogle v-if="headerInclusions.includes(route.path)"></Adsbygoogle>
        </div>
    </section>
</template>
<script setup>
const config = useAppConfig();
const route = useRoute();

const headerInclusions = [
    '/tools/comparison'
]

onMounted(async () => {
    await useFetch(`${config.apiUrl}/init`, {
        method: 'post'
    });
});
</script>