import { useCallback, useInsertionEffect, useRef } from "react"

export function useEffectEvent(
  callback,
) {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.")
  })

  useInsertionEffect(() => {
    callbackRef.current = callback
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args) => callbackRef.current(...args), [])
}