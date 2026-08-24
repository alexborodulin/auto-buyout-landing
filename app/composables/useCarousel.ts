/**
 * Бесконечный слайдер: клоны по краям, без скачка, без дублей id и аналитики.
 * Drag мышью, тач/тачпад, стрелки, клавиатура.
 */
export function useCarousel<T>(items: MaybeRefOrGetter<T[]>) {
  const viewport = ref<HTMLElement | null>(null)
  const currentIndex = ref(0)
  const slidesPerView = ref(1)

  const list = computed(() => toValue(items))
  const count = computed(() => list.value.length)
  const canLoop = computed(() => count.value > slidesPerView.value)
  const offset = computed(() => (canLoop.value ? slidesPerView.value : 0))

  const slides = computed(() => {
    const source = list.value
    const n = slidesPerView.value
    if (!canLoop.value) {
      return source.map((item, index) => ({ item, index, key: `item-${index}`, clone: false }))
    }
    const head = source.slice(-n).map((item, i) => ({
      item,
      index: count.value - n + i,
      key: `head-${i}`,
      clone: true,
    }))
    const body = source.map((item, index) => ({ item, index, key: `item-${index}`, clone: false }))
    const tail = source.slice(0, n).map((item, i) => ({
      item,
      index: i,
      key: `tail-${i}`,
      clone: true,
    }))
    return [...head, ...body, ...tail]
  })

  const dots = computed(() => {
    if (canLoop.value) return Array.from({ length: count.value }, (_, i) => i)
    return Array.from({ length: Math.max(1, count.value - slidesPerView.value + 1) }, (_, i) => i)
  })

  let dragging = false
  let suppressClick = false
  let jumping = false
  let startX = 0
  let startScroll = 0
  let activePointer: number | null = null
  let scrollTimer: ReturnType<typeof setTimeout> | null = null

  function updateSlidesPerView() {
    const width = window.innerWidth
    if (width >= 1024) slidesPerView.value = 3
    else if (width >= 768) slidesPerView.value = 2
    else slidesPerView.value = 1
  }

  function slideWidth() {
    const el = viewport.value
    if (!el) return 0
    const slide = el.querySelector<HTMLElement>('[data-slide]')
    return slide?.getBoundingClientRect().width ?? el.clientWidth
  }

  function rawIndex() {
    const el = viewport.value
    const width = slideWidth()
    if (!el || !width) return offset.value
    return Math.round(el.scrollLeft / width)
  }

  function wrapLogical(raw: number) {
    const c = count.value
    if (!c) return 0
    if (!canLoop.value) {
      return Math.min(Math.max(raw, 0), Math.max(0, c - slidesPerView.value))
    }
    return ((raw - offset.value) % c + c) % c
  }

  function setScroll(abs: number, behavior: ScrollBehavior) {
    const el = viewport.value
    const width = slideWidth()
    if (!el || !width) return
    el.scrollTo({ left: abs * width, behavior })
  }

  function jumpToAbs(abs: number) {
    const el = viewport.value
    if (!el) return
    jumping = true
    el.classList.add('is-jumping')
    setScroll(abs, 'auto')
    currentIndex.value = wrapLogical(abs)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.remove('is-jumping')
        jumping = false
      })
    })
  }

  function syncFromScroll() {
    currentIndex.value = wrapLogical(rawIndex())
  }

  function normalizeIfNeeded() {
    if (jumping || !canLoop.value) {
      syncFromScroll()
      return
    }
    const raw = rawIndex()
    const n = slidesPerView.value
    const c = count.value
    if (raw >= n + c) jumpToAbs(raw - c)
    else if (raw < n) jumpToAbs(raw + c)
    else currentIndex.value = raw - n
  }

  function goTo(index: number, behavior: ScrollBehavior = 'smooth') {
    const c = count.value
    if (!c) return
    const logical = canLoop.value
      ? ((index % c) + c) % c
      : Math.min(Math.max(index, 0), Math.max(0, c - slidesPerView.value))
    currentIndex.value = logical
    setScroll(offset.value + logical, behavior)
  }

  function next() {
    if (canLoop.value) setScroll(offset.value + currentIndex.value + 1, 'smooth')
    else goTo(currentIndex.value + 1)
  }

  function prev() {
    if (canLoop.value) setScroll(offset.value + currentIndex.value - 1, 'smooth')
    else goTo(currentIndex.value - 1)
  }

  function isInteractive(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, label'))
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    if (isInteractive(event.target)) return
    const el = viewport.value
    if (!el) return
    dragging = false
    suppressClick = false
    activePointer = event.pointerId
    startX = event.clientX
    startScroll = el.scrollLeft
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId !== activePointer) return
    const el = viewport.value
    if (!el) return
    const dx = event.clientX - startX
    if (!dragging) {
      if (Math.abs(dx) < 8) return
      dragging = true
      suppressClick = true
      el.setPointerCapture(event.pointerId)
      el.classList.add('is-dragging')
    }
    el.scrollLeft = startScroll - dx
  }

  function endDrag(event: PointerEvent) {
    if (event.pointerId !== activePointer) return
    const el = viewport.value
    const wasDragging = dragging
    dragging = false
    activePointer = null
    el?.classList.remove('is-dragging')
    if (!wasDragging) return
    const width = slideWidth()
    if (!el || !width) return
    setScroll(Math.round(el.scrollLeft / width), 'smooth')
    scheduleNormalize()
  }

  function onClickCapture(event: MouseEvent) {
    if (!suppressClick) return
    event.preventDefault()
    event.stopPropagation()
    suppressClick = false
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(canLoop.value ? count.value - 1 : Math.max(0, count.value - slidesPerView.value))
    }
  }

  function scheduleNormalize() {
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(normalizeIfNeeded, 140)
  }

  function onScroll() {
    if (jumping || dragging) return
    syncFromScroll()
    scheduleNormalize()
  }

  async function snapToCurrent() {
    await nextTick()
    jumpToAbs(offset.value + currentIndex.value)
  }

  watch(slidesPerView, () => {
    if (currentIndex.value >= count.value) currentIndex.value = 0
    snapToCurrent()
  })

  onMounted(async () => {
    updateSlidesPerView()
    await nextTick()
    jumpToAbs(offset.value)
    window.addEventListener('resize', onResize)
    viewport.value?.addEventListener('scroll', onScroll, { passive: true })
  })

  function onResize() {
    updateSlidesPerView()
  }

  onUnmounted(() => {
    if (scrollTimer) clearTimeout(scrollTimer)
    window.removeEventListener('resize', onResize)
    viewport.value?.removeEventListener('scroll', onScroll)
  })

  return {
    viewport,
    currentIndex,
    slides,
    dots,
    canLoop,
    goTo,
    next,
    prev,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
    onKeydown,
  }
}
