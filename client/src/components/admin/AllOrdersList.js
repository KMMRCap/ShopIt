import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, deleteOrder } from '../../redux/slices/orderSlice'

const AllOrdersList = () => {

    const dispatch = useDispatch();

    const { loading, adminOrders } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getAllOrders()).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
        })

    }, [dispatch])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id)).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('Order deleted successfully');
                dispatch(getAllOrders()).then(res => {
                    if (res.error) {
                        toast.error(res.error.message)
                    }
                })
            }
        })
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ?
                    <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    :
                    <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: (
                    <>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye" />
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                            <i className="fa fa-trash" />
                        </button>
                    </>
                )
            })
        })

        return data;
    }


    return (
        <>
            <MetaData title='All Orders' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-5">All Orders</h1>
                    {loading ?
                        <Loader />
                        :
                        <MDBDataTable
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default AllOrdersList
