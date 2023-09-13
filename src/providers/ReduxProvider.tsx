'use client'

import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persist, store } from '../store'
import { Provider } from 'react-redux'

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      {children}
    </PersistGate>
  </Provider>)
}
