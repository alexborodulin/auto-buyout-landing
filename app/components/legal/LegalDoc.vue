<script setup lang="ts">
defineProps<{
  title: string
  updated: string
}>()
</script>

<template>
  <article class="container-content max-w-3xl pb-8 pt-[calc(6rem+env(safe-area-inset-top,0px))] md:pb-12 md:pt-[calc(7rem+env(safe-area-inset-top,0px))]">
    <h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">{{ title }}</h1>
    <p class="mt-2 text-base text-slate-500">Дата публикации: {{ updated }}</p>
    <div class="legal-doc mt-8 space-y-4 text-base leading-relaxed text-slate-700">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.legal-doc :slotted(h2) {
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(15 23 42);
}
.legal-doc :slotted(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}
</style>

