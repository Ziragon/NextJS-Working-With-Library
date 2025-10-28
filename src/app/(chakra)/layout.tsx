import { Provider } from "@/components/provider";

export default function ChakraLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return <Provider>{children}</Provider>
}