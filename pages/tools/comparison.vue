<template>
    <section class="min-h-screen">
        <div class="text-3xl text-red-400 font-mono pt-8">Guide</div>
        <div class="text-sm text-gray-500 font-mono px-8 py-4">
            <div class="py-1">1. Upload an Excel file containing data arranged in a vertical format.</div>
            <div class="py-1">2. Select your predictor and outcome variable.</div>
            <div class="py-1">3. Click "Analyze" button and wait for the result.</div>
            <div class="py-1">4. (Optional) Copy the output to ChatGPT for a more convenient interpretation of the results.</div>
        </div>
        <ComparisonForm></ComparisonForm>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'Comparison Test',
        description: 'Automatically chooses the appropriate statistical comparison test based on the provided data and the assumptions inherent to that particular test.'
    })
</script>