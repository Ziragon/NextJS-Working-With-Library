type TabItem = {
    id: string | number;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
};

export interface TabsProps {
    tabs: TabItem[];
    onTabChange?: (id: string | number) => void;
}