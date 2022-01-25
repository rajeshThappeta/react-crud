import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

function Userslist() {

    let [users, setUsers] = useState([])
    let [userEditStatus, setUserEditStatus] = useState({
        status: false,
        index: '',
        id: ''
    })



    let { register, handleSubmit } = useForm()

    useEffect(() => {

        const fetchUsers = async () => {
            let response = await axios.get("http://localhost:4000/users")
            let usersList = response.data;
            setUsers(usersList)
        }
        fetchUsers()

    }, [])


    //dalete user by id
    const deleteUserById = async (id, index) => {

        let response = await axios.delete(`http://localhost:4000/users/${id}`)

        if (response.status === 200) {

            //get copy of users
            let newUsers = [...users]
            //reove user from the copy
            newUsers.splice(index, 1)
            //set the state
            setUsers(newUsers)
        }

    }



    //edit use rby id
    const editUser = (ind, id, e) => {
        // console.log("e is ", e);
        // e.stopPropagation();
        console.log("edit btn");
        setUserEditStatus({ ...userEditStatus, status: true, index: ind, id: id })
    }


    //save user
    const saveUser = async (modiFiedUserObj) => {
        modiFiedUserObj.id = userEditStatus.id;
        let id = userEditStatus.id;
        let response = await axios.put(`http://localhost:4000/users/${id}`, modiFiedUserObj)

        if (response.status === 200) {

            setUserEditStatus({ ...userEditStatus, status: false })
            //get latest data
            let res = await axios.get('http://localhost:4000/users')
            let users = res.data;
            setUsers(users)

        }


    }



    return (
        <div className='container text-center mt-4'>
            <p className="display-3 text-center text-primary">List of users</p>

            <form onSubmit={handleSubmit(saveUser)}>

                {users.length == 0 && <p className='display-5 fw-bold text-danger'>No user found</p>}

                {users.length !== 0 &&
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((userObj, index) => <tr key={userObj.id}>





                                    <td>
                                        {userEditStatus.status && userEditStatus.index === index ?
                                            <input type="text" id="" className="form-control" defaultValue={userObj.username} {...register("username")} /> :
                                            <span>
                                                {userObj.username}
                                            </span>
                                        }
                                    </td>

                                    <td>
                                        {userEditStatus.status && userEditStatus.index === index ?
                                            <input type="email" id="" className="form-control" defaultValue={userObj.email} {...register("email")} /> :
                                            <span>
                                                {userObj.email}
                                            </span>
                                        }
                                    </td>
                                    <td>
                                        {userEditStatus.status && userEditStatus.index === index ?
                                            <input type="text" id="" className="form-control" defaultValue={userObj.address} {...register("address")} /> :
                                            <span>
                                                {userObj.address}
                                            </span>
                                        }
                                    </td>
                                    <td>


                                    </td>
                                    <td>
                                        {userEditStatus.status && userEditStatus.index === index ?
                                            <input className="btn btn-success" type="submit" id="x" value="save" />
                                            :
                                            <>
                                                <button id="y" type="button" className="btn btn-warning me-3" onClick={(e) => editUser(index, userObj.id, e)} >Edit</button>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteUserById(userObj.id, index)}>X</button>
                                            </>
                                        }


                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                }
            </form>
        </div>
    )
}

export default Userslist;
