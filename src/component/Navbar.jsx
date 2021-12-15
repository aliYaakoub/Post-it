import React from 'react'
import { FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion } from 'framer-motion';
import GetProfilePic from './GetProfilePic';

const Navbar = ({setIsLoggingIn, setIsRegistering, setNewPost, setOpenSettings}) => {

    const { currentUser } = useAuth();

    return (
        <motion.div 
            className='flex items-center z-40 justify-end bg-green-400 h-12 sticky top-0'
            initial={{y: '-10vh'}}
            animate={{y: '0'}}
        >
            {currentUser === null ?
                <div className="flex justify-center items-center">
                    <p className='px-5 text-xl cursor-pointer' onClick={()=>setIsLoggingIn(true)}>sign In</p>
                    <p className='px-5 text-xl cursor-pointer' onClick={()=>setIsRegistering(true)}>Sign Up</p>
                </div>
                :
                <>
                    <div className='mr-auto p-2 flex items-center cursor-pointer' onClick={()=>setNewPost(true)}>
                        <AiOutlinePlus size='20' />
                        <span className='pl-2 text-sm md:text-xl'>create a new post</span>
                    </div>
                    <div className="flex justify-center items-center">
                        {currentUser && <GetProfilePic username={currentUser.email.split('@')[0]} />}
                        <h1 className='pr-2 md:text-xl'>{currentUser.email.split('@')[0]}</h1>
                        <div className="mr-5 cursor-pointer hover:text-white transition-colors duration-200" onClick={()=>setOpenSettings(true)}>
                            <FiSettings size='30' />
                        </div>
                    </div>
                </>
            }
        </motion.div>
    )
}

export default Navbar;