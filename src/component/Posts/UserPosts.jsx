import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import useFirestoreBySearch from '../../hooks/useFireStoreBySearch';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Comments from '../Comments';
import Likes from '../Likes';

const UserPosts = ({usernameFilter: username, setSelectedUserPosts = false}) => {

    const [posts, setPosts] = useState([]);
    const [max, setMax] = useState(null);
    const [limit, setLimit] = useState(5);
    const filtered = posts.slice(0 , 1 * limit);
    const limitInc = 5;
    const [featuredImg, setFeaturedImg] = useState('')
    const [postId, setPostId] = useState('');
    const [postLikes, setPostLikes] = useState([]);

    const { docs } =  useFirestoreBySearch('posts', username);

    useEffect(()=>{
        setPosts(docs)
        setMax(docs.length);
    },[docs,])

    return (
        <>
            {docs.length === 0 ?
                <div className='text-center py-20 text-2xl text-white'>
                    <p>No Posts to show </p>
                </div>
                :
                <div className='flex flex-col items-center m-5'>
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
                        <img className='h-full ring-1 ring-gray-700 rounded-lg' src={featuredImg} alt="" />
                    </motion.div>}
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
                </div>
            }
        </>
    )
}

export default UserPosts