<template>
  <div class="flex min-h-screen flex-col bg-surface-light text-slate-900">
    <AppMenu />
    <main class="flex-1">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>
