import {useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import userLogin2 from "../assets/userLogin2.jpeg"


const UserRegister = () => {

  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   name:"",
  //   email:"",
  //   password:""
  // });

  // function handleChange(e){
  //   setFormData({
  //      ...formData,
  //      [e.target.name] : e.target.value
  //   })
  // }

//  async function handleSubmit(e){
//   e.preventDefault();

//   console.log("Sending data:", formData);  

//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/auth/user/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "include",
//         body: JSON.stringify(formData)
//       }
//     );

//     console.log("Response status:", response.status); // request reached backend

//     const data = await response.json();

//     console.log("Response body:", data); //  backend responded

//   } catch (error) {
//     console.error("Network error:", error);
//   }
// }


// -------------

    const handleSubmit = async (e)=>{
      e.preventDefault();

      const form = e.target;
       const fullName = form.elements.fullName.value;
       const email = form.elements.email.value; 
       const password = form.elements.password.value;
      console.log("Values:", { fullName, email, password });

      try{
       const response = await axios.post("http://localhost:3000/api/auth/user/register",
        { fullName , email , password },
        { withCredentials: true }  //to store cookies
         )
        console.log(response.data);

        navigate('/home')
      }
      catch(error){
        console.error(error.response?.data || error.message);
      }
    }

  return (
    <>
    <div className='min-h-screen bg-black  text-white flex items-center justify-center px-4' >  
        <div className='border-5 rounded-xl  h-[65vh] w-full lg:h-[80] lg:w-[80vh] relative'>

        <h1 className='lg:text-4xl text-xl font-bold text-center mt-10 mb-4 underline underline-offset-5 '>User Registration Portal</h1>

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

export default UserRegister