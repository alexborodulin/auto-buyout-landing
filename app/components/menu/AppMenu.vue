<script setup lang="ts">
const links = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Как работаем', href: '#how-it-works' },
  { label: 'Документы', href: '#documents' },
]

const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="menu-backdrop">
      <div v-if="isOpen" class="menu-backdrop" aria-hidden="true" @click="closeMenu" />
    </Transition>
  </Teleport>

  <header>
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
      <a href="#hero" class="logo-text"> Авто<span class="logo-accent">Выкуп</span> </a>

      <nav class="hidden items-center gap-8 md:flex">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">
          {{ link.label }}
        </a>
      </nav>

      <a href="#contact" class="btn-primary-sm hidden md:inline-flex"> Оценить авто </a>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-button p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        :aria-label="isOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg v-else class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav v-show="isOpen" class="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="nav-link block py-2"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
      <a href="#contact" class="btn-primary-sm mt-3 block text-center" @click="closeMenu">
        Оценить авто
      </a>
    </nav>
  </header>
</template>

<style scoped>
.menu-backdrop {
  @apply fixed inset-0 z-[49] bg-slate-900/60 backdrop-blur-sm md:hidden;
}

.menu-backdrop-enter-active,
.menu-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.menu-backdrop-enter-from,
.menu-backdrop-leave-to {
  opacity: 0;
}
</style>
