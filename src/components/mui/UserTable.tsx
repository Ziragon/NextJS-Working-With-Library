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
    { id: 1, name: 'Nikita Buyanov', email: 'почта@класс', roles: ['Admin', 'Editor'], status: true },
    { id: 2, name: 'Алексей Шевцов', email: 'help@ya.ru', roles: ['User'], status: false },
    { id: 3, name: 'помогите', email: 'help@ya.ru', roles: ['Admin', 'Editor'], status: true },
    { id: 4, name: 'ааааааааа', email: 'help@ya.ru', roles: ['User', 'Editor'], status: false },
    { id: 5, name: 'ааааааааа', email: 'help@ya.ru', roles: ['Admin', 'Editor'], status: true },
];

const UserTable: React.FC = () => {
    const [rows, setRows] = useState<User[]>(initialRows);

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
        type: 'include',
        ids: new Set<GridRowId>(),
    });

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
                        event.stopPropagation();
                        handleStatusChange(params.row.id, event.target.checked);
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

    const handleStatusChange = (userId: number, newStatus: boolean) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === userId ? { ...row, status: newStatus } : row
            )
        );
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
                disableRowSelectionOnClick={true}
            />
        </div>
    );
};

export default UserTable;