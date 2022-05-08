import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { forgetPassword } from '../../redux/slices/userSlice'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { loading, message } = useSelector(state => state.user)

    useEffect(() => {
        if (message) {
            toast.success(message)
        }
    }, [message])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgetPassword({ email })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
        })
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'Forgot Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={submitHandler}
                        style={loading ? { paddingBottom: '0' } : null}
                    >
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Send Email
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
    )
}

export default ForgotPassword
