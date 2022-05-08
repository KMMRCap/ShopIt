import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails } from '../../redux/slices/productSlice'

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

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

    const navigate = useNavigate()

    const params = useParams()

    const dispatch = useDispatch();

    const { product, loading } = useSelector(state => state.products)

    const productId = params.id

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId)).then(res => {
                if (res.error) {
                    toast.error(res.error.message)
                }
            })
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, product, productId])


    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = { name, price, description, category, stock, seller, images }

        dispatch(updateProduct({ id: product._id, productData })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('Product updated successfully')
                navigate('/admin/products')
            }
        })
    }

    const handleAddImages = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

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
            <MetaData title={'Update Product'} />
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
                            <h1 className="mb-4">Update Product</h1>
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
                                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                        onChange={handleAddImages}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                <div className='d-flex flex-wrap' style={{ maxWidth: 'fit-content' }}>
                                    {oldImages && oldImages.map((img, index) => (
                                        <img key={index} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                                <div className='d-flex flex-wrap' style={{ maxWidth: 'fit-content' }}>
                                    {imagesPreview.map((img, index) => (
                                        <img src={img} key={index} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>
                            </div>
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                UPDATE
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

export default UpdateProduct
