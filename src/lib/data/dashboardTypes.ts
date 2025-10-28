import React from "react";

export interface LineChartData {
    date: string;
    value: number;
    category: string;
}

export interface PieChartData {
    type: string;
    value: number;
}

export interface ColumnChartData {
    month: string;
    value: number;
}

export interface StatCardData {
    title: string;
    value: number;
    change: number;
    icon: React.ReactNode;
}