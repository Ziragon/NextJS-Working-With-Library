"use client";

import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    loadingText?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       variant = 'primary',
                                                       size = 'medium',
                                                       loading = false,
                                                       loadingText = 'Loading',
                                                       disabled,
                                                       children,
                                                       ...props
                                                   }) => {
    const theme = useTheme();

    const backgroundColor = theme.custom.buttonVariants[variant] || theme.custom.buttonVariants.primary;

    return (
        <Button
            {...props}
            size={size}
            disabled={disabled || loading}
            color="inherit"
            sx={{
                ...props.sx,
                backgroundColor,
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: theme.palette.augmentColor({
                        color: { main: backgroundColor },
                    }).dark,
                },
                '&:disabled': {
                    backgroundColor: '#455A64',
                    color: '#ffffff',
                    opacity: 0.6,
                },
            }}
        >
            {loading ? (
                <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default CustomButton;