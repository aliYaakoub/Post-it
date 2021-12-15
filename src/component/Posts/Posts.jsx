import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import useFirestore from '../../hooks/useFirestore';
import Comments from '../Comments';
import Likes from '../Likes';

const Posts = ({setSelectedUserPosts}) => {

    const [posts, setPosts] = useState([]);
    const [order, setOrder] = useState('desc')
    const [max, setMax] = useState(null);
    const [limit, setLimit] = useState(5);
    const filtered = posts.slice(0 , 1 * limit);
    const limitInc = 5;
    const [featuredImg, setFeaturedImg] = useState('')
    const [postId, setPostId] = useState('');
    const [postLikes, setPostLikes] = useState([]);

    const { docs, loading } =  useFirestore('posts', order);

    useEffect(()=>{
        setPosts(docs)
        setMax(docs.length);
    },[docs])

    function handleSorting(){
        if(order === 'desc'){
            setOrder('asc')
        }
        else{
            setOrder('desc')
        }
    }

    return (
        <>
            {loading ? 
                <div className='text-center py-20 text-2xl text-white'>
                    <p>loading</p>
                </div>
                :
                docs.length === 0 ?
                    <div className='text-center py-20 text-2xl text-white'>
                        <p>No Posts to show</p>
                    </div>
                    :
                    <motion.div
                        className='flex flex-col items-center m-5'
                    >
                        {featuredImg && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='fixed p-5 z-50 top-0 h-screen w-screen flex justify-center items-center left-0 bg-black'>
                            <motion.p
                                initial={{y: '-100vh'}}
                                animate={{y: '0vh'}} 
                                transition={{delay: 1}}
                                onClick={()=>setFeaturedImg('')}
                                className='text-white py-1 px-4 bg-gray-700 w-28 rounded-xl fixed top-5  text-center cursor-pointer'
                            >
                                Back
                            </motion.p>
                            <img className=' max-h-full ring-1 ring-gray-700 rounded-lg' src={featuredImg} alt="" />
                        </motion.div>}
                        <motion.div
                            className='flex flex-row post-card text-white justify-end'
                            initial={{opacity: 0, y: '-50px'}}
                            animate={{opacity: 1, y: '0px'}}
                        >
                            <p className='px-2 md:text-xl cursor-pointer'>sort By : </p>
                            <p className='px-2 md:text-xl cursor-pointer flex flex-row items-center' onClick={()=>handleSorting()} >
                                <span className='pr-2'>Date</span>
                                <span style={order === 'desc' ? {transform: 'rotate(180deg)', transition: '0.2s'} : {transition: '0.2s'}}>
                                    <IoIosArrowDown />
                                </span>
                            </p>
                        </motion.div>
                        {filtered && filtered.map(post=>(
                            <PostCard setSelectedUserPosts={setSelectedUserPosts} setPostLikes={setPostLikes} setPostId={setPostId} post={post} key={post.id} setFeaturedImg={setFeaturedImg} />
                        ))}
                        {filtered.length === max ?
                            null
                        :
                            <AiOutlinePlusCircle size='50' className="mx-auto text-green-400 my-10 cursor-pointer" onClick={()=>setLimit(limit+limitInc)}/>
                        }
                        {postId && <Comments setPostId={setPostId} postId={postId} />}
                        {postLikes.length !== 0  && <Likes setPostLikes={setPostLikes} postLikes={postLikes} />}
                    </motion.div>
            }
        </>
    )
}

export default Posts