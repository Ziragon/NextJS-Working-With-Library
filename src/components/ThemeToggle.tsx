// components/ThemeToggle.tsx
import { useColorMode } from "@/components/color-mode"
import { Button, Box } from "@chakra-ui/react"

export const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Button
            onClick={toggleColorMode}
            bg={colorMode === "light" ? "gray.800" : "white"}
            color={colorMode === "light" ? "white" : "gray.900"}
            _hover={{
                bg: colorMode === "light" ? "gray.700" : "gray.100"
            }}
            _active={{
                bg: colorMode === "light" ? "gray.600" : "gray.200"
            }}
            px={6}
            py={3}
            borderRadius="full"
            fontWeight="semibold"
            transition="all 0.3s ease"
            boxShadow="md"
            border={colorMode === "light" ? "none" : "1px solid"}
            borderColor={colorMode === "light" ? "transparent" : "gray.300"}
        >
            <Box display="flex" alignItems="center" gap={2}>
        <span>
          {colorMode === "light" ? "🌙" : "☀️"}
        </span>
                <span>
          {colorMode === "light" ? "Темная тема" : "Светлая тема"}
        </span>
            </Box>
        </Button>
    )
}