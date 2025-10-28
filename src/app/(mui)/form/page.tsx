// app/project-form/page.tsx
"use client";

import React, { useState } from 'react';
import { Form, ConfigProvider, theme } from 'antd';
import { FormInstance } from 'antd/lib/form';
import dayjs, { Dayjs } from 'dayjs';
import ProjectForm from '@/components/ProjectForm';

// Интерфейс для данных формы
interface ProjectFormValues {
    title: string;
    description: string;
    priority: string;
    categories: string[];
    deadline: Dayjs | null;
    budget: number;
}

const ProjectFormPage: React.FC = () => {
    const [form] = Form.useForm<ProjectFormValues>();
    const [loading, setLoading] = useState(false);

    // Обработчик отправки формы
    const onFinish = async (values: ProjectFormValues) => {
        setLoading(true);
        try {
            // Имитация запроса к серверу
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Преобразование даты в нативный Date
            const transformedValues = {
                ...values,
                deadline: values.deadline ? values.deadline.toDate() : null,
            };

            console.log('Данные формы:', transformedValues);

            // Здесь можно добавить логику отправки данных на сервер
            // await api.createProject(transformedValues);

            // Сброс формы после успешной отправки
            form.resetFields();
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#1890ff',
                },
            }}
        >
            <div
                style={{
                    padding: '20px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    backgroundColor: '#131313',
                    minHeight: '100vh',
                    color: '#fff',
                }}
            >
                <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Создание проекта</h1>

                <ProjectForm
                    onFinish={onFinish}
                    loading={loading}
                    form={form}
                />
            </div>
        </ConfigProvider>
    );
};

export default ProjectFormPage;