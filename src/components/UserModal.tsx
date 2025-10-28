// components/UserModal.tsx
'use client';

import { useEffect } from 'react';
import { Dialog, Select, Button, HStack, Input, IconButton, Field } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { createListCollection } from '@ark-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserFormData, UserRole, UserModalProps } from '@/lib/data/types';

interface Option {
    label: string;
    value: string;
}

const roleOptions: readonly Option[] = [
    { label: 'Администратор', value: 'admin' },
    { label: 'Менеджер', value: 'manager' },
    { label: 'Пользователь', value: 'user' },
    { label: 'Гость', value: 'guest' },
] as const;

const roleCollection = createListCollection({ items: roleOptions });

// Схема валидации
const userSchema = yup.object<UserFormData>().shape({
    name: yup.string()
        .required('Имя обязательно для заполнения')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(50, 'Имя не может превышать 50 символов'),
    email: yup.string()
        .required('Email обязателен')
        .email('Введите корректный email'),
    role: yup.mixed<UserRole>()
        .required('Выберите роль')
        .oneOf(['admin', 'user', 'manager', 'guest'], 'Недопустимое значение роли'),
    department: yup.string()
        .required('Отдел обязателен')
        .min(2, 'Название отдела должно содержать минимум 2 символов'),
});

const UserModal: React.FC<UserModalProps> = ({
                                                 isOpen,
                                                 onClose,
                                                 onSubmit,
                                                 isLoading = false,
                                             }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormData>({
        resolver: yupResolver(userSchema),
        defaultValues: { name: '', email: '', role: 'user', department: '' },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const handleFormSubmit: SubmitHandler<UserFormData> = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(details) => {
                if (!details.open) {
                    onClose();
                }
            }}
            placement="center"
            preventScroll
            closeOnInteractOutside
            closeOnEscape
        >
            <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(5px)" />
            <Dialog.Positioner>
                <Dialog.Content
                    bg="gray.800"
                    color="white"
                    maxW="md"
                    p={6}
                    borderRadius="md"
                >
                    <Dialog.Header fontSize="xl" fontWeight="bold">
                        <Dialog.Title>Добавление нового пользователя</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CloseTrigger asChild>
                        <IconButton
                            aria-label="Close"
                            variant="ghost"
                            position="absolute"
                            top="2"
                            right="4"
                        >
                            <X />
                        </IconButton>
                    </Dialog.CloseTrigger>
                    <Dialog.Body pb={6} pt={4}>
                        <form id="user-form" onSubmit={handleSubmit(handleFormSubmit)}>
                            <Field.Root invalid={!!errors.name} mb={4}>
                                <Field.Label>Имя пользователя</Field.Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Введите имя"
                                            bg="gray.700"
                                            border="none"
                                            _focus={{ borderColor: 'blue.500' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.email} mb={4}>
                                <Field.Label>Email</Field.Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="user@example.com"
                                            type="email"
                                            bg="gray.700"
                                            border="none"
                                            _focus={{ borderColor: 'blue.500' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.role} mb={4}>
                                <Field.Label>Роль</Field.Label>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select.Root
                                            {...field}
                                            collection={roleCollection}
                                            value={[field.value]}
                                            onValueChange={(details) => field.onChange(details.value[0] as UserRole)}
                                            positioning={{ sameWidth: true }}
                                            multiple={false}
                                        >
                                            <Select.HiddenSelect />
                                            <Select.Control
                                                bg="gray.700"
                                                borderRadius="md"
                                            >
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Выберите роль" p={3}/>
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator />
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content
                                                    bg="gray.700"
                                                    border="none"
                                                    p={1}
                                                    borderRadius="md"
                                                >
                                                    {roleOptions.map((option) => (
                                                        <Select.Item
                                                            key={option.value}
                                                            item={option}
                                                            p={3}
                                                            mb={1}
                                                            borderRadius="sm"
                                                            _hover={{ bg: "gray.600" }}
                                                        >
                                                            <Select.ItemText>{option.label}</Select.ItemText>
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Select.Root>
                                    )}
                                />
                                <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.department} mb={4}>
                                <Field.Label>Отдел</Field.Label>
                                <Controller
                                    name="department"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Введите название отдела"
                                            bg="gray.700"
                                            border="none"
                                            _focus={{ borderColor: 'blue.500' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText>{errors.department?.message}</Field.ErrorText>
                            </Field.Root>
                        </form>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <HStack gap={3}>
                            <Button
                                bg="gray.600"
                                color="white"
                                _hover={{ bg: "gray.500" }}
                                onClick={onClose}
                                disabled={isLoading}
                                px={4}
                                py={2}
                                fontSize="md"
                                fontWeight="medium"
                                borderRadius="md"
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                form="user-form"
                                bg="blue.600"
                                color="white"
                                _hover={{ bg: "blue.500" }}
                                loading={isLoading}
                                loadingText="Сохранение..."
                                px={4}
                                py={2}
                                fontSize="md"
                                fontWeight="medium"
                                borderRadius="md"
                            >
                                Добавить пользователя
                            </Button>
                        </HStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default UserModal;