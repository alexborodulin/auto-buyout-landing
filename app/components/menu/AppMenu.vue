<script setup lang="ts">
const links = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Как работаем', href: '#how-it-works' },
  { label: 'Документы', href: '#documents' },
  { label: 'Контакты', href: '#contact' },
]

const { isMobileMenuOpen } = useMobileMenu()

function closeMenu() {
  isMobileMenuOpen.value = false
}

watch(isMobileMenuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  isMobileMenuOpen.value = false
})
</script>

<template>
  <Teleport to="body">
    <button
      type="button"
      class="menu-burger-btn menu-burger-fab"
      :aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      :aria-expanded="isMobileMenuOpen"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
    >
      <svg
        v-if="!isMobileMenuOpen"
        class="size-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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

    <Transition name="menu-backdrop">
      <div v-if="isMobileMenuOpen" class="menu-backdrop" aria-hidden="true" @click="closeMenu" />
    </Transition>
  </Teleport>

  <header>
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
      <a href="#hero" class="logo-text"> Авто<span class="logo-accent">Выкуп</span> </a>

      <nav class="hidden items-center gap-6 lg:flex xl:gap-8">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">
          {{ link.label }}
        </a>
      </nav>

      <a href="#contact" class="btn-menu-cta hidden lg:inline-flex"> 💰 Оценить авто </a>

      <div class="size-11 shrink-0 lg:hidden" aria-hidden="true" />
    </div>

    <nav v-show="isMobileMenuOpen" class="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="nav-link block py-2"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
      <a href="#contact" class="btn-menu-cta mt-3 block text-center" @click="closeMenu">
        💰 Оценить авто
      </a>
    </nav>
  </header>
</template>

<style scoped>
.menu-backdrop {
  @apply fixed inset-0 z-[49] bg-slate-900/60 backdrop-blur-sm lg:hidden;
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
