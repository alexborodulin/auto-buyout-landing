interface SwipeHandlers {
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

/**
 * Горизонтальный свайп для слайдеров. Игнорирует преимущественно
 * вертикальные жесты, чтобы не мешать прокрутке страницы.
 */
export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const THRESHOLD = 40

  let startX = 0
  let startY = 0
  let tracking = false

  function onTouchStart(e: TouchEvent) {
    const touch = e.changedTouches[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
    tracking = true
  }

  function onTouchEnd(e: TouchEvent) {
    if (!tracking) return
    tracking = false

    const touch = e.changedTouches[0]
    if (!touch) return

    const dx = touch.clientX - startX
    const dy = touch.clientY - startY

    if (Math.abs(dx) < THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return

    if (dx < 0) onSwipeLeft()
    else onSwipeRight()
  }

  return {
    onTouchStart,
    onTouchEnd,
  }
}
