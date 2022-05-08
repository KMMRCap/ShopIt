import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addItemToCart = createAsyncThunk(
    'addItemToCart',
    async ({ id, quantity }) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`)
            return {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity
            }
        }
        catch (err) {
            throw err
        }
    }
)

export const removeItemFromCart = createAsyncThunk(
    'removeItemFromCart',
    async ({ id }) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`)
            return data.product._id
        }
        catch (err) {
            throw err
        }
    }
)

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        loading: false,
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            :
            [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo'))
            :
            {}
    },
    reducers: {
        saveShippingInfo(state, action) {
            state.shippingInfo = action.payload
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
        },
        clearCartItems(state) {
            state.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify([]))
        }
    },
    extraReducers: {
        [addItemToCart.pending]: (state) => {
            state.loading = true
        },
        [addItemToCart.fulfilled]: (state, action) => {
            state.loading = false
            const item = action.payload
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if (isItemExist) {
                isItemExist.quantity = action.payload.quantity
            }
            else {
                state.cartItems.push(item)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        [addItemToCart.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------------------
        [removeItemFromCart.pending]: (state) => {
            state.loading = true
        },
        [removeItemFromCart.fulfilled]: (state, action) => {
            state.loading = false
            state.cartItems = state.cartItems.filter(i => i.product !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        [removeItemFromCart.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { saveShippingInfo, clearCartItems } = cartSlice.actions
export default cartSlice.reducer