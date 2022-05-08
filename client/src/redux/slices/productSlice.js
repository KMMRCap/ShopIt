import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async ({ keyword = '', currentPage = 1, price, category, rating = 0 }) => {
        try {
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}
            &price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
            if (category) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}
                &price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
            }
            const { data } = await axios.get(link)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getProductDetails = createAsyncThunk(
    'getProductDetails',
    async (id) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const newReview = createAsyncThunk(
    'newReview',
    async (reviewData) => {
        try {
            const { data } = await axios.put('/api/v1/review', reviewData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getAdminProducts = createAsyncThunk(
    'getAdminProducts',
    async () => {
        try {
            const { data } = await axios.get('/api/v1/admin/products')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const newProduct = createAsyncThunk(
    'newProduct',
    async (productData) => {
        try {
            const { data } = await axios.post('/api/v1/admin/product/new', productData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',
    async ({ id, productData }) => {
        try {
            const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getProductReviews = createAsyncThunk(
    'getProductReviews',
    async (id) => {
        try {
            const { data } = await axios.get(`/api/v1/reviews?id=${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const deleteReview = createAsyncThunk(
    'deleteReview',
    async ({ id, productId }) => {
        try {
            const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        loading: false,
        productsCount: null,
        resPerPage: null,
        filteredProductsCount: null,
        products: [],
        product: {},
        adminProducts: [],
        reviews: []
    },
    reducers: {
        clearReviews(state) {
            state.reviews = []
        }
    },
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = true
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.productsCount = action.payload.productsCount
            state.resPerPage = action.payload.resPerPage
            state.filteredProductsCount = action.payload.filteredProductsCount
            state.product = {}
        },
        [getAllProducts.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [getProductDetails.pending]: (state) => {
            state.loading = true
        },
        [getProductDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.product = action.payload.product
        },
        [getProductDetails.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [newReview.pending]: (state) => {
            state.loading = true
        },
        [newReview.fulfilled]: (state) => {
            state.loading = false
        },
        [newReview.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [getAdminProducts.pending]: (state) => {
            state.loading = true
        },
        [getAdminProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.adminProducts = action.payload.products
        },
        [getAdminProducts.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [newProduct.pending]: (state) => {
            state.loading = true
        },
        [newProduct.fulfilled]: (state) => {
            state.loading = false
        },
        [newProduct.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [deleteProduct.pending]: (state) => {
            state.loading = true
        },
        [deleteProduct.fulfilled]: (state) => {
            state.loading = false
        },
        [deleteProduct.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [updateProduct.pending]: (state) => {
            state.loading = true
        },
        [updateProduct.fulfilled]: (state) => {
            state.loading = false
        },
        [updateProduct.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [getProductReviews.pending]: (state) => {
            state.loading = true
        },
        [getProductReviews.fulfilled]: (state, action) => {
            state.loading = false
            state.reviews = action.payload.reviews
        },
        [getProductReviews.rejected]: (state) => {
            state.loading = false
        },
        // ----------------------------
        [deleteReview.pending]: (state) => {
            state.loading = true
        },
        [deleteReview.fulfilled]: (state) => {
            state.loading = false
        },
        [deleteReview.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { clearReviews } = productSlice.actions
export default productSlice.reducer