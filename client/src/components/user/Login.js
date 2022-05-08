import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/authSlice'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            return toast.warn('Please enter your email')
        }
        if (!password) {
            return toast.warn('Please enter your password')
        }
        dispatch(login({ email, password })).then(res => {
            if (res.error) {
                return toast.error(res.error.message)
            }
            toast.success('Logged in successfully')
        })
    }

    return (
        <div className="container container-fluid">
            <MetaData title='Login' />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg pb-2" onSubmit={handleSubmit}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            LOGIN
                        </button>
                        {loading ?
                            <div className='text-center'>
                                <Loader small />
                            </div>
                            :
                            <div className='d-flex justify-content-between'>
                                <Link to="/password/forgot" className="my-3">
                                    Forgot Password ?
                                </Link>
                                <Link to="/register" className="my-3">
                                    New User ?
                                </Link>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login