<template>
  <footer class="border-t border-slate-200 bg-surface-card py-8">
    <div class="container-content flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p class="text-base text-slate-500">
        © {{ new Date().getFullYear() }} АвтоВыкуп. Все права защищены.
      </p>
      <nav class="flex gap-6">
        <a href="#advantages" class="link-muted">Преимущества</a>
        <a href="#services" class="link-muted">Услуги</a>
        <a href="#documents" class="link-muted">Документы</a>
      </nav>
    </div>
  </footer>
</template>
