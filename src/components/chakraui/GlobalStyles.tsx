import { useEffect } from "react"
import { useColorMode } from "@/lib/chakraui/color-mode"

export function GlobalStyles() {
    const { colorMode } = useColorMode()

    useEffect(() => {
        console.log("GlobalStyles: Применение стилей для темы", colorMode)
        const html = document.documentElement
        const body = document.body

        if (colorMode === "dark") {
            html.classList.add("dark")
            body.classList.add("dark")
            html.style.backgroundColor = "#141414"
            body.style.backgroundColor = "#141414"
            html.style.color = "white"
            body.style.color = "white"
        } else {
            html.classList.remove("dark")
            body.classList.remove("dark")
            html.style.backgroundColor = "white"
            body.style.backgroundColor = "white"
            html.style.color = "#1f2937"
            body.style.color = "#1f2937"
        }
    }, [colorMode])

    return null
}