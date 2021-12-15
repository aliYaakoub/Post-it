import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';

const Register = ({setIsRegistering}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [bgOpacity, setBgOpacity] = useState('0');
    const [transform, setTransform] = useState('translate(1000px)')
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const style = {
        transform: transform
    }

    useEffect(()=>{
        setBgOpacity('80');
        setTransform('translate(0px)');
        return () => {
            setBgOpacity('0')
            setTransform('translate(1000px)');
        }
    },[])

    async function handleSubmit(){
        if(email === '' || password === ''){
            return setErrMessage('please fill all fields')
        }
        if(password.length < 6){
            return setErrMessage('password should be at least 6 characters')
        }
        try {
            setErrMessage('')
            setLoading(true)
            await signup(email, password)
            setIsRegistering(false);
        }
        catch(err){
            setErrMessage('Failed to create an account')
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className={`w-screen transition duration-300 h-screen fixed z-50 bg-black bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <div style={style} className={`w-96 transition bg-white mx-5 rounded-lg p-5 relative`}>
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setIsRegistering(false)}>&#10005;</span>
                <div className='my-5'>
                    <label htmlFor="email" className='font-semibold text-lg'>Email : </label>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        value={email}
                        placeholder='Please enter your email'
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
                        placeholder='Create a strong password'
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
                <button disabled={loading} onClick={()=>handleSubmit()} className='my-5 w-full border-2 border-black py-2 btn-login'>Sign up and Login</button>
            </div>
        </div>
    )
}

export default Register
