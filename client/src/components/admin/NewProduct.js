import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { newProduct } from '../../redux/slices/productSlice'

const NewProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const navigate = useNavigate()

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

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.products);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { name, price, description, category, stock, seller, images }

        dispatch(newProduct(formData)).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                navigate('/admin/products')
                toast.success('Product created successfully')
            }
        })
    }

    const handleUploadImages = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <>
            <MetaData title='New Product' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form
                            className="shadow-lg"
                            onSubmit={handleSubmit}
                            style={loading ? { paddingBottom: '0' } : null}
                        >
                            <h1 className="mb-4">New Product</h1>
                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    className="form-control"
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Images</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={handleUploadImages}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                <div className='d-flex flex-wrap' style={{ maxWidth: 'fit-content' }}>
                                    {imagesPreview.map(img => (
                                        <img
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                CREATE
                            </button>
                            {loading &&
                                <div className='text-center'>
                                    <Loader small />
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProduct
