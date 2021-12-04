import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
// import ProgressBar from './ProgressBar';

const Settings = ({setOpenSettings}) => {
    
    const [bgOpacity, setBgOpacity] = useState('0');
    // const [file, setFile] = useState(null);
    // const [fileToUpload, setFileToUpload] = useState(null);

    // const types = ['image/png','image/jpeg','image/jpg'];

    const { logout } = useAuth();

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

    // function uploadProfilePic(e) {
    //     e.preventDefault();
    //     if(file && types.includes(file.type)){
    //         setFileToUpload(file)
    //     }
    // }

    return (
        <div className={`fixed transition duration-300 w-screen h-screen z-50 bg-black top-0 left-0 bg-opacity-${bgOpacity} flex items-center justify-center`}>
            <div className={`border relative bg-white rounded-lg h-96 w-96 p-5 top-0 right-0`}>
                <span className='absolute top-3 right-5 cursor-pointer' onClick={()=>setOpenSettings(false)}>&#10005;</span>
                {/* <form onSubmit={(e)=>uploadProfilePic(e)}>
                    <input type="file" name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} />
                    {fileToUpload && <ProgressBar file={fileToUpload} setFileToUpload={setFileToUpload} setFile={setFile} path='profile-pictures' />}
                    <button className='my-5 w-full border-2 border-black py-2 btn-login'>submit</button>
                </form> */}
                <span onClick={()=>handleLogout()}>Logout</span>
            </div>
        </div>
    )
}

export default Settings
