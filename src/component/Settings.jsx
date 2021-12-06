import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Settings = ({setOpenSettings}) => {
    
    const [bgOpacity, setBgOpacity] = useState('0');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const { logout, updatePasswordFunc } = useAuth();

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
        setErrMsg('');
        if(password.length < 6){
            return setErrMsg('password must be more than 6 characters')
        }
        await updatePasswordFunc(password);
        setSuccessMsg('updated');
    }

    return (
        <div className={`fixed transition duration-300 w-screen h-screen z-50 bg-black top-0 left-0 bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <motion.div 
                className={`border relative bg-white rounded-lg w-96 p-5 top-0 right-0 mx-5`}
                initial={{y: '-100vh'}}
                animate={{y: '0vh'}}
            >
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setOpenSettings(false)}>&#10005;</span>
                <button onClick={()=>handleLogout()} className='my-5 w-full py-2 btn-logout'>Logout</button>
                <div className='my-5'>
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
                    {errMsg && <p className='text-center text-red-500'>{errMsg}</p>}
                    {successMsg && <p className='text-center text-green-400'>{successMsg}</p>}
                    <button onClick={()=>resetPassword()} className='mt-5 w-full border-2 border-black py-2 btn-login'>Reset Password</button>
                </div>
            </motion.div>
        </div>
    )
}

export default Settings
