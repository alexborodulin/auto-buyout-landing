<script setup lang="ts">
import { contactPhones } from '~/constants/contact'
import { legalPaths } from '~/constants/legal'
import { metrikaGoals, reachGoal } from '~/utils/metrika'

function onPhoneClick() {
  reachGoal(metrikaGoals.phoneClick)
}

const { openSettings: openCookieSettings } = useCookieConsent()
</script>

<template>
  <footer class="border-t border-slate-200 bg-surface-card py-8">
    <div class="container-content flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
      <div class="text-center sm:text-left">
        <p class="text-base text-slate-500">
          © {{ new Date().getFullYear() }} АвтоВыкуп. {{ nbsp('Все права защищены.') }}
        </p>
        <p class="mt-1 text-base text-slate-500">
          <span itemscope itemtype="https://schema.org/PostalAddress">
            <span itemprop="addressLocality">Пенза</span>{{ '\u00A0' }}и{{ '\u00A0' }}<span itemprop="addressRegion">Пензенская область</span>
          </span>
        </p>
        <p class="mt-2 text-base text-slate-500">
          <a
            :href="`tel:${contactPhones.full.tel}`"
            class="link-muted inline-flex min-h-11 items-center"
            @click="onPhoneClick"
          >{{ contactPhones.full.display }}</a>
        </p>
      </div>
      <nav class="flex flex-col items-center gap-1 sm:items-end">
        <div class="flex flex-wrap justify-center gap-x-6">
          <NuxtLink :to="legalPaths.privacy" class="link-muted inline-flex min-h-11 items-center">
            Политика конфиденциальности
          </NuxtLink>
          <NuxtLink :to="legalPaths.consent" class="link-muted inline-flex min-h-11 items-center">
            Согласие на обработку ПД
          </NuxtLink>
          <NuxtLink :to="legalPaths.cookies" class="link-muted inline-flex min-h-11 items-center">
            Политика cookie
          </NuxtLink>
          <button type="button" class="link-muted inline-flex min-h-11 items-center" @click="openCookieSettings">
            Настройки cookie
          </button>
        </div>
        <div class="flex flex-wrap justify-center gap-x-6">
          <a href="/#advantages" class="link-muted inline-flex min-h-11 items-center">Преимущества</a>
          <a href="/#services" class="link-muted inline-flex min-h-11 items-center">Услуги</a>
          <a href="/#documents" class="link-muted inline-flex min-h-11 items-center">Документы</a>
        </div>
      </nav>
    </div>
  </footer>
</template>
