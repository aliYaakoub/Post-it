import React, { useState, useEffect } from 'react'
import useFirestoreBySearch from './../hooks/useFireStoreBySearch';

const GetProfilePic = ({username}) => {

    const { docs } = useFirestoreBySearch('profile-pictures', username);

    const [profilePic, setProfilePic] = useState('');
    
    useEffect(() => {
        setProfilePic(()=>{
            if(docs.length > 0){
                return docs.sort((a,b)=> a.timeStamp - b.timeStamp).slice(-1)[0].attachment.file
            }
            return '';
        })
    }, [docs])

    return (
        <>
            {profilePic && 
                <div className='w-8 h-8 overflow-hidden  rounded-full mx-3 flex items-center justify-center bg-black'>
                    <img className='' src={profilePic} alt="" />
                </div>
            }
        </>
    )
}

export default GetProfilePic
