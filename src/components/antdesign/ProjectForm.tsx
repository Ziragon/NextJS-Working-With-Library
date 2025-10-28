"use client";

import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import CustomButton from "../mui/CustomButton";
import { priorityOptions, ProjectFormProps, categoryOptions } from "@/lib/data/formOptions";

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

            <Form.Item
                name="description"
                label="Описание"
                rules={[
                    { required: true, message: 'Введите описание!' },
                    { max: 100, message: 'Описание не должно превышать 100 символов!' },
                ]}
            >
                <Input.TextArea rows={4} placeholder="Введите описание" />
            </Form.Item>

            <Form.Item
                name="priority"
                label="Приоритет"
                rules={[{ required: true, message: 'Выберите приоритет!' }]}
            >
                <Select options={priorityOptions} placeholder="Выберите приоритет" />
            </Form.Item>

            <Form.Item
                name="categories"
                label="Категории"
                rules={[{ required: true, message: 'Выберите хотя бы одну категорию!' }]}
            >
                <Select mode="multiple" options={categoryOptions} placeholder="Выберите категории" />
            </Form.Item>

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
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Выберите дату"
                    disabledDate={(current) => {
                        return current && current < dayjs().startOf('day');
                    }}
                />
            </Form.Item>

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

            <Form.Item>
                <CustomButton
                    type="submit"
                    variant="primary"
                    loading={loading}
                    loadingText={'Создание проекта...'}
                    style={{ width: '100%' }}
                >
                    Создать проект
                </CustomButton>
            </Form.Item>
        </Form>
    );
};

export default ProjectForm;