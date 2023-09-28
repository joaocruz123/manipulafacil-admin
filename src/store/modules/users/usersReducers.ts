import { actionTypes } from '.'
import { RootState } from '@/store'

type ProfileTypes = {
  id: string;
  name: string;
  code: string;
  applicationId: string;
  active: boolean;
  roles: Object[] | undefined;
}

type PagingTypes = {
  currentRecord: number,
  currentPage: number,
  pageSize: number,
  recordsOnPage: number,
  totalRecords: number,
  totalPages: number
}

type ResultTypes = {
  id: string,
  externalId: string,
  email: string,
  fullName: string,
  cpfCnpj: string,
  mobilePhone: string,
  birthDate: string,
  pharmacyId: string | null,
  active: boolean,
  profile: ProfileTypes,
  profileId: string,
  pendingTermsOfUse: string | null
}

type State = {
  users: {
    success: boolean,
    errors: boolean,
    paging: PagingTypes,
    result: ResultTypes[]
  }
}

const initialState: State = {
  users: {
    success: false,
    errors: false,
    result: [],
    paging: {
      currentRecord: 0,
      currentPage: 0,
      pageSize: 0,
      recordsOnPage: 0,
      totalRecords: 0,
      totalPages: 0
    }
  }
}

const UsersReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS: {
      return {
        ...state,
        users: { ...action.payload }
      }
    }
    // case actionTypes.SET_STUDENTS_PAGINATION: {
    //   return {
    //     ...state,
    //     pagination: action.payload
    //   }
    // }
    // case actionTypes.SET_ALL_PROFILES: {
    //   return {
    //     ...state,
    //     profiles: action.payload
    //   }
    // }

    default: {
      return state
    }
  }
}

export default UsersReducer
export const UserReducerState = (state: RootState) => state.accounts
