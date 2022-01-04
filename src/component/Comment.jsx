import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useAuth } from '../contexts/AuthContext'
import { AiFillDelete } from 'react-icons/ai';

const Comment = ({data: comment, setErrMsg}) => {
    
    const [user, setUser] = useState(null)

    const { currentUser, deleteComment, getUserData } = useAuth();

    async function handleDelete(id){
        setErrMsg('');
        try{
            await deleteComment(id);
        }
        catch(err){
            console.error(err);
            setErrMsg('could not delete comment')
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const userToGet = await getUserData(comment.posterId);
            setUser(userToGet.data());
        }
        getUser();
    }, [getUserData, comment.posterId])

    return (
        <div className='border-b border-green-400 p-2 w-full relative'>
            <span className='flex items-center'>
                <h2 className='text-xl font-bold'>{user && user.username}</h2>
                <p className='px-3 text-gray-500 text-sm'>{moment(comment.timeStamp.toDate()).format('MMM, Do YY')}</p>
            </span>
            <p>{comment.content}</p>
            {
                currentUser && 
                comment.posterId === currentUser.id && 
                <span className='absolute right-2 top-2 text-red-500 cursor-pointer'>
                    <AiFillDelete size='20' onClick={()=>handleDelete(comment.id)} />
                </span>
            }
        </div>
    )
}

export default Comment
