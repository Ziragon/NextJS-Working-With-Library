// app/(mui)/layout.tsx
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { theme as muiTheme } from '@/theme';

export default function MuiLayout({
                                      children,
                                  }: {
    children: React.ReactNode
}) {
    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}