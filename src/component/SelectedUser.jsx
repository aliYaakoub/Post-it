import React from 'react'
import UserPosts from './UserPosts'

const SelectedUser = ({selectedUserPosts: username, setSelectedUserPosts}) => {
    return (
        <div>
            <div className='post-card mx-auto flex items-center justify-between text-white'>
                <p className='cursor-pointer text-xl md:text-2xl' onClick={()=>setSelectedUserPosts('')}>&#10094; Get back</p>
                <h1 className='text-xl md:text-3xl py-8'>{username}'s posts</h1>
            </div>
            <UserPosts usernameFilter={username} />
        </div>
    )
}

export default SelectedUser
