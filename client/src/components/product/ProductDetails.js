import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview } from '../../redux/slices/productSlice'
import { addItemToCart } from '../../redux/slices/cartSlice'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ReviewsList from '../review/ReviewsList'
import { Carousel } from 'react-bootstrap'

const ProductDetails = () => {

    const params = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { product, loading } = useSelector(state => state.products)
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getProductDetails(params.id)).then(res => {
            if (res.error) {
                toast.error(res.error.message)
                navigate('/')
            }
            if (res.payload.product) {
                const thisProduct = cartItems.find(item => item.product === res.payload.product._id)
                if (thisProduct) {
                    setQuantity(thisProduct.quantity)
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart({ id: params.id, quantity })).then(res => {
            if (!res.error) {
                toast.success('Item added to cart successfully')
            }
        })
    }

    const setUserRatings = () => {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const handleReview = () => {
        dispatch(newReview({ rating, comment, productId: params.id })).then(res => {
            if (res.payload?.success) {
                toast.success('Reivew posted successfully')
            }
            if (res.error) {
                toast.error(res.error.message)
            }
        })
    }

    return (
        <div className="container container-fluid">
            {loading && !product._id ?
                <Loader />
                :
                product._id &&
                <>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(item => (
                                    <Carousel.Item key={item.public_id}>
                                        <img className='d-block w-100' src={item.url} alt={item.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product #{product._id}</p>
                            <hr />
                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{
                                        width: `${(product.ratings / 5) * 100}%`
                                    }}
                                />
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                            <hr />
                            <p id="product_price">${product.price}</p>
                            {product.stock > 0 ?
                                <>
                                    <div className="stockCounter d-inline">
                                        <span
                                            className="btn btn-danger minus"
                                            onClick={decreaseQuantity}
                                        >
                                            -
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control count d-inline"
                                            value={quantity}
                                            readOnly
                                        />
                                        <span
                                            className="btn btn-primary plus"
                                            onClick={increaseQuantity}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        id="cart_btn"
                                        className="btn btn-primary d-inline ml-4"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </>
                                :
                                null
                            }
                            <hr />
                            <p>Status:
                                <span
                                    id="stock_status"
                                    className={product.stock > 0 ? 'greenColor' : 'redColor'}
                                >
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </p>
                            <hr />
                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                            {user ?
                                <button
                                    id="review_btn"
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    data-toggle="modal"
                                    data-target="#ratingModal"
                                    onClick={setUserRatings}
                                >
                                    Submit Your Review
                                </button>
                                :
                                <div className='alert alert-danger mt-5' type='alert'>
                                    Login to post your review
                                </div>
                            }
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars" >
                                                        <li className="star">
                                                            <i className="fa fa-star" />
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star" />
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star" />
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star" />
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star" />
                                                        </li>
                                                    </ul>
                                                    <textarea
                                                        name="review"
                                                        id="review"
                                                        className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    <button
                                                        className="btn my-3 float-right review-btn px-4 text-white"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={handleReview}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product.reviews && product.reviews.length > 0 && (
                        <ReviewsList reviews={product.reviews} />
                    )}
                </>
            }
        </div>
    )
}

export default ProductDetails