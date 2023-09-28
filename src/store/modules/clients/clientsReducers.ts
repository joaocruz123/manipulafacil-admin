import { actionTypes } from '.'
import { RootState } from '@/store'

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
  fullName: string,
  cpfCnpj: string,
  countBudget: number,
  countOrder: number,
  active: boolean,
}

type StatesTypes = {
  id: string,
  uf: string,
  name: string,
  ibgeCode: string,
}

type CitiesTypes = {
  id: string,
  state: null | object,
  name: string,
  ibgeCode: string,
  stateId: string,
}

type State = {
  clients: {
    success: boolean,
    errors: boolean,
    paging: PagingTypes,
    result: ResultTypes[]
  },
  addresses: {
    success: boolean,
    errors: boolean,
    paging: PagingTypes,
    result: ResultTypes[]
  },
  states: {
    success: boolean,
    error: boolean,
    result: StatesTypes[],
  },
  cities: {
    success: boolean,
    error: boolean,
    result: CitiesTypes[],
  },
}

const initialState: State = {
  clients: {
    success: false,
    errors: false,
    result: [],
    paging: {
      currentRecord: 1,
      currentPage: 1,
      pageSize: 1,
      recordsOnPage: 1,
      totalRecords: 1,
      totalPages: 1
    }
  },
  addresses: {
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
  },
  states: {
    success: false,
    error: false,
    result: []
  },
  cities: {
    success: false,
    error: false,
    result: []
  }
}

const ClientsReducer = (state: State = initialState, action: any): State => {
  let newState = state
  switch (action.type) {
    case actionTypes.GET_ALL_CLIENTS: {
      newState = {
        ...state,
        clients: action.payload
      }

      break
    }

    case actionTypes.GET_ALL_ADDRESSES_ACCOUNTS: {
      return {
        ...state,
        addresses: action.payload
      }
    }

    case actionTypes.SET_LIST_STATE: {
      return {
        ...state,
        states: { ...action.payload }
      }
    }

    case actionTypes.SET_LIST_CITIES: {
      return {
        ...state,
        cities: { ...action.payload }
      }
    }
    
    default: {
      newState = state

      break
    }
  }

  return newState
}

export default ClientsReducer
export const ClientState = (state: RootState) => state.clients
