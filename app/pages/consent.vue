<script setup lang="ts">
import { CONSENT_VERSION, dataOperator, legalPaths } from '~/constants/legal'

useSeoMeta({
  title: 'Согласие на обработку персональных данных | 1Выкуп',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <LegalDoc title="Согласие на обработку персональных данных" updated="21.08.2026">
    <p class="text-sm text-slate-500">Версия текста согласия: {{ CONSENT_VERSION }}</p>

    <p>
      Настоящим я, субъект персональных данных, свободно, своей волей и в своём интересе даю согласие
      Оператору — {{ dataOperator.name }} ({{ dataOperator.city }}, {{ dataOperator.region }};
      <a :href="`mailto:${dataOperator.email}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.email
      }}</a>;
      <a :href="`tel:${dataOperator.phoneTel}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.phoneDisplay
      }}</a>) — на обработку моих персональных данных на
      условиях ниже.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">1. Состав данных</h2>
    <p>
      Телефон; имя (если указано); сведения об автомобиле (если указаны); дата и время согласия; версия
      настоящего текста; технический идентификатор формы; IP-адрес и иные технические сведения обращения.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">2. Цели</h2>
    <p>
      Обработка заявки на оценку и выкуп автомобиля, обратная связь, подготовка сделки и документов,
      учёт обращений, исполнение требований закона.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">3. Действия с данными</h2>
    <p>
      Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (если нужно для
      указанных целей — хостинг, почта, мессенджер), блокирование, удаление, уничтожение. Обработка может
      быть автоматизированной и неавтоматизированной.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">4. Срок и отзыв</h2>
    <p>
      Согласие действует с момента отметки в форме и до отзыва либо до истечения срока хранения, указанного в
      <NuxtLink :to="legalPaths.privacy" class="text-brand underline-offset-2 hover:underline"
        >Политике конфиденциальности</NuxtLink
      >. Отозвать согласие можно письмом на
      <a :href="`mailto:${dataOperator.email}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.email
      }}</a>
      или по телефону
      <a :href="`tel:${dataOperator.phoneTel}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.phoneDisplay
      }}</a>.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">5. Подтверждение</h2>
    <p>
      Отмечая чекбокс на сайте {{ dataOperator.site }} и отправляя форму, я подтверждаю, что ознакомлен с
      текстом согласия версии {{ CONSENT_VERSION }} и
      <NuxtLink :to="legalPaths.privacy" class="text-brand underline-offset-2 hover:underline"
        >Политикой конфиденциальности</NuxtLink
      >.
    </p>
  </LegalDoc>
</template>
