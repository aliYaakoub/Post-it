import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';

const Settings = ({setOpenSettings}) => {
    
    const [bgOpacity, setBgOpacity] = useState('0');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [file, setFile] = useState('');
    const [fileToUpload, setFileToUpload] = useState('');
    const [loading, setLoading] = useState(false);

    const { logout, updatePasswordFunc, currentUser } = useAuth();

    useEffect(()=>{
        setBgOpacity('80')
        return () =>{
            setBgOpacity('0')
        }
    },[])

    async function handleLogout(){
        await logout()
        setOpenSettings(false);
    }

    async function resetPassword(){
        setSuccessMsg('')
        setErrMsg('');
        if(password.length < 6){
            return setErrMsg('password must be more than 6 characters')
        }
        try{
            await updatePasswordFunc(password);
            setSuccessMsg('updated');
        }
        catch(err){
            if(err.message === 'Firebase: Error (auth/requires-recent-login).'){
                setErrMsg('this operation requires a recent login')
            }
            else{
                setErrMsg('could not reset password');
            }
        }
    }

    async function handlePost(){
        setSuccessMsg('')
        setErrMsg('')
        setLoading(true);
        if(!file){
            return setErrMsg('please add a picture.')
        }
        try{
            setFileToUpload(file) 
        }
        catch(err){
            console.error(err);
            setErrMsg('could not upload image.')
        }
        setLoading(false);
    }

    return (
        <div className={`fixed transition duration-300 w-screen h-screen z-50 bg-black top-0 left-0 bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <motion.div 
                className={`border relative bg-white rounded-lg w-96 p-5 top-0 right-0 mx-5`}
                initial={{y: '-100vh'}}
                animate={{y: '0vh'}}
            >
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setOpenSettings(false)}>&#10005;</span>
                {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
                {successMsg && <p className='text-center text-green-400'>{successMsg}</p>}
                <div className='border-b-2 border-black py-5'>
                    <label htmlFor="password" className='font-semibold text-lg'>Reset your Password : </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        value={password}
                        placeholder='Enter your a new password'
                        className='w-full border-2 border-black h-10 px-3 my-3 form-input'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className='flex items-center mx-1'>
                        <input 
                            type="checkbox" 
                            name="showPassword" 
                            id="showPassword" 
                            className='cursor-pointer'
                            checked={showPassword}
                            onChange={(e)=>setShowPassword(e.target.checked)} 
                        />
                        <label htmlFor='showPassword' className='px-2 cursor-pointer'>Show Password</label>
                    </div>
                    <button onClick={()=>resetPassword()} className='mt-5 w-full border-2 border-black py-2 btn-login'>Reset Password</button>
                </div>

                {/*  */}
                <div className="py-5 border-b-2 border-black">
                    <div className='mb-5 flex items-center justify-center flex-col'>
                        <input className='file-input' accept='image/*' type="file" name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} />
                        <label htmlFor="file" className='file-label h-10 flex items-center justify-center border-2 border-black'>
                            <p className='px-5'>{file ? file.name : 'select a file to upload'}</p>
                        </label>
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                        <button disabled={loading} onClick={()=>handlePost()} className='w-full max-w-sm border-2 border-black btn-login py-2'>Upload Profile picture</button>
                    </div>
                    <div className='w-full'>
                        {fileToUpload && <ProgressBar setNewPost={setOpenSettings} file={fileToUpload} username={currentUser.email.split('@')[0]} setFileToUpload={setFileToUpload} setFile={setFile} path='profile-pictures' />}
                    </div>
                </div>

                <div className="py-5">
                    <button onClick={()=>handleLogout()} className='w-full py-2 btn-logout'>Logout</button>
                </div>
                
            </motion.div>
        </div>
    )
}

export default Settings
