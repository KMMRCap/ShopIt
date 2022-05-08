import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../redux/slices/orderSlice'
import { clearCartItems } from '../../redux/slices/cartSlice'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Loader from '../layout/Loader'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    const [loading, setLoading] = useState(false)

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let res;
        try {
            res = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = res.data.client_secret;
            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });
            if (result.error) {
                toast.error(result.error.message);
                setLoading(false)
            }
            else {
                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder({ order })).then(res => {
                        if (res.error) {
                            return toast.error(res.error.message)
                        }
                    })
                    navigate('/success')
                    dispatch(clearCartItems())
                }
                else {
                    toast.error('There is some issue while payment processing')
                }
            }
        }
        catch (err) {
            setLoading(false)
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={handleSubmit}
                        style={loading ? { paddingBottom: '0' } : null}
                    >
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                        {loading &&
                            <div className='text-center'>
                                <Loader small />
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className='text-center mt-3'>
                <p>Test Card : 4000002760003184</p>
                <p>Test Expire Date : 12/34</p>
                <p>Test CVC : 555</p>
            </div>
        </div>
    )
}

export default Payment
