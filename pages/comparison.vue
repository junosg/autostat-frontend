<template>
    <section class="min-h-screen">
        <ComparisonForm></ComparisonForm>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'Comparison Test',
        description: 'Automatically chooses the appropriate statistical comparison test based on the provided data and the assumptions inherent to that particular test.'
    })
</script>