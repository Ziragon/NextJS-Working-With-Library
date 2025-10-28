// components/ProjectForm.tsx
"use client";

import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import dayjs, { Dayjs } from 'dayjs';
import CustomButton from "./CustomButton";

// Интерфейс для данных формы
interface ProjectFormValues {
    title: string;
    description: string;
    priority: string;
    categories: string[];
    deadline: Dayjs | null;
    budget: number;
}

// Опции для приоритета
const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
];

// Опции для категорий
const categoryOptions = [
    { value: 'development', label: 'Разработка' },
    { value: 'design', label: 'Дизайн' },
    { value: 'marketing', label: 'Маркетинг' },
    { value: 'other', label: 'Другое' },
];

interface ProjectFormProps {
    onFinish: (values: ProjectFormValues) => Promise<void>;
    loading: boolean;
    form: FormInstance<ProjectFormValues>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onFinish, loading, form }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ priority: 'medium', categories: [], budget: 0 }}
        >
            {/* Название */}
            <Form.Item
                name="title"
                label="Название"
                rules={[
                    { required: true, message: 'Введите название проекта!' },
                    { min: 3, message: 'Название должно быть не короче 3 символов!' },
                ]}
            >
                <Input placeholder="Введите название" />
            </Form.Item>

            {/* Описание */}
            <Form.Item
                name="description"
                label="Описание"
                rules={[
                    { required: true, message: 'Введите описание!' },
                    { max: 500, message: 'Описание не должно превышать 500 символов!' },
                ]}
            >
                <Input.TextArea rows={4} placeholder="Введите описание" />
            </Form.Item>

            {/* Приоритет */}
            <Form.Item
                name="priority"
                label="Приоритет"
                rules={[{ required: true, message: 'Выберите приоритет!' }]}
            >
                <Select options={priorityOptions} placeholder="Выберите приоритет" />
            </Form.Item>

            {/* Категории */}
            <Form.Item
                name="categories"
                label="Категории"
                rules={[{ required: true, message: 'Выберите хотя бы одну категорию!' }]}
            >
                <Select mode="multiple" options={categoryOptions} placeholder="Выберите категории" />
            </Form.Item>

            {/* Дедлайн */}
            <Form.Item
                name="deadline"
                label="Дедлайн"
                rules={[
                    { required: true, message: 'Выберите дату дедлайна!' },
                    {
                        validator: (_, value: Dayjs) => {
                            if (value && value.isBefore(dayjs(), 'day')) {
                                return Promise.reject(new Error('Дедлайн не может быть в прошлом!'));
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <DatePicker style={{ width: '100%' }} placeholder="Выберите дату" />
            </Form.Item>

            {/* Бюджет */}
            <Form.Item
                name="budget"
                label="Бюджет"
                rules={[
                    { required: true, message: 'Введите бюджет!' },
                    {
                        type: 'number',
                        min: 0,
                        message: 'Бюджет не может быть отрицательным!',
                    },
                ]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Введите бюджет" />
            </Form.Item>

            {/* Кнопка отправки */}
            <Form.Item>
                <CustomButton
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                    style={{ width: '100%' }}
                >
                    {loading ? 'Создание проекта...' : 'Создать проект'}
                </CustomButton>
            </Form.Item>
        </Form>
    );
};

export default ProjectForm;