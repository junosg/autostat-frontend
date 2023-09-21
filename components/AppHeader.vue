<template>
    <section class="h-24 p-10 m-2 flex justify-start items-center">
        <div class="text-6xl text-red-400 font-mono">autostat</div>
    </section>
    <section class="h-14 px-10 grid grid-cols-12 justify-start items-center text-red-400 font-mono">
        <ElMenu mode="horizontal" class="col-span-12" :default-active="activeIndex" @select="moveToRoute">
            <ElMenuItem index="/">About</ElMenuItem>
            <ElSubMenu index="tools">
                <template #title>Tools</template>
                <ElMenuItem index="/tools/comparison">Comparison</ElMenuItem>
            </ElSubMenu>
        </ElMenu>
    </section>
</template>
<script setup lang="ts">
    const router = useRouter();

    const activeIndex = computed(() => {
        return router.currentRoute.value.fullPath;
    });

    const moveToRoute = (key: string) => {
        router.push(key);
    }
</script>