import { useEffectEvent } from "./useEffectEvent"

export function useMergedRefs(...refs) {
    return useEffectEvent((node) => {
        for (const ref of refs) {
            if (typeof ref === "function") {
                ref(node)
            } else if (ref != null) {
                ref.current = node
            }
        }
    })
}