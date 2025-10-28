import { Provider } from "@/lib/chakraui/provider";

export default function ChakraLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return <Provider>{children}</Provider>
}