import React, { useState, useEffect } from 'react'
import ProgressBar from '../ProgressBar';
import { useAuth } from '../../contexts/AuthContext';

const NewPost = ({setNewPost}) => {
    
    const [bgOpacity, setBgOpacity] = useState('0');
    const [file, setFile] = useState(null);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [content, setContent] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    const { currentUser, postContent } = useAuth();

    useEffect(()=>{
        setBgOpacity('80')
        return () =>{
            setBgOpacity('0')
        }
    },[])

    async function handlePost(){
        setErrMsg('')
        if(!file){
            if(content.length < 1){
                return setErrMsg('you can\'t create an empty post')
            }
        }
        setLoading(true);
        try{
            if(file){
                setType(file.type.split('/')[0])
                setFileToUpload(file) 
            }
            else if(!file){
                await postContent(currentUser.id, content);
                setContent('')
                setNewPost(false);
            }
        }
        catch(err){
            console.error(err);
            setErrMsg('could not post')
        }
        setLoading(false);
    }

    return (
        <div className={`fixed transition duration-300 w-screen h-screen z-50 bg-black top-0 left-0 bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <div className={`border relative bg-white rounded-lg flex flex-col w-full md:w-2/4 py-5 px-10 top-0 right-0`}>
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setNewPost(false)}>&#10005;</span>
                <div className='flex flex-col mb-5'>
                    <label htmlFor="content" className='pb-5' >What do you want to say ?</label>
                    <textarea 
                        type="text" 
                        id='content' 
                        value={content} 
                        onChange={(e)=>setContent(e.target.value)} 
                        className='border-2 border-black w-full h-48 p-2' 
                    />
                </div>
                <div className='my-5 flex items-center justify-center flex-col'>
                    <input className='file-input' type="file" name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} />
                    <label htmlFor="file" className='file-label h-10 flex items-center justify-center border-2 border-black'>
                        <p className='px-5'>{file ? file.name : 'select a file to upload'}</p>
                    </label>
                    <div className='w-full'>
                        {fileToUpload && 
                            <ProgressBar 
                                type={type} 
                                setNewPost={setNewPost} 
                                file={fileToUpload} 
                                posterId={currentUser.id} 
                                // id={currentUser.id}
                                content={content} 
                                setFileToUpload={setFileToUpload} 
                                setFile={setFile} 
                                path='posts' 
                            />
                        }
                    </div>
                </div>
                {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
                <div className='flex items-center justify-center my-5'>
                    <button disabled={loading} onClick={()=>handlePost()} className='w-full max-w-sm border-2 border-black btn-login py-2'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost
