<script setup lang="ts">
import { SITE_URL, contactEmail } from '~/constants/site'

useSeoMeta({
  title: 'Выкуп автомобилей в Пензе — срочный автовыкуп | АвтоВыкуп',
  description:
    'Выкупаем автомобили в любом состоянии в Пензе и Пензенской области. Бесплатная оценка, деньги в день сделки, выезд в течение 2 часов. Звоните: +7 (902) 203-90-58',
  ogTitle: 'Срочный выкуп авто в Пензе — АвтоВыкуп',
  ogDescription:
    'Купим ваш автомобиль честно и быстро. Бесплатная оценка, выезд за 2 часа, деньги сразу.',
  ogType: 'website',
  ogUrl: SITE_URL,
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: SITE_URL }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'АвтоВыкуп',
        description: 'Срочный выкуп автомобилей в Пензе и Пензенской области',
        url: SITE_URL,
        telephone: '+79022039058',
        email: contactEmail.display,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Пенза',
          addressRegion: 'Пензенская область',
          addressCountry: 'RU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 53.195,
          longitude: 45.0169,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '21:00',
          },
        ],
        priceRange: '$$',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Пензенская область',
        },
        serviceType: 'Выкуп автомобилей',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Услуги выкупа автомобилей',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Срочный выкуп авто' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Выкуп битых авто' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Выкуп кредитных авто' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Выкуп мото' } },
          ],
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <HeroSection />
    <AdvantagesSection />
    <CarsSection />
    <ServicesSection />
    <HowItWorksSection />
    <DocumentsSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>
