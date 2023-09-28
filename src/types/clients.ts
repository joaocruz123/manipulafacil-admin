import { Moment } from 'moment'

export interface HeadCellClients {
  id: keyof ClientData;
  label: string;
}

export interface ClientData {
  fullName: string;
  cpf: string;
  countBudget: number;
  countOrder: number;
  active: boolean;
  actions: string;
}

export interface HeadCell {
  id: keyof Addresses;
  label: string;
}

export interface Addresses {
  nickname: string;
  cep: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  actions: string;
}


export type FormValuesAddress = {
  cep: string;
  street: string;
  complement: string;
  neighborhood: string;
  number: string;
  city: any;
  state: any;
  nickname: string;
  principal: boolean
}

export type FormValues = {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: Moment;
}