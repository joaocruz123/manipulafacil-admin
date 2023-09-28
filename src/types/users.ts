import { Moment } from 'moment'
import { MouseEvent, ChangeEvent } from 'react'

export interface HeadCell {
  id: keyof UserData;
  label: string;
}

export interface UserData {
  fullName: string;
  cpf: string;
  email: string;
  mobilePhone: string;
  birthDate: Moment;
  actions: string;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line
  onRequestSort: (event: MouseEvent<unknown>, property: keyof UserData) => void;
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
  perfil: string;
  phone: string;
  birthDate: Moment;
}