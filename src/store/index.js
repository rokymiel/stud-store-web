import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
// import { useDispatch } from 'react-redux'

import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})
