import { motion } from 'framer-motion'
import React from 'react'

const Likes = ({postLikes, setPostLikes}) => {
    return (
        <motion.div 
            initial={{opacity: 0}}  
            animate={{opacity: 1}}
            className='bg-black bg-opacity-80 w-screen h-screen fixed z-50 top-0 left-0 flex items-center justify-center'
        >
            <motion.div
                className='bg-white mx-3 py-5 px-10 w-3/5 md:w-2/5 h-96 rounded overflow-y-scroll '
                initial={{y: '100vh'}}
                animate={{y: 0}}
                transition={{delay: 0.2}}
            >
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setPostLikes([])}>&#10005;</span>
                {postLikes.length === 0 ? 
                    <p>No one liked this post yet</p>
                    :
                    postLikes && postLikes.map(postLike => (
                        <p className='text-center my-1'>{postLike}</p>
                    ))
                }
            </motion.div>
        </motion.div>
    )
}

export default Likes
