import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion';

const Login = ({setIsLoggingIn}) => {

    const [email, setEmail] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [bgOpacity, setBgOpacity] = useState('0');
    const [transform, setTransform] = useState('translate(-1000px)')
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [ResetErrMsg, setResetErrMsg] = useState('');

    const { login, resetPassword } = useAuth();

    const style = {
        transform: transform
    }

    useEffect(()=>{
        setBgOpacity('80');
        setTransform('translate(0px)');
        return () => {
            setBgOpacity('0')
            setTransform('translate(-1000px)');
        }
    },[])

    async function handleSubmit(){
        if(email === '' || password === ''){
            return setErrMessage('please fill all fields')
        }
        try {
            setErrMessage('')
            setLoading(true)
            await login(email, password)
            setIsLoggingIn(false)
        }
        catch(err){
            setErrMessage('Failed to login')
            console.error(err);
        }
        setLoading(false);
    }

    async function handleResetEmail(){
        setResetErrMsg('');
        if(!resetEmail){
            return setResetErrMsg('please enter tour email')
        }
        try{
            await resetPassword(resetEmail);
            setSuccessMsg('check your email and follow the instructions')
        }
        catch(err){
            setResetErrMsg('failed to reset password')
        }
    }

    return (
        <div className={`w-screen transition duration-300 h-screen fixed z-50 bg-black bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <div style={style} className={`w-96 transition bg-white rounded-lg p-5 relative mx-5`}>
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setIsLoggingIn(false)}>&#10005;</span>
                <div className='my-5'>
                    <label htmlFor="email" className='font-semibold text-lg'>Email : </label>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        value={email}
                        placeholder='Enter your email'
                        className='w-full border-2 border-black h-10 px-3 my-3 form-input'
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label htmlFor="password" className='font-semibold text-lg'>Password : </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        value={password}
                        placeholder='Enter your password'
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
                </div>
                {errMessage ? <p className='text-center text-red-600'>{errMessage}</p> : null}
                <p className='text-center underline text-blue-500 cursor-pointer' onClick={()=>setForgotPassword(true)}>Forgot Password ?</p>
                <button disabled={loading} onClick={()=>handleSubmit()} className='my-5 w-full border-2 border-black py-2 btn-login'>Login</button>
            </div>
            {forgotPassword && 
                <div className='fixed top-0 left-0 w-screen h-screen bg-black flex items-center bg-opacity-80 justify-center'>
                    <motion.div 
                        className='bg-white w-96 rounded-lg py-5 px-10 relative mx-5'
                        initial={{y: '-100vh'}}
                        animate={{y: '0vh'}}
                    >
                        <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setForgotPassword(false)}>&#10005;</span>
                        {successMsg && <p className='text-center text-white bg-green-400 py-2'>{successMsg}</p>}
                        <div className='my-5'>
                            <label htmlFor="resetEmail" className='font-semibold text-lg'>Email : </label>
                            <input
                                type="email"
                                name='resetEmail'
                                id='resetEmail'
                                value={resetEmail}
                                placeholder='Enter your email'
                                className='w-full border-2 border-black h-10 px-3 my-3 form-input'
                                onChange={(e)=>setResetEmail(e.target.value)}
                            />
                        </div>
                        {ResetErrMsg ? <p className='text-center text-red-600'>{ResetErrMsg}</p> : null}
                        <button disabled={loading} onClick={()=>handleResetEmail()} className='my-5 w-full border-2 border-black py-2 btn-login'>Reset Password</button>
                        <p className='text-center underline text-blue-500 cursor-pointer' onClick={()=>setForgotPassword(false)}>get back to Login</p>
                    </motion.div>
                </div>
            }
        </div>
    )
}

export default Login
