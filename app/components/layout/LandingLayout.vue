<script setup lang="ts">
const isScrolled = ref(false)
const { isMobileMenuOpen } = useMobileMenu()
const menuSolid = computed(() => isScrolled.value || isMobileMenuOpen.value)

function onScroll() {
  isScrolled.value = window.scrollY > 12
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
  <div class="relative flex min-h-screen flex-col overflow-x-hidden bg-surface-light text-slate-900">
    <div class="hero-glow" aria-hidden="true" />

    <div class="menu-fixed" :class="{ 'menu-fixed-solid': menuSolid }">
      <div class="menu-bar mx-auto max-w-content" :class="{ 'menu-bar-solid': menuSolid }">
        <AppMenu />
      </div>
    </div>

    <main class="relative flex-1 overflow-visible">
      <slot />
    </main>

    <FooterSection />

    <CookieBanner />
    <ScrollTopButton />
  </div>
</template>
