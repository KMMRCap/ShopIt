import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import Product from './product/Product'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { toast } from 'react-toastify'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const { loading, products, productsCount, resPerPage } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const keyword = params.keyword ? params.keyword : ''

    useEffect(() => {
        dispatch(getAllProducts({ keyword, currentPage, price, category, rating })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentPage, keyword, price, category, rating])


    return (
        <div className="container container-fluid">
            {loading ?
                <Loader />
                :
                <>
                    <MetaData title='Buy Best Products Online' />
                    <h1 id='products_heading'>Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ?
                                <>
                                    <div className='col-6 col-md-3 my-5'>
                                        <div className='px-5'>
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={value => setPrice(value)}
                                            />
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(item => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={item}
                                                            onClick={() => setCategory(item)}
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>
                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-9'>
                                        <div className='row'>
                                            {products.length ?
                                                products.map(item => (
                                                    <Product key={item._id} item={item} col={4} />
                                                ))
                                                :
                                                <h2>Nothing found</h2>
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                products.length ?
                                    products.map(item => (
                                        <Product key={item._id} item={item} col={3} />
                                    ))
                                    :
                                    <h2>Nothing found</h2>
                            }
                        </div>
                    </section>
                    <div className='d-flex justify-content-center mt-5'>
                        {resPerPage <= products.length &&
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={products.length ? productsCount : 0}
                                onChange={(pageNumber) => setCurrentPage(pageNumber)}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Home