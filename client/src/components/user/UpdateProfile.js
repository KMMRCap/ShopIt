import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../redux/slices/userSlice'
import { loadUser } from '../../redux/slices/authSlice'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const UpdateProfile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ name, email, avatar })).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload.success) {
                toast.success('User updated successfully')
                dispatch(loadUser());
                navigate('/me')
            }
        })
    }

    const handleSetAvatar = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {

                const fileInput = document.getElementById('customFile')

                if ((fileInput.files[0].size) / 1000 >= 1000) {

                    toast.error('Avatar size must be less than 2MB')
                    setAvatar('')
                    setAvatarPreview('/images/default_avatar.jpg')

                }
                else {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className="container container-fluid">
            <MetaData title={'Update Profile'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow-lg"
                        onSubmit={handleSubmit}
                        style={loading ? { paddingBottom: '0' } : null}
                    >
                        <h1 className="mt-2 mb-5">Update Profile</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
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
                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={handleSetAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
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
    )
}

export default UpdateProfile