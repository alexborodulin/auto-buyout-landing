<script setup lang="ts">
const isVisible = ref(false)

function onScroll() {
  isVisible.value = window.scrollY > 400
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="scroll-top">
      <a
        v-if="isVisible"
        href="#hero"
        class="scroll-top-fab"
        aria-label="Наверх"
      >
        <svg
          class="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </a>
    </Transition>
  </Teleport>
</template>

<style scoped>
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
