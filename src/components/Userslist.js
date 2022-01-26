import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

function Userslist() {

    let { register, handleSubmit, setValue } = useForm()
    let [users, setUsers] = useState([])
    let [editUser, setEditUser] = useState({
        status: false,
        id: 0
    })


    //get users 
    useEffect(() => {
        getUsers()
    },
        []
    )


    //get users
    const getUsers = async () => {
        let response = await axios.get("http://localhost:4000/users")
        setUsers(response.data)
    }

    //delete user
    const deleteUserById = async (id) => {
        let response = await axios.delete(`http://localhost:4000/users/${id}`)
        getUsers()

    }

    //edit user
    const editUserById = (userObj) => {

        setEditUser({ ...editUser, status: true, id: userObj.id })
        setValue("username", userObj.username)
        setValue("email", userObj.email)
        setValue("address", userObj.address)
    }


    //save user
    const saveUserById = async (modifiedUser) => {
        modifiedUser.id = editUser.id
        let id = modifiedUser.id;
        let response = await axios.put(`http://localhost:4000/users/${id}`, modifiedUser)
        setEditUser({ ...editUser, status: false })
        getUsers()

    }

    return (
        <div className='text-center mt-5 container'>
            <p className="display-3 fw-bold text-primary">List of Users</p>
            {/* empty list */}
            {users.length === 0 && <p className='text-danger'>No users found</p>}
            {users.length !== 0 &&
                <form onSubmit={handleSubmit(saveUserById)}>
                    <table className="table bg-light">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((userObj) => <tr key={userObj.id}>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj.id ?
                                            <input type="text" id="" {...register("username")}  /> : <> {userObj.username}</>
                                        }


                                    </td>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj.id ?
                                            <input type="text" id="" {...register("email")} /> : <> {userObj.email}</>
                                        }
                                    </td>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj.id ?
                                            <input type="text" id="" {...register("address")} /> : <> {userObj.address}</>
                                        }
                                    </td>
                                    <td>
                                        {editUser.status === true && editUser.id === userObj.id ?


                                            <input type="submit" className="btn btn-success" value="Save" /> :
                                            <>
                                                <button type="button" className="btn btn-warning m-1" onClick={() => editUserById(userObj)}>Edit</button>
                                                <button type="button" className="btn btn-danger m-1" onClick={() => deleteUserById(userObj.id)}>x</button>
                                            </>
                                        }


                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </form>


            }

        </div>
    )
}

export default Userslist;
