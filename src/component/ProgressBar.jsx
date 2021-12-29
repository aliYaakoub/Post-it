import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion } from 'framer-motion';

const ProgressBar = ({file, setFile, setFileToUpload, path, username, content=false, setNewPost, type=false, userId = false}) => {

    if(path === 'profile-picture'){
        
    }

    const { url, progress } = useStorage(file, path, username, content, type, userId);
    console.log(progress, url);
    
    useEffect(()=>{
        if(url){
            setFile(null);
            setFileToUpload(null);
            setNewPost(false);
        }
    },[url, setFile, setFileToUpload, setNewPost])

    return (
        <motion.div 
            className='w-full h-1 bg-green-400 my-5' 
            initial={{width: 0}}
            animate={{width: progress + '%'}}
        ></motion.div>
    )
}

export default ProgressBar
