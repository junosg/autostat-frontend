<template>
    <section class="flex flex-col items-center justify-end py-40 w-full">
        <div class="text-gray-500 font-mono text-justify" :class="textSizeClass">
            A no-cost statistical tool that autonomously determines the fitting test according to the supplied data. Its objective is to assist researchers in swiftly obtaining results for uncomplicated statistical analyses, and it is accessible even to those without prior knowledge of statistics.
        </div>
        <div class="p-8">
            <ElButton size="large"><span class="text-2xl text-red-400 font-mono" @click="router.push({path: '/tools/comparison'})">Get Started</span></ElButton>
        </div>
    </section>
</template>
<script setup lang="ts">
    const router = useRouter();
    const device = useDevice();
    const textSizeClass = ref("text-lg");

    onMounted(() => {
        if (device.isMobileOrTablet) {
            textSizeClass.value = "text-md";
        }
    });
</script>