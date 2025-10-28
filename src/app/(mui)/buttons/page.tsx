'use client';
import CustomButton from "@/components/CustomButton";
import UserTable from "@/components/UserTable";
import { useState } from 'react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
            <main className="flex flex-col gap-[32px] row-start-2 items-center">
                <div className="flex flex-row gap-8 items-center sm:items-start">
                    <CustomButton variant="primary" size="large" >Primary</CustomButton>
                    <CustomButton variant="secondary">Secondary</CustomButton>
                    <CustomButton variant="danger" loading={isLoading} onClick={handleClick}>
                        Click Me
                    </CustomButton>
                    <CustomButton disabled>Disabled</CustomButton>
                </div>
                <UserTable />
            </main>
        </div>
    );
}
