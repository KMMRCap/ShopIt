import React, { useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearReviews } from '../../redux/slices/productSlice'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const dispatch = useDispatch();

    const { reviews, loading } = useSelector(state => state.products)

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview({id, productId})).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('Review deleted successfully')
                dispatch(getProductReviews(productId)).then(res => {
                    if (res.error) {
                        toast.error(res.error.message)
                        dispatch(clearReviews())
                    }
                })
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productId) {
            dispatch(getProductReviews(productId)).then(res => {
                if (res.error) {
                    toast.error(res.error.message)
                    dispatch(clearReviews())
                }
            })
        }
        else {
            toast.warn('Please enter a valid product ID')
        }
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions: (
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash" />
                    </button>
                )
            })
        })

        return data;
    }

    return (
        <>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                    disabled={loading ? true : false}
                                >
                                    SEARCH
                                </button>
                                {loading &&
                                    <div className='text-center'>
                                        <Loader small />
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                    {reviews && reviews.length > 0 ?
                        <MDBDataTable
                            data={setReviews()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                        :
                        <p className="mt-5 text-center">No Reviews.</p>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReviews
