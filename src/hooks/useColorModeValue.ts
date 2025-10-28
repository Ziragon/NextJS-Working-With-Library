import { useColorMode } from "@/lib/chakraui/color-mode"

export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
    const { colorMode } = useColorMode()
    return colorMode === "light" ? lightValue : darkValue
}