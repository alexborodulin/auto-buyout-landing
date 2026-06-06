<template>
  <div class="flex min-h-screen flex-col bg-surface-light text-slate-900">
    <div class="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div class="menu-bar mx-auto max-w-content">
        <AppMenu />
      </div>
    </div>

    <main class="flex-1">
      <slot />
    </main>

    <FooterSection />
  </div>
</template>
