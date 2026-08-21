<script setup lang="ts">
import { contactPhones } from '~/constants/contact'
import { metrikaGoals, reachGoal } from '~/utils/metrika'

const links = [
  { label: 'Преимущества', href: '/#advantages' },
  { label: 'Примеры', href: '/#cars' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Как работаем', href: '/#how-it-works' },
  { label: 'Документы', href: '/#documents' },
]

const { isMobileMenuOpen } = useMobileMenu()
const isCompact = ref(false)

function closeMenu() {
  isMobileMenuOpen.value = false
}

function onPhoneClick() {
  reachGoal(metrikaGoals.phoneClick)
}

function onPhoneClickAndClose() {
  onPhoneClick()
  closeMenu()
}

function onScroll() {
  isCompact.value = window.scrollY > 40
}

watch(isMobileMenuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  isMobileMenuOpen.value = false
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="menu-backdrop">
      <div v-if="isMobileMenuOpen" class="menu-backdrop" aria-hidden="true" @click="closeMenu" />
    </Transition>
  </Teleport>

  <header>
    <div class="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
      <a
        href="/#hero"
        class="logo-text min-w-0 truncate"
        :class="{ 'max-lg:hidden': isCompact && !isMobileMenuOpen }"
      >
        Авто<span class="logo-accent">Выкуп</span>
      </a>

      <nav class="hidden items-center gap-6 lg:flex xl:gap-8">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">
          {{ nbsp(link.label) }}
        </a>
      </nav>

      <div class="ml-auto hidden items-center gap-3 lg:flex">
        <a
          :href="`tel:${contactPhones.full.tel}`"
          class="menu-phone-short"
          :aria-label="`Позвонить ${contactPhones.full.display}`"
          @click="onPhoneClick"
        >
          {{ nbsp('Позвонить') }}
        </a>
        <a href="/#contact" class="btn-menu-cta">{{ nbsp('Оценить авто') }}</a>
      </div>

      <div class="ml-auto flex items-center gap-1.5 lg:hidden">
        <a
          :href="`tel:${contactPhones.full.tel}`"
          class="menu-icon-btn"
          :aria-label="`Позвонить ${contactPhones.full.display}`"
          @click="onPhoneClick"
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </a>
        <a href="/#contact" class="btn-menu-cta-mobile" @click="closeMenu">
          {{ nbsp('Оценить авто') }}
        </a>
        <button
          type="button"
          class="menu-icon-btn"
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
      </div>
    </div>

    <nav v-show="isMobileMenuOpen" class="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="nav-link block min-h-11 py-3"
        @click="closeMenu"
      >
        {{ nbsp(link.label) }}
      </a>
      <a href="/#contact" class="btn-menu-cta mt-3 block text-center" @click="closeMenu">
        {{ nbsp('Оценить авто') }}
      </a>
      <div class="mt-4 border-t border-slate-200 pt-4 text-center">
        <a
          :href="`tel:${contactPhones.full.tel}`"
          class="contact-phone-link block min-h-11 text-base font-semibold leading-[2.75rem] text-slate-900"
          @click="onPhoneClickAndClose"
        >
          {{ contactPhones.full.display }}
        </a>
      </div>
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
