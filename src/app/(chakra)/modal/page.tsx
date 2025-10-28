// app/modal/page.tsx
'use client';

import { Box, Heading, Text, Button, VStack} from '@chakra-ui/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useModal } from '@/hooks/useModal';
import UserModal from '@/components/UserModal';
import {useColorModeValue} from "@/hooks/useColorModeValue";

const ThemeDemo = () => {
    const { isOpen, onOpen, onClose } = useModal();

    const handleSubmit = (data: any) => {
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
                <Box textAlign="center">
                    <Heading
                        size="2xl"
                        mb={2}
                        color={useColorModeValue('gray.900', 'white')}
                    >
                        Демонстрация темы
                    </Heading>
                </Box>

                {/* Основное содержимое */}
                <VStack
                    p={8}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded="xl"
                    shadow="lg"
                    borderWidth={1}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                    <Box textAlign="center">
                        <Heading size="lg" mb={4}>
                            Управление темой
                        </Heading>
                        <Text mb={6}>
                            Переключайте между светлой и темной темой
                        </Text>
                        <ThemeToggle />
                    </Box>

                    <Box textAlign="center">
                        <Button
                            size="lg"
                            bg="blue.600"
                            color="white"
                            _hover={{ bg: "blue.500" }}
                            _active={{ bg: "blue.700" }}
                            transition="all 0.2s"
                            px={8}
                            py={3}
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