import {useState} from 'react'
// import start from "../assets/start.jpeg"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import {  AnimatePresence ,motion } from "framer-motion"
import UserRegister from './auth/UserRegister'
import FoodPartner from './auth/FoodPartnerRegister'
import { useNavigate } from 'react-router-dom';


const Start = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false)

  const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  show: { y: 0,
     opacity: 1,
     scale: 1,
    transition:{
      duration:0.8
    }   
   }
};


  return (
    <>
    <motion.div 
     variants={containerVariants}
    initial="hidden"
    animate="show"
    className='w-full min-h-screen bg-[#FF7F11] flex items-center justify-center flex-col gap-10 lg:gap-20'>
      
      <motion.div
      variants={itemVariants}
       className='bg-black w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64'></motion.div>

      <motion.div variants={itemVariants}>
          <h1 className='text-5xl lg:text-7xl uppercase tracking-[20%]'>dash</h1>
          <p className=' text-base  sm:text-lg md:text-xl text-center pt-4'>do dash.</p>
      </motion.div>

      <div className="flex flex-col items-center relative w-64 sm:w-72">
      <motion.button
      onClick={()=>setOpen(!open)}
     variants={itemVariants}
      className='bg-black text-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex  items-center justify-center  cursor-pointer  hover:scale-110 transition'>
       { open ? (<FaChevronUp className="text-lg sm:text-xl md:text-4xl "/>) :
       (  <FaChevronDown  className="text-lg sm:text-xl md:text-4xl "/> )
       }
        </motion.button>

        <AnimatePresence>
      {open && (
     <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="absolute top-full flex flex-col gap-5 mt-5 items-center"

    >
      <button 
      onClick={()=>navigate("/user/register")}
      className="w-full text-center px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition cursor-pointer whitespace-nowrap">
        User Login
      </button>

      <button
      onClick={()=> navigate('/food-partner/register')} 
      className="w-full text-center px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition cursor-pointer">
        Food Partner Login
      </button>
    </motion.div>
  )}
</AnimatePresence>


      </div>

    </motion.div>
    </>
     


  )
}

export default Start