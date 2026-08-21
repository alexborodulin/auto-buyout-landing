<script setup lang="ts">
import { dataOperator } from '~/constants/legal'

useSeoMeta({
  title: 'Политика конфиденциальности | 1Выкуп',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <LegalDoc title="Политика конфиденциальности" updated="21.08.2026">
    <p>
      Настоящая Политика описывает, как {{ dataOperator.name }} («Оператор», «мы») обрабатывает
      персональные данные посетителей сайта
      <a :href="dataOperator.site" class="text-brand underline-offset-2 hover:underline">{{ dataOperator.site }}</a>
      в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">1. Оператор и контакты</h2>
    <p>
      Оператор персональных данных: {{ dataOperator.name }}.<br />
      Место обработки: {{ dataOperator.city }}, {{ dataOperator.region }}.<br />
      Email:
      <a :href="`mailto:${dataOperator.email}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.email
      }}</a
      ><br />
      Телефон:
      <a :href="`tel:${dataOperator.phoneTel}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.phoneDisplay
      }}</a>
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">2. Какие данные мы обрабатываем</h2>
    <ul class="list-disc space-y-1 pl-5">
      <li>телефон — обязателен для обратной связи по заявке;</li>
      <li>имя — если вы его указали;</li>
      <li>сведения об автомобиле — если вы их указали;</li>
      <li>технические данные визита: IP-адрес, дата и время обращения, идентификатор формы, версия согласия;</li>
      <li>файлы cookie и данные аналитики — только при вашем согласии в cookie-баннере.</li>
    </ul>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">3. Цели обработки</h2>
    <ul class="list-disc space-y-1 pl-5">
      <li>приём и обработка заявки на оценку и выкуп автомобиля;</li>
      <li>связь с вами по телефону или иным указанным способом;</li>
      <li>исполнение договорённостей по сделке и подготовка документов;</li>
      <li>улучшение работы сайта и учёт обращений (при согласии на аналитические cookie);</li>
      <li>соблюдение требований законодательства РФ.</li>
    </ul>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">4. Правовые основания</h2>
    <p>
      Обработка выполняется на основании согласия субъекта персональных данных (ст. 6, ст. 9 152-ФЗ), а также
      при необходимости — для исполнения договора и соблюдения закона.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">5. Сроки хранения</h2>
    <p>
      Данные заявки хранятся не дольше, чем это необходимо для целей обработки, как правило не более 3 лет с
      момента последнего обращения, если более длительный срок не требуется законом. Cookie-согласие хранится
      в вашем браузере до отзыва или очистки данных сайта.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">6. Передача третьим лицам</h2>
    <p>
      Мы не продаём персональные данные. Передача возможна сервисам, без которых нельзя оказать услугу
      (хостинг сайта, почтовая и мессенджер-доставка заявок, аналитика при вашем согласии), а также по
      законному требованию государственных органов.
    </p>

    <h2 id="cookies" class="mt-8 scroll-mt-28 text-xl font-semibold text-slate-900">7. Cookie</h2>
    <p>
      Необходимые cookie обеспечивают работу сайта (например, сохранение вашего выбора в баннере). Аналитические
      cookie, включая Яндекс Метрику, включаются только после согласия «Принять» или включения аналитики в
      настройках. Вы можете отклонить необязательные cookie или изменить выбор позже через ссылку «Настройки
      cookie» в подвале сайта.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">8. Права и отзыв согласия</h2>
    <p>
      Вы вправе запросить доступ, уточнение, блокирование или удаление своих данных, а также отозвать согласие,
      направив обращение на
      <a :href="`mailto:${dataOperator.email}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.email
      }}</a>
      или по телефону
      <a :href="`tel:${dataOperator.phoneTel}`" class="text-brand underline-offset-2 hover:underline">{{
        dataOperator.phoneDisplay
      }}</a>. Отзыв согласия не влияет на законность обработки до
      момента отзыва.
    </p>

    <h2 class="mt-8 text-xl font-semibold text-slate-900">9. Изменения</h2>
    <p>
      Актуальная версия Политики всегда доступна на этой странице. При существенных изменениях мы обновляем
      дату публикации.
    </p>
  </LegalDoc>
</template>
