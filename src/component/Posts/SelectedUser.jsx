import React from 'react'
import UserPosts from './UserPosts'

const SelectedUser = ({selectedUserPosts: user, setSelectedUserPosts}) => {
    return (
        <div>
            <div className='post-card mx-auto flex items-center justify-between text-white px-5 md:px-0'>
                <p className='cursor-pointer text-xl md:text-2xl' onClick={()=>setSelectedUserPosts('')}>&#10094; Get back</p>
                <span className='flex items-center justify-center'>
                    {/* {user && user.attachment && 
                        <div className='bg-black w-8 h-8 overflow-hidden md:w-12 md:h-12 rounded-full mx-3 flex items-center justify-center'>
                            <img className='' src={user.attachment.file} alt="" />
                        </div>
                    } */}
                    <h1 className='text-xl md:text-3xl py-8'>{user && user.username}'s posts</h1>
                </span>
            </div>
            {user && <UserPosts usernameFilter={user.id} />}
        </div>
    )
}

export default SelectedUser
