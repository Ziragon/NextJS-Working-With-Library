'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridRowSelectionModel, GridRowId } from '@mui/x-data-grid';
import { Chip, Switch } from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    status: boolean;
}

const initialRows: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['Admin', 'Editor'], status: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['User'], status: false },
];

const UserTable: React.FC = () => {
    const [rows, setRows] = useState<User[]>(initialRows); // Состояние для rows

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set<GridRowId>(),
    });

    // Переносим columns внутрь компонента, чтобы renderCell имел доступ к setRows
    const columns: GridColDef<User>[] = [
        { field: 'id', headerName: 'ID', width: 90, type: 'number' },
        { field: 'name', headerName: 'Имя', width: 150, type: 'string' },
        { field: 'email', headerName: 'Email', width: 200, type: 'string' },
        {
            field: 'roles',
            headerName: 'Роли',
            width: 250,
            renderCell: (params: GridRenderCellParams<User, string[]>) => (
                <>
                    {params.value?.map((role, index) => (
                        <Chip
                            key={index}
                            label={role}
                            color={role === 'Admin' ? 'error' : 'primary'}
                            size="small"
                            sx={{ mr: 1 }}
                        />
                    ))}
                </>
            ),
        },
        {
            field: 'status',
            headerName: 'Статус',
            width: 120,
            type: 'boolean',
            renderCell: (params: GridRenderCellParams<User, boolean>) => (
                <Switch
                    checked={params.value ?? false}
                    onChange={(event) => {
                        event.stopPropagation(); // Предотвращаем всплытие события
                        const newStatus = event.target.checked;
                        setRows(prevRows =>
                            prevRows.map(row =>
                                row.id === params.row.id ? { ...row, status: newStatus } : row
                            )
                        );
                        console.log(`Статус для ID ${params.row.id} изменён на ${newStatus}`);
                    }}
                    onClick={(event) => {
                        event.stopPropagation(); // Дополнительная защита
                    }}
                    size="small"
                />
            ),
        },
    ];

    const handleRowSelectionChange = (newModel: GridRowSelectionModel) => {
        setRowSelectionModel(newModel);
        console.log('Выбранные строки:', newModel);
    };

    const handleRowClick = (params: GridRowParams<User>) => {
        console.log('Клик по строке:', params.row);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={handleRowSelectionChange}
                onRowClick={handleRowClick}
                disableRowSelectionOnClick={true} // Избегаем конфликтов с кликами
            />
        </div>
    );
};

export default UserTable;