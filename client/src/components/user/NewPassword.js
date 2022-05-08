import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import { newPassword } from '../../redux/slices/userSlice'
import Loader from '../layout/Loader'

const NewPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate()

    const params = useParams()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(newPassword({
            token: params.token,
            passwords: { password, confirmPassword }
        })).then(res => {
            if (res.error) {
                toast.error(res.error.message);
            }
            if (res.payload?.success) {
                toast.success('Password updated successfully')
                navigate('/login')
            }
        })
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'New Password Reset'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={submitHandler}
                        style={loading ? { paddingBottom: '0' } : null}
                    >
                        <h1 className="mb-3">New Password</h1>
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
                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
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

export default NewPassword
