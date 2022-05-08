import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { myOrders } from '../../redux/slices/orderSlice'

const ListOrders = () => {

    const dispatch = useDispatch();

    const { loading, orders } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(myOrders()).then(res => {
            if (res.error) {
                toast.error(res.error.message);
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
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
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'My Orders'} />
            <h1 className="my-5">My Orders</h1>
            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}
        </div>
    )
}

export default ListOrders
