import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (passwords) => {
        try {
            const { data } = await axios.put('/api/v1/password/update', passwords)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async (userData) => {
        try {
            const { data } = await axios.put('/api/v1/me/update', userData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'forgetPassword',
    async (email) => {
        try {
            const { data } = await axios.post('/api/v1/password/forget', email)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const newPassword = createAsyncThunk(
    'newPassword',
    async ({ token, passwords }) => {
        try {
            const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'getAllUsers',
    async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/users')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'getUserDetails',
    async (id) => {
        try {
            const { data } = await axios.get(`/api/v1/admin/user/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const updateUser = createAsyncThunk(
    'updateUser',
    async ({ id, userData }) => {
        try {
            const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const deleteUser = createAsyncThunk(
    'deleteUser',
    async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/admin/user/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        loading: false,
        message: null,
        user: {},
        allUsers: []
    },
    extraReducers: {
        [updatePassword.pending]: (state) => {
            state.loading = true
        },
        [updatePassword.fulfilled]: (state) => {
            state.loading = false
        },
        [updatePassword.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [updateProfile.pending]: (state) => {
            state.loading = true
        },
        [updateProfile.fulfilled]: (state) => {
            state.loading = false
        },
        [updateProfile.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [forgetPassword.pending]: (state) => {
            state.loading = true
        },
        [forgetPassword.fulfilled]: (state, action) => {
            state.loading = false
            state.message = action.payload.message
        },
        [forgetPassword.rejected]: (state, action) => {
            state.loading = false
        },
        // -------------------------------------------
        [newPassword.pending]: (state) => {
            state.loading = true
        },
        [newPassword.fulfilled]: (state) => {
            state.loading = false
        },
        [newPassword.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [getAllUsers.pending]: (state) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.allUsers = action.payload.users
            state.user = {}
        },
        [getAllUsers.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [updateUser.pending]: (state) => {
            state.loading = true
        },
        [updateUser.fulfilled]: (state) => {
            state.loading = false
        },
        [updateUser.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state) => {
            state.loading = false
        },
        [deleteUser.rejected]: (state) => {
            state.loading = false
        },
        // -------------------------------------------
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
        },
        [getUserDetails.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default userSlice.reducer