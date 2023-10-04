import { Moment } from 'moment'

export interface HeadCellProfiles {
  id: keyof ProfilesData;
  label: string;
}

export interface ProfilesData {
  name: string;
  budget: string;
  clients: string;
  financial: string;
  users: string;
  administrative: string;
  log: string;
  active: boolean;
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