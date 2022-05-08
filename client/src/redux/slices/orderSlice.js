import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk(
    'createOrder',
    async ({ order }) => {
        try {
            const { data } = await axios.post('/api/v1/orders/new', order)
            return data

        }
        catch (err) {
            throw err
        }
    }
)

export const myOrders = createAsyncThunk(
    'myOrder',
    async () => {
        try {
            const { data } = await axios.get('/api/v1/orders/me')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getOrderDetails = createAsyncThunk(
    'getOrderDetails',
    async ({ id }) => {
        try {
            const { data } = await axios.get(`/api/v1/order/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'getAllOrders',
    async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/orders')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const updateOrder = createAsyncThunk(
    'updateOrder',
    async ({ id, status }) => {
        try {
            const { data } = await axios.put(`/api/v1/admin/order/${id}`, {status})
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'deleteOrder',
    async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        loading: false,
        order: {},
        orders: [],
        adminOrders: [],
        totalAmount: null
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.loading = true
        },
        [createOrder.fulfilled]: (state) => {
            state.loading = false
        },
        [createOrder.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [myOrders.pending]: (state) => {
            state.loading = true
        },
        [myOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.orders = action.payload.orders
        },
        [myOrders.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [getOrderDetails.pending]: (state) => {
            state.loading = true
        },
        [getOrderDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.order = action.payload.order
        },
        [getOrderDetails.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [getAllOrders.pending]: (state) => {
            state.loading = true
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.adminOrders = action.payload.orders
            state.totalAmount = action.payload.totalAmount
        },
        [getAllOrders.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [updateOrder.pending]: (state) => {
            state.loading = true
        },
        [updateOrder.fulfilled]: (state) => {
            state.loading = false
        },
        [updateOrder.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [deleteOrder.pending]: (state) => {
            state.loading = true
        },
        [deleteOrder.fulfilled]: (state) => {
            state.loading = false
        },
        [deleteOrder.rejected]: (state) => {
            state.loading = false
        }
    }
})

export default orderSlice.reducer