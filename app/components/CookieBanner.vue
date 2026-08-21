<script setup lang="ts">
import { legalPaths } from '~/constants/legal'

const { showBanner, choice, settingsOpen, setChoice, closeSettings } = useCookieConsent()

const analyticsDraft = ref(false)

watch(
  [showBanner, choice],
  () => {
    analyticsDraft.value = choice.value === 'all'
  },
  { immediate: true },
)

function saveSettings() {
  setChoice(analyticsDraft.value ? 'all' : 'necessary')
}
</script>

<template>
  <div
    v-if="showBanner"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
    role="region"
    aria-labelledby="cookie-banner-title"
    aria-describedby="cookie-banner-text"
  >
    <div
      class="pointer-events-auto mx-auto max-w-content rounded-card border border-slate-200 bg-white p-4 shadow-lg"
    >
      <p id="cookie-banner-title" class="text-base font-semibold text-slate-900">
        {{ nbsp('Мы используем cookie') }}
      </p>
      <p id="cookie-banner-text" class="mt-1 text-base text-slate-600">
        Необходимые cookie нужны для работы сайта. Аналитические (Яндекс Метрика) — только с вашего согласия.
        <NuxtLink :to="legalPaths.cookies" class="text-brand underline-offset-2 hover:underline">
          Политика cookie
        </NuxtLink>
      </p>

      <div v-if="settingsOpen" class="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label class="flex min-h-11 cursor-not-allowed items-start gap-3 opacity-80">
          <input type="checkbox" class="checkbox mt-0.5" checked disabled />
          <span>
            <span class="block font-semibold text-slate-900">Необходимые</span>
            <span class="block text-base text-slate-600">Всегда включены: работа форм и сайта.</span>
          </span>
        </label>
        <label class="flex min-h-11 cursor-pointer items-start gap-3">
          <input v-model="analyticsDraft" type="checkbox" class="checkbox mt-0.5" />
          <span>
            <span class="block font-semibold text-slate-900">Аналитика</span>
            <span class="block text-base text-slate-600">Яндекс Метрика — посещения и цели заявок.</span>
          </span>
        </label>
        <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            v-if="choice !== null"
            type="button"
            class="btn-outline min-h-11 px-4"
            @click="closeSettings"
          >
            {{ nbsp('Отмена') }}
          </button>
          <button type="button" class="btn-primary min-h-11 px-4" @click="saveSettings">
            {{ nbsp('Сохранить') }}
          </button>
        </div>
      </div>

      <div v-else class="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <button type="button" class="btn-outline min-h-11 px-4" @click="settingsOpen = true">
          {{ nbsp('Настроить') }}
        </button>
        <button type="button" class="btn-outline min-h-11 px-4" @click="setChoice('necessary')">
          {{ nbsp('Отклонить необязательные') }}
        </button>
        <button type="button" class="btn-primary min-h-11 px-4" @click="setChoice('all')">
          {{ nbsp('Принять') }}
        </button>
      </div>
    </div>
  </div>
</template>
