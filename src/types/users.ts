import { MouseEvent, ChangeEvent } from 'react'
import { Moment } from 'moment'

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

export interface Data {
    name: string;
    cpf: string;
    profile: string;
    register: string;
    financial: string;
    requests: string;
    called: string;
    key: any;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    // eslint-disable-next-line
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
    // eslint-disable-next-line
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export type FormValues = {
    fullName: string;
    cpf: string;
    email: string;
    phone: string;
    perfil: string;
    birthDate: Moment;
}