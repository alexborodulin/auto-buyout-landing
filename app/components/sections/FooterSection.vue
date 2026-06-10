<script setup lang="ts">
import { contactPhones } from '~/constants/contact'
</script>

<template>
  <footer class="border-t border-slate-200 bg-surface-card py-8">
    <div class="container-content flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="text-center sm:text-left">
        <p class="text-base text-slate-500">
          © {{ new Date().getFullYear() }} АвтоВыкуп. Все права защищены.
        </p>
        <p class="mt-2 text-base text-slate-500">
          <a :href="`tel:${contactPhones.full.tel}`" class="link-muted">{{ contactPhones.full.display }}</a>
          <span class="mx-2 text-slate-300">·</span>
          <a :href="`tel:${contactPhones.short.tel}`" class="link-muted">{{ contactPhones.short.display }}</a>
        </p>
      </div>
      <nav class="flex gap-6">
        <a href="#advantages" class="link-muted">Преимущества</a>
        <a href="#services" class="link-muted">Услуги</a>
        <a href="#documents" class="link-muted">Документы</a>
      </nav>
    </div>
  </footer>
</template>
