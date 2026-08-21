<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { contactPhones } from '~/constants/contact'
import { CONTACT_FORM_ID, CONSENT_VERSION, legalPaths } from '~/constants/legal'
import { metrikaGoals, reachGoal } from '~/utils/metrika'

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
      .transform((value: string) => value?.trim() ?? '')
      .max(50, 'Максимум 50 символов')
      .test('name-optional', 'Минимум 2 символа', (value) => !value || value.length >= 2)
      .test('name-letters', 'Только буквы', (value) => !value || /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value))
      .notRequired(),
    phone: yup
      .string()
      .required('Введите телефон')
      .matches(phoneRegex, 'Введите полный номер телефона'),
    car: yup.string().max(80, 'Максимум 80 символов').notRequired(),
    consentPersonalData: yup
      .boolean()
      .oneOf([true], 'Нужно согласие на обработку персональных данных'),
    consentPrivacy: yup
      .boolean()
      .oneOf([true], 'Подтвердите, что ознакомились с политикой конфиденциальности'),
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
    consentPersonalData: false,
    consentPrivacy: false,
  },
})

const [name] = defineField('name', noAutoValidateConfig)
const [phone] = defineField('phone', noAutoValidateConfig)
const [car] = defineField('car', noAutoValidateConfig)
const [consentPersonalData] = defineField('consentPersonalData', noAutoValidateConfig)
const [consentPrivacy] = defineField('consentPrivacy', noAutoValidateConfig)

const honeypot = ref('')
const isSubmitting = ref(false)
const submitError = ref('')

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
const route = useRoute()

const onSubmit = handleSubmit(async (values) => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: values.name || undefined,
        phone: values.phone,
        car: values.car || undefined,
        formId: CONTACT_FORM_ID,
        consentVersion: CONSENT_VERSION,
        consentAcceptedAt: new Date().toISOString(),
        consentPersonalData: true,
        consentPrivacy: true,
        _hp: honeypot.value,
      },
    })
    resetForm()
    honeypot.value = ''
    showSuccessModal.value = true
    reachGoal(metrikaGoals.formLead, { form: CONTACT_FORM_ID, page: route.path })
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'data' in err
        ? (err as { data?: { message?: string } }).data?.message
        : undefined
    submitError.value = message ?? 'Не удалось отправить заявку. Попробуйте позвонить нам.'
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <section id="contact" class="section bg-surface text-white">
    <div class="container-content">
      <div class="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:items-center">
        <div>
          <h2 class="text-3xl font-bold md:text-3xl lg:text-4xl">
            {{ nbsp('Оцените автомобиль бесплатно') }}
          </h2>
          <p class="mt-4 text-lg text-slate-300 lg:text-xl">
            {{
              nbsp(
                'Оставьте заявку — перезвоним в течение 15 минут и назовём предварительную цену.',
              )
            }}
          </p>
          <ul class="mt-8 space-y-3 text-slate-300">
            <li>
              📞
              <a
                :href="`tel:${contactPhones.full.tel}`"
                class="contact-phone-link inline-flex min-h-11 items-center"
                @click="reachGoal(metrikaGoals.phoneClick)"
              >
                {{ contactPhones.full.display }}
              </a>
            </li>
            <li>📍 {{ nbsp('Пенза и Пензенская область') }}</li>
          </ul>
        </div>

        <form
          class="relative rounded-card bg-surface-card p-4 text-slate-900 sm:p-8"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="space-y-4">
            <!-- Honeypot — скрытое поле для ботов -->
            <input
              v-model="honeypot"
              type="text"
              name="_hp"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute size-0 overflow-hidden opacity-0"
            />
            <div>
              <label for="name" class="label">
                Ваше имя
                <span class="font-normal text-slate-400">{{ nbsp('(необязательно)') }}</span>
              </label>
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
              <label for="car" class="label">
                Автомобиль
                <span class="font-normal text-slate-400">{{ nbsp('(необязательно)') }}</span>
              </label>
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
            <div>
              <label class="flex min-h-11 cursor-pointer items-start gap-3">
                <input
                  v-model="consentPersonalData"
                  type="checkbox"
                  class="checkbox mt-0.5"
                  :aria-invalid="Boolean(errors.consentPersonalData)"
                />
                <span class="text-base leading-snug text-slate-700">
                  Согласен на
                  <NuxtLink
                    :to="legalPaths.consent"
                    class="text-brand underline-offset-2 hover:underline"
                    target="_blank"
                    >обработку персональных данных</NuxtLink
                  >
                </span>
              </label>
              <p v-if="errors.consentPersonalData" class="error-message mt-1">
                {{ errors.consentPersonalData }}
              </p>
            </div>
            <div>
              <label class="flex min-h-11 cursor-pointer items-start gap-3">
                <input
                  v-model="consentPrivacy"
                  type="checkbox"
                  class="checkbox mt-0.5"
                  :aria-invalid="Boolean(errors.consentPrivacy)"
                />
                <span class="text-base leading-snug text-slate-700">
                  Ознакомлен с
                  <NuxtLink
                    :to="legalPaths.privacy"
                    class="text-brand underline-offset-2 hover:underline"
                    target="_blank"
                    >политикой конфиденциальности</NuxtLink
                  >
                </span>
              </label>
              <p v-if="errors.consentPrivacy" class="error-message mt-1">
                {{ errors.consentPrivacy }}
              </p>
            </div>
          </div>
          <p v-if="submitError" class="error-message mt-4 text-center">
            {{ submitError }}
          </p>
          <button
            type="submit"
            class="btn-primary mt-6 w-full py-4 text-lg sm:py-3 sm:text-base"
            :disabled="isSubmitting"
          >
            {{ nbsp(isSubmitting ? 'Отправка…' : 'Оценить авто') }}
          </button>
        </form>
      </div>
    </div>

    <AppModal v-model="showSuccessModal" :title="nbsp('Заявка отправлена!')">
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

      <p>{{ nbsp('Мы свяжемся с вами в ближайшее время.') }}</p>

      <template #footer>
        <button type="button" class="btn-primary w-full" @click="showSuccessModal = false">
          {{ nbsp('Отлично') }}
        </button>
      </template>
    </AppModal>
  </section>
</template>
