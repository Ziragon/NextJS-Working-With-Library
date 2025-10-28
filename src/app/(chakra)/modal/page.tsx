'use client';

import { Box, Heading, Button, VStack} from '@chakra-ui/react';
import { ThemeToggle } from '@/components/chakraui/ThemeToggle';
import { useModal } from '@/hooks/useModal';
import UserModal from '@/components/chakraui/UserModal';
import { useColorModeValue } from "@/hooks/useColorModeValue";
import { UserFormData } from "@/lib/data/modalTypes"; // ⬅️ Не забудь импорт типа

const ThemeDemo = () => {
    const { isOpen, onOpen, onClose } = useModal();

    const handleSubmit = (data: UserFormData) => { // ⬅️ Исправленная типизация
        console.log('Данные:', data);
        onClose();
    };

    return (
        <Box
            minH="100vh"
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.800', 'white')}
            p={8}
        >
            <VStack maxW="2xl" mx="auto">
                <VStack
                    p={8}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded="xl"
                    borderWidth={1}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                    <Box textAlign="center">
                        <Heading size="lg" mb={4}>
                            Управление темой
                        </Heading>
                        <ThemeToggle />
                    </Box>

                    <Box textAlign="center">
                        <Button
                            bg={useColorModeValue('gray.900', 'white')} // ⬅️ Темный в светлой теме, белый в темной
                            color={useColorModeValue('white', 'gray.900')} // ⬅️ Белый в светлой теме, темный в темной
                            _hover={{
                                bg: useColorModeValue('gray.800', 'gray.100') // ⬅️ Соответствующие ховеры
                            }}
                            _active={{
                                bg: useColorModeValue('gray.700', 'gray.200')
                            }}
                            px={4}
                            py={2}
                            fontSize="md"
                            fontWeight="medium"
                            borderRadius="md"
                            onClick={onOpen}
                        >
                            Открыть модальное окно
                        </Button>
                    </Box>
                </VStack>
            </VStack>

            <UserModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
        </Box>
    );
};

export default ThemeDemo;