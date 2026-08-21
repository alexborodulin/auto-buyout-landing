<script setup lang="ts">
const advantages = [
  { title: 'Деньги сразу', icon: 'cash' as const },
  { title: 'Любое состояние', icon: 'car' as const },
  { title: 'Оценка бесплатно', icon: 'check' as const },
  { title: 'Документы под ключ', icon: 'docs' as const },
  { title: 'Выезд за 2 часа', icon: 'clock' as const },
  { title: 'Пенза и область', icon: 'pin' as const },
]
</script>

<template>
  <section id="advantages" class="section py-6 md:py-16 lg:py-24">
    <div class="container-content">
      <h2 class="section-title">
        {{ nbsp('Почему выбирают нас') }}
      </h2>

      <ul class="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-3">
        <li v-for="item in advantages" :key="item.title">
          <article
            class="flex h-full items-center gap-2 rounded-2xl border border-slate-200 bg-surface-card p-2.5 sm:gap-3 sm:rounded-card sm:p-5"
          >
            <span
              class="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand sm:size-11"
            >
              <svg
                v-if="item.icon === 'cash'"
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'car'"
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6.75m-9.75 0H5.106c-.89 0-1.64-.642-1.78-1.522L3.05 15.06A2.25 2.25 0 015.106 12.5h13.788a2.25 2.25 0 012.056 2.56l-.276 2.168c-.14.88-.89 1.522-1.78 1.522H16.5m-9.75 0h9.75m0 0a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0M8.25 8.25h7.5L18 12.5H6l2.25-4.25z"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'check'"
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'docs'"
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'clock'"
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                v-else
                class="size-5 sm:size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
            <h3 class="text-base font-semibold leading-snug text-slate-900">
              {{ nbsp(item.title) }}
            </h3>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
