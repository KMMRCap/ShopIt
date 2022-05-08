import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

import Search from './Search'
import Loader from './Loader'

const Header = () => {

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const handleLogout = () => {
        dispatch(logout()).then(res => {
            if (res.error) {
                return toast.error(res.error.message)
            }
            toast.success('Logged out successfully')
        })
    }

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img src="/images/shopit_logo.png" alt='shopit logo' />
                    </Link>
                </div>
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to='/cart'>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">
                        {cartItems && cartItems.length}
                    </span>
                </Link>
                {loading ?
                    <Loader small />
                    :
                    user ?
                        <div className="ml-4 dropdown d-inline">
                            <div
                                className="btn dropdown-toggle text-white mr-4"
                                type="button"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                        :
                        <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>
                }
            </div>
        </nav>
    )
}

export default Header