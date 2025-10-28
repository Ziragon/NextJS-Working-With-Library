// app/dashboard/page.tsx
"use client";

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import Dashboard from '@/components/Dashboard';

const DashboardPage: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#177ddc',
                    colorBgContainer: '#1f1f1f',
                    colorBorderSecondary: '#303030',
                    colorText: '#ffffff',
                    colorTextSecondary: '#bfbfbf',
                },
                components: {
                    Card: {
                        colorBgContainer: '#1f1f1f',
                        colorBorderSecondary: '#303030',
                    },
                    Statistic: {
                        contentColor: '#ffffff',
                    },
                },
            }}
        >
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#141414',
                    minHeight: '100vh',
                    color: '#ffffff'
                }}
            >
                <Dashboard />
            </div>
        </ConfigProvider>
    );
};

export default DashboardPage;