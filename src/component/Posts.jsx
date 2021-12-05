import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import useFirestore from '../hooks/useFirestore';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [order, setOrder] = useState('desc')
    const [max, setMax] = useState(null);
    const [limit, setLimit] = useState(5);
    const filtered = posts.slice(0 , 1 * limit);
    const limitInc = 5;

    const { docs } =  useFirestore('posts', order);

    useEffect(()=>{
        setPosts(docs)
        setMax(docs.length);
    },[docs,])

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
            {docs.length === 0 ?
                <div className='text-center py-20 text-2xl text-white'>
                    <p>No Posts to show</p>
                </div>
                :
                <div className='flex flex-col items-center m-5'>
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
                        <PostCard post={post} key={post.id} />
                    ))}
                    {filtered.length === max ?
                        null
                    :
                        <AiOutlinePlusCircle size='50' className="mx-auto text-green-400 my-10 cursor-pointer" onClick={()=>setLimit(limit+limitInc)}/>
                    }
                </div>
            }
        </>
    )
}

export default Posts