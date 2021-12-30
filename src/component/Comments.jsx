import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';

const Comments = ({setPostId, postId: post}) => {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const { currentUser, uploadComment, deleteComment } = useAuth();

    async function handleSubmit(){
        setErrMsg('');
        if(currentUser){
            try{
                await uploadComment(currentUser.email.split('@')[0], content, post.id);
                setContent('')
            }
            catch(err){
                console.error(err);
                setErrMsg('could not upload comment')
            }
        }
        else{
            setErrMsg('please sign in to upload a comment')
        }
    }

    async function handleDelete(id){
        setErrMsg('');
        try{
            await deleteComment(id);
        }
        catch(err){
            console.error(err);
            setErrMsg('could not delete comment')
        }
    }

    useEffect(()=>{
        setComments(post.comments.sort((a,b) => b.timeStamp - a.timeStamp ))
    }, [post.comments.length, post.comments])

    return (
        <motion.div 
            initial={{opacity: 0}}  
            animate={{opacity: 1}}
            className='bg-black bg-opacity-80 w-screen h-screen fixed z-50 top-0 left-0 flex items-center justify-center'
        >
            <motion.div
                className='bg-white w-full mx-3 py-5 px-10 md:w-3/5 max-h-full rounded'
                initial={{y: '100vh'}}
                animate={{y: 0}}
                transition={{delay: 0.2}}
            >
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setPostId('')}>&#10005;</span>
                <div className='flex flex-col items-center overflow-y-scroll mb-20 h-96'>
                    {comments.length === 0 ?
                        <p className='text-center text-xl py-3'>Be the first one to leave a comment.</p>
                        :
                        <div className=' w-full '>
                            {comments && comments.map(comment => (
                                <div className='border-b border-green-400 p-2 w-full relative'>
                                    <span className='flex items-center'>
                                        <h2 className='text-xl font-bold'>{comment.username}</h2>
                                        <p className='px-3 text-gray-500 text-sm'>{moment(comment.timeStamp.toDate()).format('MMM, Do YY')}</p>
                                    </span>
                                    <p>{comment.content}</p>
                                    {
                                        currentUser && 
                                        comment.username === currentUser.email.split('@')[0] && 
                                        <span className='absolute right-2 top-2 text-red-500 cursor-pointer'>
                                            <AiFillDelete size='20' onClick={()=>handleDelete(comment.id)} />
                                        </span>
                                    }
                                </div>
                            ))}
                        </div>
                    }
                    <div className='fixed bottom-5 flex flex-col w-full md:w-3/5'>
                        <div className="flex">
                            <input
                                type="text"
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                                className='border-2 px-2 border-green-400 w-full rounded mx-3'
                            />
                            <button
                                className='bg-green-400 py-2 px-4 rounded btn-comment'
                                onClick={()=>handleSubmit()}
                                disabled={content.length === 0 ? true : false}
                            >
                                Submit
                            </button>
                        </div>
                        {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Comments