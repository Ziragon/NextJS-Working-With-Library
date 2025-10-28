"use client";

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Line, Pie, Column } from '@ant-design/charts';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LineChartData, PieChartData, ColumnChartData, StatCardData } from '@/lib/data/dashboardTypes';

export const lineChartData: LineChartData[] = [
    { date: '2023-01', value: 100, category: 'Продажи' },
    { date: '2023-02', value: 120, category: 'Продажи' },
    { date: '2023-03', value: 150, category: 'Продажи' },
    { date: '2023-04', value: 80, category: 'Продажи' },
    { date: '2023-05', value: 70, category: 'Продажи' },
    { date: '2023-06', value: 110, category: 'Продажи' },
    { date: '2023-01', value: 50, category: 'Посещения' },
    { date: '2023-02', value: 60, category: 'Посещения' },
    { date: '2023-03', value: 70, category: 'Посещения' },
    { date: '2023-04', value: 90, category: 'Посещения' },
    { date: '2023-05', value: 100, category: 'Посещения' },
    { date: '2023-06', value: 120, category: 'Посещения' },
];

export const pieChartData: PieChartData[] = [
    { type: 'Технологии', value: 35 },
    { type: 'Финансы', value: 25 },
    { type: 'Здравоохранение', value: 20 },
    { type: 'Розничная торговля', value: 15 },
    { type: 'Другое', value: 5 },
];

export const columnChartData: ColumnChartData[] = [
    { month: 'Янв', value: 30 },
    { month: 'Фев', value: 40 },
    { month: 'Мар', value: 35 },
    { month: 'Апр', value: 50 },
    { month: 'Май', value: 45 },
    { month: 'Июн', value: 60 },
];

export const statCardData: StatCardData[] = [
    { title: 'Общие продажи', value: 12340, change: 12.5, icon: <ArrowUpOutlined /> },
    { title: 'Новые пользователи', value: 2456, change: 8.2, icon: <ArrowUpOutlined /> },
    { title: 'Отказы', value: 3.2, change: -2.1, icon: <ArrowDownOutlined /> },
    { title: 'Конверсия', value: 4.8, change: 1.7, icon: <ArrowUpOutlined /> },
];

const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
    const { title, value, change, icon } = data;
    const isPositive = change >= 0;

    return (
        <Card
            styles={{
                body: {
                    backgroundColor: '#1f1f1f',
                    padding: '16px',
                },
            }}
            style={{
                backgroundColor: '#1f1f1f',
                border: '1px solid #303030',
            }}
        >
            <Statistic
                title={title}
                value={value}
                precision={1}
                valueStyle={{ color: isPositive ? '#52c41a' : '#ff4d4f' }}
                prefix={icon}
                suffix={
                    <span style={{ fontSize: 14 }}>
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        {Math.abs(change)}%
          </span>
                }
            />
        </Card>
    );
};

const lineConfig = {
    data: lineChartData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    animation: {
        appear: {
            animation: 'path-in',
            duration: 3000,
        },
    },
    legend: {
        position: 'top' as const,
        itemName: {
            style: {
                fill: '#ffffff',
            },
        },
    },
    point: {
        size: 5,
        shape: 'circle' as const,
    },
    theme: 'dark' as const,
    xAxis: {
        line: {
            style: {
                stroke: '#434343',
            },
        },
        tickLine: {
            style: {
                stroke: '#434343',
            },
        },
        label: {
            style: {
                fill: '#ffffff',
            },
        },
    },
    yAxis: {
        line: {
            style: {
                stroke: '#434343',
            },
        },
        tickLine: {
            style: {
                stroke: '#434343',
            },
        },
        label: {
            style: {
                fill: '#ffffff',
            },
        },
        grid: {
            line: {
                style: {
                    stroke: '#303030',
                },
            },
        },
    },
};

const pieConfig = {
    data: pieChartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: false,
    interactions: [{ type: 'element-active' as const }],
    legend: {
        position: 'right' as const,
        itemName: {
            style: {
                fill: '#ffffff',
            },
        },
    },
    theme: 'dark' as const,
};

const columnConfig = {
    data: columnChartData,
    xField: 'month',
    yField: 'value',
    columnWidthRatio: 0.6,
    label: false,
    xAxis: {
        line: {
            style: {
                stroke: '#434343',
            },
        },
        tickLine: {
            style: {
                stroke: '#434343',
            },
        },
        label: {
            style: {
                fill: '#ffffff',
            },
        },
    },
    yAxis: {
        line: {
            style: {
                stroke: '#434343',
            },
        },
        tickLine: {
            style: {
                stroke: '#434343',
            },
        },
        label: {
            style: {
                fill: '#ffffff',
            },
        },
        grid: {
            line: {
                style: {
                    stroke: '#303030',
                },
            },
        },
    },
    meta: {
        month: {
            alias: 'Месяц',
        },
        value: {
            alias: 'Значение',
        },
    },
    theme: 'dark' as const,
};

const Dashboard: React.FC = () => {
    return (
        <>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                {statCardData.map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <StatCard data={stat} />
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card
                        title="Динамика показателей"
                        styles={{
                            header: {
                                color: '#ffffff',
                                borderBottom: '1px solid #303030',
                                backgroundColor: '#1f1f1f',
                            },
                            body: {
                                backgroundColor: '#1f1f1f',
                            },
                        }}
                        style={{
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #303030'
                        }}
                    >
                        <Line {...lineConfig} />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title="Распределение по категориям"
                        styles={{
                            header: {
                                color: '#ffffff',
                                borderBottom: '1px solid #303030',
                                backgroundColor: '#1f1f1f',
                            },
                            body: {
                                backgroundColor: '#1f1f1f',
                            },
                        }}
                        style={{
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #303030'
                        }}
                    >
                        <Pie {...pieConfig} />
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card
                        title="Ежемесячные показатели"
                        styles={{
                            header: {
                                color: '#ffffff',
                                borderBottom: '1px solid #303030',
                                backgroundColor: '#1f1f1f',
                            },
                            body: {
                                backgroundColor: '#1f1f1f',
                            },
                        }}
                        style={{
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #303030'
                        }}
                    >
                        <Column {...columnConfig} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;