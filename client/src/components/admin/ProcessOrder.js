import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder } from '../../redux/slices/orderSlice'

const ProcessOrder = () => {

    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orders)

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    const params = useParams()

    const navigate = useNavigate()

    const orderId = params.id;

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails({ id: orderId })).then(res => {
                if (res.error) {
                    return toast.error(res.error.message)
                }
                if (res.payload?.order) {
                    setStatus(res.payload.order.orderStatus)
                }
            })
        }
    }, [dispatch, orderId])


    const handleUpdateOrder = (id) => {
        dispatch(updateOrder({ id, status })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('Order updated successfully')
                navigate('/admin/orders')
            }
        })
    }

    const shippingDetails = shippingInfo && `
    ${shippingInfo.address}, 
    ${shippingInfo.city}, 
    ${shippingInfo.postalCode}, 
    ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {loading ?
                        <Loader />
                        :
                        <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-7 order-details">
                                <h2 className="my-5">Order # {order._id}</h2>
                                <h4 className="mb-4">Shipping Info</h4>
                                <p>
                                    <b>Name:</b> {user && user.name}
                                </p>
                                <p>
                                    <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                                </p>
                                <p className="mb-4">
                                    <b>Address:</b>{shippingDetails}
                                </p>
                                <p>
                                    <b>Amount:</b> ${totalPrice}
                                </p>
                                <hr />
                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}>
                                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                                </p>
                                <h4 className="my-4">Stripe ID</h4>
                                <p>
                                    <b>{paymentInfo && paymentInfo.id}</b>
                                </p>
                                <h4 className="my-4">Order Status:</h4>
                                <p
                                    className={order.orderStatus &&
                                        String(order.orderStatus).includes('Delivered') ?
                                        "greenColor"
                                        :
                                        "redColor"
                                    }
                                >
                                    <b>{orderStatus}</b>
                                </p>
                                <h4 className="my-4">Order Items:</h4>
                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>
                                            <div className="col-5 col-lg-5">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                            <div className="col-12 col-lg-3 mt-5">
                                <h4 className="my-4">Status</h4>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        name='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => handleUpdateOrder(order._id)}
                                    disabled={loading ? true : false}
                                >
                                    Update Status
                                </button>
                                {loading &&
                                    <div className='text-center'>
                                        <Loader small />
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProcessOrder
