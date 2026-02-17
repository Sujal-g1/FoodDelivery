import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const response =  axios.post(
      'http://localhost:3000/api/auth/user/login',
      { email , password } ,
      { withCredentials :true }
    )
     console.log(response.data)
    navigate('/home')
  }

  
  return (
    <>
    <div className='min-h-screen bg-black  text-white flex items-center justify-center px-4' >  
        <div className='border-5 rounded-xl  h-[65vh] w-full lg:h-[80] lg:w-[80vh] relative'>

        <h1 className='lg:text-4xl text-xl font-bold text-center mt-10 mb-4 underline underline-offset-5 '>User Login</h1>

        <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 items-center mt-20  '>

            <input type="text" placeholder='name' name="fullName"
            // value={formData.name}
            // onChange={handleChange}
               className="w-2/4 bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />

              <input type="email" placeholder='email' name="email"
              // value={formData.email}
              // onChange={handleChange}
               className=" w-2/4  bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

              <input type="password" placeholder='password' name="password"
            //   value={formData.password}
            //  onChange={handleChange}
               className=" w-2/4 bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

              <button type="submit"
              className='border px-3 py-2 rounded-xl mt-20 text-lg font-semibold hover:text-black hover:bg-gray-500 transition'
              >Register User</button>
              
        </form>

        </div>
    </div>
    </>
  )
}

export default UserLogin