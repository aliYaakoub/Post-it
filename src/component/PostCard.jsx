import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import moment from 'moment';
import { BsFullscreen } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { useAuth } from '../contexts/AuthContext';
import { useInView } from 'react-intersection-observer';

const PostCard = ({post, setFeaturedImg}) => {
    
    const { currentUser, deletePost } = useAuth();
    const { ref, inView} = useInView();
    const animation = useAnimation();

    function handleFullScreen(){
        setFeaturedImg(post.attachment.file)
    }

    function handleDelete(){
        if(post.attachment){
            deletePost(post.id, post.attachment.fileName)
        }
        else{
            deletePost(post.id, false)
        }
    }

    useEffect(()=>{
        if(inView){
            animation.start({opacity: 1, y: '0px', transition: {duration: 0.5}})
        }
        else if(!inView){
            animation.start({opacity: 0, y: '-50px'})
        }
    },[inView, animation])

    function handleType(){
        if(post.attachment){
            if(post.attachment.attachmentType === 'image'){
                return (
                    <div className='flex items-center justify-center relative'>
                        <img className='rounded-lg' src={post.attachment.file} alt='' />
                        <span 
                            onClick={()=>handleFullScreen()} 
                            className='cursor-pointer absolute bottom-5 right-5 text-white'
                        >
                            <BsFullscreen size='30' />
                        </span>
                    </div>
                )
            }
            else if(post.attachment.attachmentType === 'video'){
                return (
                    <div className='flex items-center justify-center'>
                        <video controls className='rounded-lg' src={post.attachment.file} alt='' />
                    </div>
                )
            }
            else if(post.attachment.attachmentType === 'audio'){
                return (
                    <div className='flex items-center justify-center'>
                        <audio controls className='rounded-lg' src={post.attachment.file} alt='' />
                        {/* <div className='w-full h-16 bg-green-400'>
                            <button onClick={audioEl.current.play()}>play</button>
                        </div> */}
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
            ref={ref}
            className='post-card rounded-lg overflow-hidden my-5 p-2 outer-shadow bg-gray-800'
            animate={animation}
        >
            <div className='border-b-2 relative pb-5 border-green-400 text-center text-white'>
                <h1 className='md:text-3xl text-xl '>{post.username}</h1>
                <span className='text-gray-400'>{moment(post.date).format('DD, MMM YYYY')}</span>
                {currentUser && post.username === currentUser.email.split('@')[0] && 
                    <span 
                        className='absolute right-0 text-red-500 top-0'
                        onClick={()=>handleDelete()}
                    >
                        <AiFillDelete size='30' />
                    </span>
                }
            </div>
            <div className='rounded-lg'>
                <p className='p-5 text-lg text-justify text-white'>{post.content}</p>
                {handleType()}
            </div>
        </motion.div>
    )
}

export default PostCard