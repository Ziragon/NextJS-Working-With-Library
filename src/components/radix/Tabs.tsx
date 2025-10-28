'use client';
import { useState, useEffect } from 'react';

type TabItem = {
    id: string | number;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
};

interface TabsProps {
    tabs: TabItem[];
    onTabChange?: (id: string | number) => void;
}

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
    const [activeTabId, setActiveTabId] = useState<string | number | null>(null);

    // Установка активной вкладки при инициализации и изменении tabs
    useEffect(() => {
        if (tabs.length > 0 && activeTabId === null) {
            const firstEnabledTab = tabs.find(tab => !tab.disabled);
            if (firstEnabledTab) {
                setActiveTabId(firstEnabledTab.id);
            }
        }
    }, [tabs, activeTabId]);

    const handleTabClick = (id: string | number) => {
        const tab = tabs.find(t => t.id === id);
        if (tab && !tab.disabled) {
            setActiveTabId(id);
            onTabChange?.(id);
        }
    };

    const activeTab = tabs.find(tab => tab.id === activeTabId);

    return (
        <div className="w-full">
            {/* Заголовки вкладок */}
            <div className="flex border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`
              px-4 py-2 font-medium text-sm
              ${tab.disabled
                            ? 'text-gray-500 cursor-not-allowed'
                            : activeTabId === tab.id
                                ? 'text-[#1fb583] border-b-2 border-[#1fb583]'
                                : 'text-gray-200 hover:text-[#19805b]'
                        }
            `}
                        onClick={() => handleTabClick(tab.id)}
                        disabled={tab.disabled}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {activeTab && activeTab.content}
            </div>
        </div>
    );
};