<script setup lang="ts">
const requiredDocuments = [
  { title: 'Паспорт владельца', description: 'Действующий паспорт РФ', icon: 'passport' as const },
  { title: 'ПТС', description: 'Бумажный или электронный', icon: 'pts' as const },
  { title: 'СТС', description: 'Свидетельство о регистрации', icon: 'sts' as const },
  { title: 'Ключи', description: 'Все комплекты, если есть', icon: 'keys' as const },
]

const optionalDocuments = [
  { title: 'Доверенность', description: 'Если продаёт не собственник' },
  { title: 'Справка из банка', description: 'Для кредитных авто' },
  { title: 'Сервисная книжка', description: 'По желанию' },
  { title: 'Предыдущий ДКП', description: 'Если не первый собственник' },
]
</script>

<template>
  <section id="documents" class="section bg-white py-6 md:py-16 lg:py-24">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">{{ nbsp('Какие документы нужны') }}</h2>
        <p class="section-subtitle mt-2 sm:mt-4">
          {{ nbsp('Базовый пакет — остальное подскажем при оценке.') }}
        </p>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
        <article v-for="doc in requiredDocuments" :key="doc.title" class="rounded-2xl border border-slate-200 p-3 sm:p-5">
          <div class="mb-2 inline-flex size-9 items-center justify-center rounded-xl bg-brand-muted text-brand sm:mb-4 sm:size-12 sm:rounded-card">
            <DocumentIcon :name="doc.icon" />
          </div>
          <h3 class="text-base font-semibold leading-snug text-slate-900">
            {{ nbsp(doc.title) }}
          </h3>
          <p class="mt-1 text-base leading-snug text-slate-600">
            {{ nbsp(doc.description) }}
          </p>
        </article>
      </div>

      <ul class="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-base text-slate-600 sm:mt-6 sm:grid-cols-4">
        <li v-for="doc in optionalDocuments" :key="doc.title">
          <span class="font-medium text-slate-800">{{ nbsp(doc.title) }}</span>
          <span class="hidden sm:inline"> — {{ nbsp(doc.description) }}</span>
        </li>
      </ul>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-muted bg-brand-muted/40 p-3 sm:mt-8 sm:p-6">
        <p class="text-base text-slate-700">
          {{ nbsp('Нет полного комплекта? Разберём ситуацию индивидуально.') }}
        </p>
        <a href="#contact" class="btn-primary-sm">{{ nbsp('Оценить авто') }}</a>
      </div>
    </div>
  </section>
</template>
