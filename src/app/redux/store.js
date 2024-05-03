import { configureStore } from '@reduxjs/toolkit'
import { commentApi } from './features/comment/commentApi'
import { userApi } from './features/user/userApi'

export const store = configureStore({
    reducer: {
        [commentApi.reducerPath]: commentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
      },
      middleware: (gDM) =>
        gDM().concat([
          commentApi.middleware,
          userApi.middleware
        ]),
})