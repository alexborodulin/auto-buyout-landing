<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { contactPhones } from '~/constants/contact'

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const PHONE_PREFIX = '+7 ('

const noAutoValidateConfig = {
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
}

const schema = toTypedSchema(
  yup.object({
    name: yup
      .string()
      .required('Введите имя')
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Только буквы'),
    phone: yup
      .string()
      .required('Введите телефон')
      .matches(phoneRegex, 'Введите полный номер телефона'),
    car: yup.string().max(80, 'Максимум 80 символов').notRequired(),
  }),
)

const {
  handleSubmit,
  resetForm,
  defineField,
  errors,
  setFieldError,
  setFieldTouched,
  validateField,
} = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    phone: '',
    car: '',
  },
})

const [name] = defineField('name', noAutoValidateConfig)
const [phone] = defineField('phone', noAutoValidateConfig)
const [car] = defineField('car', noAutoValidateConfig)

function isPhoneEmpty(value: string | undefined) {
  return !value || value === PHONE_PREFIX
}

function clearFieldValidation(field: 'name' | 'phone' | 'car') {
  setFieldError(field, undefined)
  setFieldTouched(field, false)
}

async function onBlurIfNotEmpty(
  field: 'name' | 'phone' | 'car',
  value: string,
  isEmpty: (value: string) => boolean,
) {
  if (isEmpty(value)) {
    clearFieldValidation(field)
    return
  }
  setFieldTouched(field, true)
  await validateField(field)
}

function onNameBlur() {
  onBlurIfNotEmpty('name', name.value ?? '', (value) => !value.trim())
}

function onPhoneFocus(event: FocusEvent) {
  if (phone.value) return

  phone.value = PHONE_PREFIX
  nextTick(() => {
    const input = event.target as HTMLInputElement
    input.setSelectionRange(PHONE_PREFIX.length, PHONE_PREFIX.length)
  })
}

async function onPhoneBlur() {
  if (isPhoneEmpty(phone.value)) {
    phone.value = ''
    clearFieldValidation('phone')
    return
  }
  setFieldTouched('phone', true)
  await validateField('phone')
}

function onCarBlur() {
  onBlurIfNotEmpty('car', car.value ?? '', (value) => !value.trim())
}

const showSuccessModal = ref(false)

const onSubmit = handleSubmit(() => {
  // TODO: подключить отправку формы
  resetForm()
  showSuccessModal.value = true
})
</script>

<template>
  <section id="contact" class="section bg-surface text-white">
    <div class="container-content">
      <div class="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:items-center">
        <div>
          <h2 class="text-3xl font-bold md:text-3xl lg:text-4xl">Оцените автомобиль бесплатно</h2>
          <p class="mt-4 text-lg text-slate-300 lg:text-xl">
            Оставьте заявку — перезвоним в течение 15 минут и назовём предварительную цену.
          </p>
          <ul class="mt-8 space-y-3 text-slate-300">
            <li>
              📞
              <a :href="`tel:${contactPhones.full.tel}`" class="contact-phone-link">
                {{ contactPhones.full.display }}
              </a>
            </li>
            <li>
              📞 Короткий номер:
              <a :href="`tel:${contactPhones.short.tel}`" class="contact-phone-link">
                {{ contactPhones.short.display }}
              </a>
            </li>
            <li>✉️ info@avtovykup.ru</li>
            <li>📍 Пенза и Пензенская область</li>
          </ul>
        </div>

        <form
          class="rounded-card bg-surface-card p-6 text-slate-900 sm:p-8"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="space-y-4">
            <div>
              <label for="name" class="label">Ваше имя</label>
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Иван"
                :class="['input', { 'input-error': errors.name }]"
                @blur="onNameBlur"
              />
              <p v-if="errors.name" class="error-message">
                {{ errors.name }}
              </p>
            </div>
            <div>
              <label for="phone" class="label">Телефон</label>
              <input
                id="phone"
                v-model="phone"
                v-maska="'+7 (###) ###-##-##'"
                type="tel"
                placeholder="+7 (999) 000-00-00"
                :class="['input', { 'input-error': errors.phone }]"
                @focus="onPhoneFocus"
                @blur="onPhoneBlur"
              />
              <p v-if="errors.phone" class="error-message">
                {{ errors.phone }}
              </p>
            </div>
            <div>
              <label for="car" class="label">Автомобиль</label>
              <input
                id="car"
                v-model="car"
                type="text"
                placeholder="Toyota Camry, 2018"
                :class="['input', { 'input-error': errors.car }]"
                @blur="onCarBlur"
              />
              <p v-if="errors.car" class="error-message">
                {{ errors.car }}
              </p>
            </div>
          </div>
          <button type="submit" class="btn-primary mt-6 w-full">Отправить заявку</button>
        </form>
      </div>
    </div>

    <AppModal v-model="showSuccessModal" title="Заявка отправлена!">
      <template #icon>
        <div
          class="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-card bg-brand-muted"
        >
          <svg
            class="size-8 text-brand"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </template>

      <p>Мы свяжемся с вами в ближайшее время.</p>

      <template #footer>
        <button type="button" class="btn-primary w-full" @click="showSuccessModal = false">
          Отлично
        </button>
      </template>
    </AppModal>
  </section>
</template>
