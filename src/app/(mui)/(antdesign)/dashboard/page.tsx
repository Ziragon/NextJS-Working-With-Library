"use client";

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import Dashboard from '@/components/antdesign/Dashboard';

const DashboardPage: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#177ddc',
                    colorBorderSecondary: '#303030',
                    colorText: '#ffffff',
                    colorTextSecondary: '#bfbfbf',
                },
                components: {
                    Card: {
                        colorBgContainer: '#1f1f1f',
                        colorBorderSecondary: '#303030',
                    },
                },
            }}
        >
            <div
                style={{
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