<script setup lang="ts">
const faqs = [
  {
    question: 'Сколько стоит оценка автомобиля?',
    answer:
      'Оценка абсолютно бесплатна. Специалист приедет к вам, осмотрит автомобиль и назовёт финальную цену — без каких-либо комиссий и обязательств с вашей стороны.',
  },
  {
    question: 'Как быстро выплачиваются деньги?',
    answer:
      'Деньги выплачиваются в день сделки — наличными или переводом на карту. Никаких отложенных платежей и ожидания.',
  },
  {
    question: 'Можно ли продать автомобиль в кредите?',
    answer:
      'Да. Мы помогаем с закрытием кредита: сами договариваемся с банком, гасим задолженность и отдаём вам разницу на руки. Достаточно иметь справку из банка об остатке долга.',
  },
  {
    question: 'Берёте ли вы битые и аварийные машины?',
    answer:
      'Берём автомобили после ДТП, с повреждениями кузова, не на ходу и требующие капитального ремонта. Состояние авто влияет на цену, но не является препятствием для сделки.',
  },
  {
    question: 'Как долго занимает оформление сделки?',
    answer:
      'Вся процедура занимает 1–2 часа: осмотр, оформление договора купли-продажи и выплата денег. Снятие с учёта берём на себя.',
  },
  {
    question: 'Вы работаете по всей Пензенской области?',
    answer:
      'Да, выезжаем по Пензе и всей Пензенской области. Для отдалённых районов возможен выезд при предварительном согласовании.',
  },
  {
    question: 'Что если у меня нет ПТС или других документов?',
    answer:
      'Позвоните нам — разберём вашу ситуацию индивидуально. Мы работаем с неполным комплектом документов и помогаем восстановить необходимые бумаги.',
  },
]

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="section" itemscope itemtype="https://schema.org/FAQPage">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">Частые вопросы</h2>
        <p class="section-subtitle">
          Отвечаем на вопросы, которые чаще всего задают перед продажей автомобиля.
        </p>
      </div>

      <div class="mt-12 mx-auto max-w-3xl divide-y divide-slate-200 rounded-card border border-slate-200">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.question"
          itemscope
          itemprop="mainEntity"
          itemtype="https://schema.org/Question"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span itemprop="name" class="text-base font-semibold text-slate-900 sm:text-lg">
              {{ faq.question }}
            </span>
            <svg
              class="size-5 shrink-0 text-slate-400 transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === i }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            v-show="openIndex === i"
            itemscope
            itemprop="acceptedAnswer"
            itemtype="https://schema.org/Answer"
          >
            <p itemprop="text" class="px-6 pb-5 text-base leading-relaxed text-slate-600">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
