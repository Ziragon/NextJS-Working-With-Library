// lib/data/types.ts
export type UserRole = 'admin' | 'user' | 'manager' | 'guest';

export interface UserFormData {
    name: string;
    email: string;
    role: UserRole;
    department: string;
}

export interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
    isLoading?: boolean;
}