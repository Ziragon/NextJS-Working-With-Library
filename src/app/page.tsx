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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/*<CustomButton variant="primary" size="large" >Primary</CustomButton>*/}
        {/*<CustomButton variant="secondary">Secondary</CustomButton>*/}
        {/*  <CustomButton variant="danger" loading={isLoading} onClick={handleClick}>*/}
        {/*      Click Me*/}
        {/*  </CustomButton>*/}
        {/*<CustomButton disabled>Disabled</CustomButton>*/}
          <UserTable />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Хай бич</p>
      </footer>
    </div>
  );
}
