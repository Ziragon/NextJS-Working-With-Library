'use client';

import { useEffect } from 'react';
import { Dialog, Select, Button, HStack, Input, IconButton, Field } from '@chakra-ui/react';
import { useColorModeValue } from "@/hooks/useColorModeValue";
import { X } from 'lucide-react';
import { createListCollection } from '@ark-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserFormData, UserRole, UserModalProps, Option } from '@/lib/data/modalTypes';

const roleOptions: readonly Option[] = [
    { label: 'Администратор', value: 'admin' },
    { label: 'Менеджер', value: 'manager' },
    { label: 'Пользователь', value: 'user' },
    { label: 'Гость', value: 'guest' },
] as const;

const roleCollection = createListCollection({ items: roleOptions });

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
    };

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const inputBg = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const hoverBg = useColorModeValue('gray.100', 'gray.600');
    const selectBg = useColorModeValue('white', 'gray.700');
    const selectContentBg = useColorModeValue('white', 'gray.700');
    const backdropBg = useColorModeValue('blackAlpha.200', 'blackAlpha.300');

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
            <Dialog.Backdrop bg={backdropBg} backdropFilter="blur(5px)" />
            <Dialog.Positioner>
                <Dialog.Content
                    bg={bgColor}
                    color={textColor}
                    maxW="md"
                    p={6}
                    borderRadius="md"
                    borderWidth={1}
                    borderColor={borderColor}
                    boxShadow="lg"
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
                            color={textColor}
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
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--colors-brand-500)' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText color="error.500">{errors.name?.message}</Field.ErrorText>
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
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--colors-brand-500)' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText color="error.500">{errors.email?.message}</Field.ErrorText>
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
                                                bg={selectBg}
                                                borderColor={borderColor}
                                                borderRadius="md"
                                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--colors-brand-500)' }}
                                            >
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Выберите роль" p={3} color={textColor} />
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator color={textColor} />
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content
                                                    bg={selectContentBg}
                                                    borderColor={borderColor}
                                                    p={1}
                                                    borderRadius="md"
                                                    boxShadow="md"
                                                >
                                                    {roleOptions.map((option) => (
                                                        <Select.Item
                                                            key={option.value}
                                                            item={option}
                                                            p={3}
                                                            mb={1}
                                                            borderRadius="sm"
                                                            _hover={{ bg: hoverBg }}
                                                            color={textColor}
                                                        >
                                                            <Select.ItemText>{option.label}</Select.ItemText>
                                                            <Select.ItemIndicator color="brand.500" />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Select.Root>
                                    )}
                                />
                                <Field.ErrorText color="error.500">{errors.role?.message}</Field.ErrorText>
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
                                            bg={inputBg}
                                            borderColor={borderColor}
                                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--colors-brand-500)' }}
                                            p={3}
                                        />
                                    )}
                                />
                                <Field.ErrorText color="error.500">{errors.department?.message}</Field.ErrorText>
                            </Field.Root>
                        </form>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <HStack gap={3}>
                            <Button
                                bg={useColorModeValue('gray.200', 'gray.600')}
                                color={useColorModeValue('gray.800', 'white')}
                                _hover={{
                                    bg: useColorModeValue('gray.300', 'gray.500')
                                }}
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
                                bg={useColorModeValue('gray.900', 'white')}
                                color={useColorModeValue('white', 'gray.900')}
                                _hover={{
                                    bg: useColorModeValue('gray.800', 'gray.100')
                                }}
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