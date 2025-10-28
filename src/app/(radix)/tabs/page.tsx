'use client';

import { Tabs } from '@/components/radix/Tabs';

export default function TabsPage() {
    const tabsData = [
        {
            id: 'profile',
            title: 'Профиль',
            content: <div>Контент профиля пользователя</div>
        },
        {
            id: 'settings',
            title: 'Настройки',
            content: <div>Панель настроек аккаунта</div>
        },
        {
            id: 'billing',
            title: 'Биллинг',
            content: <div>Информация о платежах</div>,
            disabled: true
        },
        {
            id: 'notifications',
            title: 'Уведомления',
            content: <div>Настройки уведомлений</div>
        }
    ];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Демонстрация вкладок</h1>

            <Tabs
                tabs={tabsData}
                onTabChange={(id) => console.log('Активная вкладка:', id)}
            />
        </div>
    );
}