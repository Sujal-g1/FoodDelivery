import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import logoBoy from "../assets/logoBoy.jpeg"



const Navbar = () => {

    const navigate = useNavigate();

  return (
    <motion.div 
    initial={{y:-60 , opacity:0}}
    animate={{y: 0, opacity: 1 }}
    transition={{
        duration:1,
        delay:0.2
    }}
    className='h-25 w-[80%] rounded-b-4xl mx-auto bg-[#25671E] flex items-center justify-center'>

    <div className=' h-15 w-[90%] flex'>

        {/* logo */}
   <div className='h-15 w-[20%]  flex items-center justify-center'>
    <h1 className='text-white text-3xl'>DASH</h1> 
    </div>

         {/* navlinks */}
    <div className='  h-15 w-[60%] text-[#F68048] text-lg flex items-center justify-center gap-10'>
        <button>Home</button>
        <button>About</button>
        <button>Sujal</button>
        <button>Garg</button>
    </div>


     {/* user */}
    <div className=' h-15 w-[20%] flex items-center justify-center gap-5'>
        <img src={logoBoy} alt="" 
        className='w-15 h-15 rounded-full'/>
        <h1 className='text-2xl text-white'>Sujal</h1>
    </div>
    
    </div>  

   

   

    </motion.div>
  )
}

export default Navbar