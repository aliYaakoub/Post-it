import React from 'react'
import UserPosts from './UserPosts'
import GetProfilePic from './GetProfilePic';

const SelectedUser = ({selectedUserPosts: username, setSelectedUserPosts}) => {
    return (
        <div>
            <div className='post-card mx-auto flex items-center justify-between text-white px-5 md:px-0'>
                <p className='cursor-pointer text-xl md:text-2xl' onClick={()=>setSelectedUserPosts('')}>&#10094; Get back</p>
                <span className='flex items-center justify-center'>
                    {username && <GetProfilePic username={username} />}
                    <h1 className='text-xl md:text-3xl py-8'>{username}'s posts</h1>
                </span>
            </div>
            <UserPosts usernameFilter={username} />
        </div>
    )
}

export default SelectedUser
