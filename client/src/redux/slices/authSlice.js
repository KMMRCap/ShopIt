import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk(
    'login',
    async (userData) => {
        try {
            const { data } = await axios.post('/api/v1/login', userData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const register = createAsyncThunk(
    'register',
    async (formData) => {
        try {
            const { data } = await axios.post('/api/v1/register', formData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const loadUser = createAsyncThunk(
    'loadUser',
    async () => {
        try {
            const { data } = await axios.get('/api/v1/me')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async () => {
        try {
            await axios.get('/api/v1/logout')
        }
        catch (err) {
            throw err
        }
    }
)

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async () => {
        try { }
        catch (err) {
            throw err
        }
    }
)

const updateProfile = createAsyncThunk(
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

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        loading: false,
        user: null
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
        },
        [login.rejected]: (state) => {
            state.loading = false
            state.user = null
        },
        // -----------------------------------------------
        [register.pending]: (state) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
        },
        [register.rejected]: (state) => {
            state.loading = false
            state.user = null
        },
        // ----------------------------------------------
        [loadUser.pending]: (state) => {
            state.loading = true
        },
        [loadUser.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
        },
        [loadUser.rejected]: (state) => {
            state.loading = false
            state.user = null
        },
        // --------------------------------------------
        [logout.pending]: (state) => {
            state.loading = true
        },
        [logout.fulfilled]: (state) => {
            state.loading = false
            state.user = null
        },
        [logout.rejected]: (state) => {
            state.loading = false
            state.user = null
        },
        // -------------------------------------------
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
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateProfile.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default authSlice.reducer