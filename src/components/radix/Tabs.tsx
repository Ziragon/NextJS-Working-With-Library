'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TabItem = {
    id: string | number;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
};

interface TabsProps {
    tabs: TabItem[];
    onTabChange?: (id: string | number) => void;
    defaultTab?: string | number;
}

export const Tabs = ({ tabs, onTabChange, defaultTab }: TabsProps) => {
    const [activeTabId, setActiveTabId] = useState<string | number | null>(
        defaultTab || null
    );

    useEffect(() => {
        if (tabs.length > 0 && !activeTabId) {
            const firstEnabledTab = tabs.find(tab => !tab.disabled);
            if (firstEnabledTab) {
                setActiveTabId(firstEnabledTab.id);
            }
        }
    }, [activeTabId, tabs]);

    useEffect(() => {
        if (activeTabId) {
            const activeTab = tabs.find(tab => tab.id === activeTabId);
            if (activeTab?.disabled) {
                const firstEnabledTab = tabs.find(tab => !tab.disabled);
                setActiveTabId(firstEnabledTab?.id || null);
            }
        }
    }, [tabs, activeTabId]);

    const handleTabClick = (id: string | number) => {
        const tab = tabs.find(t => t.id === id) ;
        if (tab && !tab.disabled) {
            setActiveTabId(id);
            onTabChange?.(id);
        }
    };

    const activeTab = tabs.find(tab => tab.id === activeTabId);

    return (
        <div className="w-full">
            <div className="flex border-b border-gray-600">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={cn(
                            "px-4 py-2 font-medium text-sm transition-colors",
                            tab.disabled && "text-gray-500 cursor-not-allowed",
                            activeTabId === tab.id &&
                            "text-[#1fb583] border-b-2 border-[#1fb583]",
                            !tab.disabled &&
                            activeTabId !== tab.id &&
                            "text-gray-200 hover:text-[#19805b]"
                        )}
                        onClick={() => handleTabClick(tab.id)}
                        disabled={tab.disabled}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="mt-4 p-4">
                {activeTab ? activeTab.content : 'Нет доступных вкладок'}
            </div>
        </div>
    );
};