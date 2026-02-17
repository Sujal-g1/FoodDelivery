import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import userLogin2 from "../assets/userLogin2.jpeg"


const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      const form = e.target;
      
      const fullName = form.elements.fullName.value
      const email = form.elements.email.value
      const phone = form.elements.phone.value
      const address = form.elements.address.value
      const password = form.elements.password.value
      const contactName = form.elements.contactName.value
      
      try{
        const response = await axios.post(
        'http://localhost:3000/api/auth/food-partner/register',
        { fullName , email , phone , address , password , contactName},
        { withCredentials : true }

      )
       navigate('/create-food')
      }
      catch(error){
        console.error(error.response?.data || error.message)
      }
  }

  return (
    <>
    <div className='min-h-screen bg-black  text-white flex items-center justify-center px-4' >  
        <div className='border-5 rounded-xl  h-full w-full lg:h-[80] lg:w-[80vh] relative'>

        <h1 className='lg:text-4xl text-xl font-bold text-center mt-10 mb-4 underline underline-offset-5 '>Food Partner Registration Portal</h1>

        <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 items-center mt-20  '>

            <input type="text" placeholder='name' name='fullName'
               className="w-2/4 bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />

              <input type="email" placeholder='email' name='email'
               className=" w-2/4  bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

              <input type="phone" placeholder='phone number' name='phone'
               className=" w-2/4  bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

                <input type="text" placeholder='contact name' name='contactName'
               className="w-2/4 bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
               
              <input type="text" placeholder='address' name='address'
               className=" w-2/4  bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

              <input type="password" placeholder='password' name='password'
               className=" w-2/4 bg-transparent border border-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>

               <button type="submit"
              className='border px-3 py-2 rounded-xl mt-15 mb-10 text-lg font-semibold hover:text-black hover:bg-gray-500 transition'
              >Register User</button>
              
        </form>

        </div>
    </div>
    </>
  )
}

export default UserRegister