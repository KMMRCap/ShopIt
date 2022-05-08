import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser } from '../../redux/slices/userSlice'

const UsersList = () => {

    const dispatch = useDispatch();

    const { loading, allUsers } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllUsers()).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id)).then(res => {
            if (res.error) {
                toast.error(res.error.message)
            }
            if (res.payload?.success) {
                toast.success('User deleted successfully')
                dispatch(getAllUsers()).then(res => {
                    if (res.error) {
                        toast.error(res.error.message)
                    }
                })
            }
        })
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        allUsers.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: (
                    <>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                )
            })
        })

        return data;
    }


    return (
        <>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-5">All Users</h1>
                    {loading ?
                        <Loader />
                        :
                        <MDBDataTable
                            data={setUsers()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default UsersList
