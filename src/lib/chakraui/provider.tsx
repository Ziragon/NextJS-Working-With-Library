// components/provider.tsx
"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/lib/system"
import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "./color-mode"
import { GlobalStyles } from "../../components/chakraui/GlobalStyles"

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props}>
                <GlobalStyles />
                {props.children}
            </ColorModeProvider>
        </ChakraProvider>
    )
}