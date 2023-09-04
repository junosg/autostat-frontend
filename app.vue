<template>
  <div>
    <NuxtLayout />
  </div>
</template>
<script setup lang="ts">
  useHead({
    title: 'autostat',
    meta: [
      { name: 'description', content: 'A no-cost statistical tool that autonomously determines the fitting test according to the supplied data. Its objective is to assist researchers in swiftly obtaining results for uncomplicated statistical analyses, and it is accessible even to those without prior knowledge of statistics.' }
    ]
  })
</script>
