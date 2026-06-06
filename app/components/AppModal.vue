<script setup lang="ts">
const open = defineModel<boolean>({ default: false })

defineProps<{
  title: string
}>()

const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    close()
  }
}

watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="modal-overlay"
        @click.self="close"
      >
        <div
          class="modal-card"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >
          <button
            type="button"
            class="modal-close"
            aria-label="Закрыть"
            @click="close"
          >
            <span aria-hidden="true">×</span>
          </button>

          <slot name="icon" />

          <h3 :id="titleId" class="modal-title">
            {{ title }}
          </h3>

          <div class="modal-body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm;
}

.modal-card {
  @apply relative w-full max-w-md rounded-card border border-slate-200 bg-surface-card p-6 text-center shadow-xl sm:p-8;
}

.modal-close {
  @apply absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-2xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-600;
}

.modal-title {
  @apply text-2xl font-bold text-slate-900 sm:text-3xl;
}

.modal-body {
  @apply mt-3 text-base text-slate-600 sm:text-lg;
}

.modal-footer {
  @apply mt-6;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
