import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion } from 'framer-motion';
import { useAuth } from './../contexts/AuthContext';

const ProgressBar = ({file, setFile, setFileToUpload, path, posterId, content=false, setNewPost, type=false, userId = false}) => {

    const { url, progress } = useStorage(file, path, posterId, content, type, userId);
    const { setChanges } = useAuth();
    
    useEffect(()=>{
        if(url){
            setFile(null);
            setFileToUpload(null);
            setNewPost(false);
            setChanges(old => old + 1)
        }
    },[url, setFile, setFileToUpload, setNewPost, setChanges])

    return (
        <motion.div 
            className='w-full h-1 bg-green-400 my-5' 
            initial={{width: 0}}
            animate={{width: progress + '%'}}
        ></motion.div>
    )
}

export default ProgressBar
