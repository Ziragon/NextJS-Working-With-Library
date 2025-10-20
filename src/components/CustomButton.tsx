"use client";

import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       variant = 'primary',
                                                       size = 'medium',
                                                       loading = false,
                                                       disabled,
                                                       children,
                                                       ...props
                                                   }) => {
    const theme = useTheme();

    const backgroundColor = theme.custom.buttonVariants[variant];
    const textColor = variant === 'secondary' ? '#112b4a' : '#ffffff';

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
                    backgroundColor: `${backgroundColor}E6`,
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
                    Loading...
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default CustomButton;