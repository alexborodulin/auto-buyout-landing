<script setup lang="ts">
const form = reactive({
  name: '',
  phone: '',
  car: '',
})

function onSubmit() {
  // TODO: подключить отправку формы
  alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
  form.name = ''
  form.phone = ''
  form.car = ''
}
</script>

<template>
  <section id="contact" class="section bg-surface text-white">
    <div class="container-content">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 class="text-3xl font-bold sm:text-4xl">
            Оцените автомобиль бесплатно
          </h2>
          <p class="mt-4 text-lg text-slate-300">
            Оставьте заявку — перезвоним в течение 15 минут и назовём предварительную цену.
          </p>
          <ul class="mt-8 space-y-3 text-slate-300">
            <li>📞 +7 (999) 123-45-67</li>
            <li>✉️ info@avtovykup.ru</li>
            <li>📍 Москва и Московская область</li>
          </ul>
        </div>

        <form
          class="rounded-card bg-surface-card p-6 text-slate-900 sm:p-8"
          @submit.prevent="onSubmit"
        >
          <div class="space-y-4">
            <div>
              <label for="name" class="label">Ваше имя</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Иван"
                class="input"
              >
            </div>
            <div>
              <label for="phone" class="label">Телефон</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                placeholder="+7 (999) 000-00-00"
                class="input"
              >
            </div>
            <div>
              <label for="car" class="label">Автомобиль</label>
              <input
                id="car"
                v-model="form.car"
                type="text"
                placeholder="Toyota Camry, 2018"
                class="input"
              >
            </div>
          </div>
          <button type="submit" class="btn-primary mt-6 w-full">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
