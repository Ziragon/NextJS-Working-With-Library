"use client";

import React, { useState } from 'react';
import { Form, ConfigProvider, theme } from 'antd';
import ProjectForm from '@/components/antdesign/ProjectForm';
import { ProjectFormValues } from '@/lib/data/formOptions'

const ProjectFormPage: React.FC = () => {
    const [form] = Form.useForm<ProjectFormValues>();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: ProjectFormValues) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const transformedValues = {
                ...values,
                deadline: values.deadline ? values.deadline.toDate() : null,
            };

            console.log('Данные формы:', transformedValues);

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
                    colorPrimary: '#1fb583',
                },
            }}
        >
            <div
                style={{
                    padding: '20px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    minHeight: '100vh',
                    color: '#fff',
                }}
            >
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