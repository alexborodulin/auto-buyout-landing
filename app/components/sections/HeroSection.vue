<script setup lang="ts">
import carMain from '~/assets/images/car-main.webp'
</script>

<template>
  <section id="hero">
    <div
      class="absolute inset-y-0 right-0 hidden w-1/2 max-w-xl bg-contain bg-right bg-no-repeat lg:block"
      :style="{ backgroundImage: `url(${carMain})` }"
      aria-hidden="true"
    />
    <div class="absolute inset-0" />
    <div class="absolute inset-0" />

    <div class="container-content relative py-20 sm:py-28">
      <div class="max-w-2xl">
        <p class="badge">Быстрый выкуп автомобилей</p>
        <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Продайте авто — честно и без лишних хлопот
        </h1>
        <p class="mt-6 text-lg text-slate-300">
          Выкупаем автомобили в любом состоянии. Бесплатная оценка, моментальный расчёт и оформление
          документов на месте.
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="#contact" class="btn-primary">Получить оценку</a>
          <a href="#how-it-works" class="btn-secondary">Как это работает</a>
        </div>
      </div>
    </div>
  </section>
</template>
