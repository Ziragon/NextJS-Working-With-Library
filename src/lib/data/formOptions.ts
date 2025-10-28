import {Dayjs} from "dayjs";
import {FormInstance} from "antd/lib/form";

export const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
];

export const categoryOptions = [
    { value: 'development', label: 'Разработка' },
    { value: 'design', label: 'Дизайн' },
    { value: 'marketing', label: 'Маркетинг' },
    { value: 'other', label: 'Другое' },
];

export interface ProjectFormValues {
    title: string;
    description: string;
    priority: string;
    categories: string[];
    deadline: Dayjs | null;
    budget: number;
}

export interface ProjectFormProps {
    onFinish: (values: ProjectFormValues) => Promise<void>;
    loading: boolean;
    form: FormInstance<ProjectFormValues>;
}