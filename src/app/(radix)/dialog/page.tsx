// app/radix-demo/page.tsx
'use client'

import { DialogComponent } from "@/components/radix/Dialog"
import { Dropdown } from "@/components/radix/Dropdown"

export default function RadixDemoPage() {
    return (
        <div className="min-h-screen">
            <div className="container">
                <h1 className="text-3xl font-bold mb-8 text-white">Radix UI + Tailwind CSS Demo</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Карточка с диалогом */}
                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-white">Dialog Component</h2>
                        <DialogComponent
                            trigger={
                                <button className="px-4 py-2 bg-neutral-600 text-white rounded-md hover:bg-neutral-700">
                                    Открыть диалог
                                </button>
                            }
                            title="Профиль пользователя"
                            description="Здесь вы можете управлять настройками профиля"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-neutral-300">Имя</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white"
                                        defaultValue="Иван Иванов"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-neutral-300">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white"
                                        defaultValue="ivan@example.com"
                                    />
                                </div>
                            </div>
                        </DialogComponent>
                    </div>

                    {/* Карточка с выпадающим меню */}
                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-white">Dropdown Menu</h2>
                        <Dropdown
                            trigger={
                                <button className="px-4 py-2 border border-neutral-600 rounded-md hover:bg-neutral-700 text-white">
                                    Меню пользователя ▼
                                </button>
                            }
                            items={[
                                {
                                    label: "Профиль",
                                    onClick: () => console.log("Профиль")
                                },
                                {
                                    label: "Настройки",
                                    onClick: () => console.log("Настройки")
                                },
                                {
                                    label: "Выйти",
                                    onClick: () => console.log("Выйти")
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}