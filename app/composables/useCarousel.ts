/**
 * Горизонтальный слайдер без клонов и зацикливания:
 * drag мышью, тач/тачпад, стрелки, клавиатура. Нет дублей id и лишних hit/reachGoal.
 */
export function useCarousel(itemCount: MaybeRefOrGetter<number>) {
  const viewport = ref<HTMLElement | null>(null)
  const currentIndex = ref(0)
  const slidesPerView = ref(1)

  const count = computed(() => Math.max(0, toValue(itemCount)))
  const maxIndex = computed(() => Math.max(0, count.value - slidesPerView.value))

  let dragging = false
  let suppressClick = false
  let startX = 0
  let startScroll = 0
  let activePointer: number | null = null

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

  function syncIndexFromScroll() {
    const el = viewport.value
    const width = slideWidth()
    if (!el || !width) return
    const next = Math.round(el.scrollLeft / width)
    currentIndex.value = Math.min(Math.max(next, 0), maxIndex.value)
  }

  function goTo(index: number, behavior: ScrollBehavior = 'smooth') {
    const el = viewport.value
    const width = slideWidth()
    if (!el || !width) return
    const next = Math.min(Math.max(index, 0), maxIndex.value)
    currentIndex.value = next
    el.scrollTo({ left: next * width, behavior })
  }

  function next() {
    goTo(currentIndex.value + 1)
  }

  function prev() {
    goTo(currentIndex.value - 1)
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const el = viewport.value
    if (!el) return
    dragging = true
    suppressClick = false
    activePointer = event.pointerId
    startX = event.clientX
    startScroll = el.scrollLeft
    el.setPointerCapture(event.pointerId)
    el.classList.add('is-dragging')
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || event.pointerId !== activePointer) return
    const el = viewport.value
    if (!el) return
    const dx = event.clientX - startX
    if (Math.abs(dx) > 6) suppressClick = true
    el.scrollLeft = startScroll - dx
  }

  function endDrag(event: PointerEvent) {
    if (!dragging || event.pointerId !== activePointer) return
    const el = viewport.value
    dragging = false
    activePointer = null
    el?.classList.remove('is-dragging')
    syncIndexFromScroll()
    goTo(currentIndex.value)
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
      goTo(maxIndex.value)
    }
  }

  function onScroll() {
    if (dragging) return
    syncIndexFromScroll()
  }

  function onResize() {
    updateSlidesPerView()
    goTo(Math.min(currentIndex.value, maxIndex.value), 'auto')
  }

  watch(maxIndex, (max) => {
    if (currentIndex.value > max) goTo(max, 'auto')
  })

  onMounted(() => {
    updateSlidesPerView()
    window.addEventListener('resize', onResize)
    viewport.value?.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    viewport.value?.removeEventListener('scroll', onScroll)
  })

  return {
    viewport,
    currentIndex,
    maxIndex,
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
