import React from 'react'
import { FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { AiOutlinePlus } from 'react-icons/ai'

const Navbar = ({setIsLoggingIn, setIsRegistering, setNewPost, setOpenSettings}) => {

    const { currentUser } = useAuth();

    return (
        <div className='flex items-center z-40 justify-end bg-green-400 h-12 sticky top-0'>
            {currentUser === null ?
                <div className="flex justify-center items-center">
                    <p className='px-5 text-xl cursor-pointer' onClick={()=>setIsLoggingIn(true)}>sign In</p>
                    <p className='px-5 text-xl cursor-pointer' onClick={()=>setIsRegistering(true)}>Sign Up</p>
                </div>
                :
                <>
                    <div className='mr-auto px-5 flex items-center cursor-pointer' onClick={()=>setNewPost(true)}>
                        <AiOutlinePlus size='20' />
                        <span className='px-2 text-xl'>create a new post</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <h1 className='px-5 text-xl'>{currentUser.email}</h1>
                        <div className="mr-5 cursor-pointer hover:text-white transition-colors duration-200" onClick={()=>setOpenSettings(true)}>
                            <FiSettings size='30' />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Navbar;