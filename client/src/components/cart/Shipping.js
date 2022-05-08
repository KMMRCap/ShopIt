import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { countries } from 'countries-list'
import { saveShippingInfo } from '../../redux/slices/cartSlice'

const Shipping = () => {

    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [country, setCountry] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (shippingInfo.address) {
            setAddress(shippingInfo.address)
            setCity(shippingInfo.city)
            setPostalCode(shippingInfo.postalCode)
            setPhoneNo(shippingInfo.phoneNo)
            setCountry(shippingInfo.country)
        }
    }, [shippingInfo])


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!address && !city && !postalCode && !phoneNo && !country) {
            return toast.warn('Please fill all the fields')
        }
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        navigate('/order/confirm')
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Shipping
