// components/color-mode.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type ColorMode = "light" | "dark"

type ColorModeContextType = {
    colorMode: ColorMode
    toggleColorMode: () => void
    setColorMode: (mode: ColorMode) => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export function useColorMode() {
    const context = useContext(ColorModeContext)
    if (context === undefined) {
        throw new Error("useColorMode must be used within a ColorModeProvider")
    }
    return context
}

export type ColorModeProviderProps = {
    children: ReactNode
    defaultMode?: ColorMode
}

export function ColorModeProvider({
                                      children,
                                      defaultMode = "light"
                                  }: ColorModeProviderProps) {
    const [colorMode, setColorModeState] = useState<ColorMode>(defaultMode)
    const [mounted, setMounted] = useState(false)

    // Эффект для синхронизации с localStorage после монтирования
    useEffect(() => {
        setMounted(true)
        const storedMode = localStorage.getItem("colorMode") as ColorMode | null
        if (storedMode) {
            setColorModeState(storedMode)
        } else {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (systemPrefersDark) {
                setColorModeState("dark")
            }
        }
    }, [])

    // Эффект для применения класса к body при изменении colorMode
    useEffect(() => {
        if (mounted) {
            const body = document.body
            if (colorMode === "dark") {
                body.classList.add("dark")
                body.style.backgroundColor = "#141414"
                body.style.color = "white"
            } else {
                body.classList.remove("dark")
                body.style.backgroundColor = "white"
                body.style.color = "#141414"
            }
            localStorage.setItem("colorMode", colorMode)
        }
    }, [colorMode, mounted])

    const toggleColorMode = () => {
        const newMode = colorMode === "light" ? "dark" : "light"
        setColorModeState(newMode)
    }

    const value = { colorMode, toggleColorMode, setColorMode: setColorModeState }

    return (
        <ColorModeContext.Provider value={value}>
            {children}
        </ColorModeContext.Provider>
    )
}