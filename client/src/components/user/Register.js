import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/slices/authSlice'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

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
    if (!name || !email || !password || !avatar) {
      toast.warn('Please fill all the fields')
    }
    dispatch(register({ name, email, password, avatar })).then(res => {
      if (res.error) {
        return toast.error(res.error.message)
      }
      toast.success('Registered Successfully')
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
      <MetaData title='Register' />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={handleSubmit}
            style={loading ? { paddingBottom: '0' } : null}
          >
            <h1 className="mb-3">Register</h1>
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
                email='email'
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
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img src={avatarPreview} className='rounded-circle' alt='avatar preview' />
                  </figure>
                </div>
                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept='images/*'
                    onChange={handleSetAvatar}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
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

export default Register