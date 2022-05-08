import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct } from '../../redux/slices/productSlice'

const ProductsList = () => {

    const dispatch = useDispatch();

    const { loading, adminProducts, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAdminProducts()).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        adminProducts.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil" />
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                            <i className="fa fa-trash" />
                        </button>
                    </>
                )
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id)).then(res => {
            if (res.error) {
                toast.error(error)
            }
            if (res.payload?.success) {
                toast.success('Product deleted successfully')
                dispatch(getAdminProducts()).then(res => {
                    if (res.error) {
                        toast.error(res.error.message)
                    }
                })
            }
        })
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>
                        {loading ?
                            <Loader />
                            :
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        }
                    </>
                </div>
            </div>
        </>
    )
}

export default ProductsList