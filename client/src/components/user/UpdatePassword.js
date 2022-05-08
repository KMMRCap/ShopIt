import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { updatePassword } from '../../redux/slices/userSlice'

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword({ oldPassword, password })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('Password updated successfully')
                navigate('/me')
            }
        })
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'Change Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={handleSubmit}
                        style={loading ? { paddingBottom: '0' } : null}
                    >
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
                            Update Password
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

export default UpdatePassword
