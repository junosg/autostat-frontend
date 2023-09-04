<template>
    <section class="flex flex-col items-center justify-end py-40">
        <section class="h-24 p-10 m-10 flex justify-start items-center">
            <div class="text-8xl text-red-400 font-mono">autostat</div>
        </section>
        <div class="text-2xl text-gray-500 font-mono">
            A no-cost statistical tool that autonomously determines the fitting test according to the supplied data. Its objective is to assist researchers in swiftly obtaining results for uncomplicated statistical analyses, and it is accessible even to those without prior knowledge of statistics.
        </div>
        <div class="p-8">
            <ElButton size="large"><span class="text-2xl text-red-400 font-mono" @click="router.push({path: '/comparison'})">Get Started</span></ElButton>
        </div>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'About',
        description: 'A no-cost statistical tool that autonomously determines the fitting test according to the supplied data. Its objective is to assist researchers in swiftly obtaining results for uncomplicated statistical analyses, and it is accessible even to those without prior knowledge of statistics.'
    });

    const router = useRouter()
</script>