import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
        auth: authSlice,
        user: userSlice,
        cart: cartSlice,
        orders: orderSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})