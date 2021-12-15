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
        console.log(docs);
    }, [docs])

    return (
        <>
            {profilePic && 
                <div className='w-10 h-10 overflow-hidden  rounded-full mx-3 flex items-center justify-center'>
                    <img className='' src={profilePic} alt="" />
                </div>
            }
        </>
    )
}

export default GetProfilePic
