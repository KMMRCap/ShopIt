import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails } from '../../redux/slices/userSlice'
import { loadUser } from '../../redux/slices/authSlice'

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.user)

    const params = useParams()

    const navigate = useNavigate()

    const userId = params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId)).then(res => {
                if (res.error) {
                    toast.error(res.error.message)
                }
            })
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }
    }, [dispatch, userId, user])


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { name, email, role }

        dispatch(updateUser({ id: user._id, userData })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('User updated successfully')
                navigate('/admin/users')
                dispatch(loadUser())
            }
        })
    }


    return (
        <>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form
                                className="shadow-lg"
                                onSubmit={handleSubmit}
                                style={loading ? { paddingBottom: '0' } : null}
                            >
                                <h1 className="mt-2 mb-5">Update User</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >
                                    Update
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
            </div>
        </>
    )
}

export default UpdateUser
