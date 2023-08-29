<template>
    <section class="min-h-screen">
        <DataForm></DataForm>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'Comparison Test',
        description: 'Automatically computes the suited statistical comparison test based on the given data along with its assumptions.'
    })
</script>