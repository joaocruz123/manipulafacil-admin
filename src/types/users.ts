import { Moment } from "moment";

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
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
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