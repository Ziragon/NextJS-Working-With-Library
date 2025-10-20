'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            buttonVariants: {
                primary: string;
                secondary: string;
                danger: string;
            };
        };
    }
    interface ThemeOptions {
        custom?: {
            buttonVariants?: {
                primary?: string;
                secondary?: string;
                danger?: string;
            };
        };
    }
}

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'var(--font-geist), sans-serif',
    },
    custom: {
        buttonVariants: {
            primary: '#1fb583',
            secondary: '#19805b',
            danger: '#df455c',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root:{
                    textTransform: 'none',
                    minWidth: '120px',
                    '&:hover': {
                        opacity: 0.9,
                    },
                },
            },
        },
    },
};

export const theme = createTheme(themeOptions);