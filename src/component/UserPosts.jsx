import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import useFirestoreBySearch from '../hooks/useFireStoreBySearch';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const UserPosts = ({usernameFilter}) => {

    const [posts, setPosts] = useState([]);
    const [max, setMax] = useState(null);
    const [limit, setLimit] = useState(5);
    const filtered = posts.slice(0 , 1 * limit);
    const limitInc = 5;

    const { docs } =  useFirestoreBySearch('posts', usernameFilter);

    useEffect(()=>{
        setPosts(docs)
        setMax(docs.length);
    },[docs,])

    return (
        <div className='flex flex-col items-center m-5'>
            {filtered && filtered.map(post=>(
                <PostCard post={post} key={post.id} />
            ))}
            {filtered.length === max ?
                null
            :
                <AiOutlinePlusCircle size='50' className="mx-auto text-green-400 my-10 cursor-pointer" onClick={()=>setLimit(limit+limitInc)}/>
            }
        </div>
    )
}

export default UserPosts