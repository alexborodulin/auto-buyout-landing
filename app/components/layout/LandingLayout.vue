<template>
  <div class="relative flex min-h-screen flex-col overflow-x-hidden bg-surface-light text-slate-900">
    <div class="hero-glow" aria-hidden="true" />

    <div class="menu-fixed">
      <div class="menu-bar mx-auto max-w-content">
        <AppMenu />
      </div>
    </div>

    <main class="main-with-fixed-menu relative flex-1 overflow-visible">
      <slot />
    </main>

    <FooterSection />

    <CookieBanner />
    <ScrollTopButton />
  </div>
</template>
