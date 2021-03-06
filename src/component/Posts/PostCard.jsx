import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import moment from 'moment';
import { useInView } from 'react-intersection-observer';
import { BsFullscreen } from 'react-icons/bs';
import { AiFillDelete, AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useAuth } from '../../contexts/AuthContext';

const PostCard = ({post, setFeaturedImg, setPostId, setPostLikes, setSelectedUserPosts}) => {
    
    const [errMsg, setErrMsg] = useState('');
    const [user, setUser] = useState(null);

    const { currentUser, deletePost, likePost, getUserData } = useAuth();
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

    async function handleLike(){
        setErrMsg('')
        if(currentUser){
            try{
                await likePost(currentUser.id, post.id);
            }
            catch(err){
                console.error(err);
                setErrMsg('can\'t like post')
            }
        }
        else{
            setErrMsg('you need to be signed in to like a post.');
        }
    }

    function handleType(){
        if(post.attachment){
            if(post.attachment.attachmentType === 'image'){
                return (
                    <div className='flex items-center justify-center relative'>
                        <img className='rounded-lg cursor-pointer' onClick={()=>handleFullScreen()} src={post.attachment.file} alt='' />
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
                    </div>
                )
            }
        }
        else{
            return null
        }
    }

    useEffect(()=>{
        if(inView){
            animation.start({opacity: 1, y: 0})
        }
        else if(!inView){
            animation.start({opacity: 0, y: 0})
        }
    },[inView, animation])

    useEffect(() => {
        const getUser = async () => {
            const userToGet = await getUserData(post.posterId);
            setUser(userToGet.data());
        }
        getUser();
    }, [getUserData, post.posterId])

    return (
        <motion.div 
            ref={ref}
            className='post-card rounded-lg overflow-hidden my-5 p-2 outer-shadow bg-gray-800'
            initial={{opacity: 0, y: '-50px'}}
            transition={{duration: 0.5}}
            animate={animation}
        >
            <div className='border-b-2 relative pb-5 border-green-400 text-center text-white'>
                <div className="flex items-center justify-center">
                    {user && user.attachment && 
                        <div className='bg-black w-8 h-8 overflow-hidden md:w-12 md:h-12 rounded-full mx-3 flex items-center justify-center'>
                            <img className='' src={user.attachment.file} alt="" />
                        </div>
                    }
                    <h1
                        className='md:text-3xl text-xl '
                        // onClick={()=>{
                        //     if(setSelectedUserPosts){
                        //         setSelectedUserPosts(user)
                        //     }
                        // }}
                    >
                        {user && user.username}
                    </h1>
                </div>
                <span className='text-gray-400'>{moment(post.timeStamp.toDate()).format('DD, MMM YYYY')}</span>
                {currentUser && post.posterId === currentUser.id && 
                    <span 
                        className='absolute right-0 text-red-500 top-0 cursor-pointer'
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
            <div className='my-5 text-white flex items-center justify-center'>
                <span className="px-5 flex items-center">
                    {currentUser && post.likes.includes(currentUser.id) ? 
                        <motion.span initial={{scale: 1.5}} animate={{scale: 1}}>
                            <AiFillLike size='30' className='cursor-pointer' onClick={()=>handleLike()} />
                        </motion.span>
                        :
                        <motion.div initial={{scale: 1.5}} animate={{scale: 1}}>
                            <AiOutlineLike size='30' className='cursor-pointer' onClick={()=>handleLike()} />
                        </motion.div>
                    }
                    <p onClick={()=>setPostLikes(post.likes)} className='px-2 cursor-pointer'>{post.likes.length}</p>
                </span>
                <span className="px-5 flex items-center">
                    <BiCommentDetail size='30' className='cursor-pointer' onClick={()=>setPostId(post)} />
                    <p className='px-2'>{post.comments.length}</p>
                </span>
            </div>
            {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
        </motion.div>
    )
}

export default PostCard