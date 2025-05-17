export const refreshTbale = (inventoryKeyRef, resetTimerFn) => {
  inventoryKeyRef.value++ // Force re-render
  resetTimerFn()
}

export const resetTimer = (intervalIdRef, refreshTableFn, refreshIntervalSecondsRef) => {
  if (intervalIdRef.value) clearInterval(intervalIdRef.value)
  intervalIdRef.value = setInterval(() => {
    refreshTableFn()
  }, refreshIntervalSecondsRef.value * 1000)
}
