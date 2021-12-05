import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment';
// import { AiFillDelete } from 'react-icons/ai';
// import { useAuth } from '../contexts/AuthContext';

const PostCard = ({post}) => {

    // const { currentUser } = useAuth();
    console.log(post.date);

    function handleType(){
        if(post.attachment){
            if(post.attachmentType === 'image'){
                return (
                    <div className='flex items-center justify-center'>
                        <img className='rounded-lg' src={post.attachment} alt='' />
                    </div>
                )
            }
            else if(post.attachmentType === 'video'){
                return (
                    <div className='flex items-center justify-center'>
                        <video controls className='rounded-lg' src={post.attachment} alt='' />
                    </div>
                )
            }
            else if(post.attachmentType === 'audio'){
                return (
                    <div className='flex items-center justify-center'>
                        <audio controls className='rounded-lg' src={post.attachment} alt='' />
                    </div>
                )
            }
        }
        else{
            return null
        }
    }

    return (
        <motion.div 
            className='post-card rounded-lg overflow-hidden my-5 p-2 outer-shadow bg-gray-800'
            initial={{opacity: 0, y: '-50px'}}
            animate={{opacity: 1, y: '0px'}}
        >
            <div className='border-b-2 pb-5 border-green-400 text-center text-white'>
                <h1 className='md:text-3xl text-xl '>{post.username}</h1>
                <span className='text-gray-400'>{moment(post.date).format('DD, MMM YYYY')}</span>
            </div>
            <div className='rounded-lg'>
                <p className='p-5 text-lg text-justify text-white'>{post.content}</p>
                {handleType()}
            </div>
        </motion.div>
    )
}

export default PostCard