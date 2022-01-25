import React from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Adduser() {

  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()

  //form submit
  const onFormSubmit = async (userObj) => {
    // console.log(userObj);
    //make http post req to create user resource
    let response = await axios.post('http://localhost:4000/users', userObj)

    if (response.status === 201) {
      //navigate to userlist component
      navigate("/userlist")
    }

  }




  return (
    <div className='mt-5 fw-bold'>
      <p className="display-2  text-secondary fw-bold text-center">User registration</p>
      <hr />
      <form className='w-50 mx-auto bg-warning p-4' onSubmit={handleSubmit(onFormSubmit)}>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="un">Username</label>
          <input type="text" id="un" className="form-control" {...register("username", { required: true })} />
          {/* validation error on username */}
          {errors.username?.type == 'required' && <p className='text-danger fw-bold'>* Username required</p>}
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
          {/* validation error on email */}
          {errors.email?.type == 'required' && <p className='text-danger fw-bold'>* Email required</p>}
        </div>
        {/* address */}
        <div className="mb-3">
          <label htmlFor="ad">Address</label>
          <input type="text" id="ad" className="form-control" {...register("address", { required: true })} />
          {/* validation error on address */}
          {errors.address?.type == 'required' && <p className='text-danger fw-bold'>* Address required</p>}
        </div>
        {/* submit */}
        <button className="btn btn-success d-block mx-auto">Add new user</button>
      </form>
    </div>
  )
}

export default Adduser;
