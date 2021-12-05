import React from 'react'
import { motion } from 'framer-motion';

const Filters = ({usernameFilter, setUsernameFilter}) => {

    return (
        <div className='flex-flex-col'>
            <div className='mt-10 px-3 flex flex-row items-center justify-center filter-div mx-auto'>
                <input 
                    type="text" 
                    value={usernameFilter}
                    className='px-2 py-1 mx-2 rounded w-full outline-none'
                    placeholder='Filter by username'
                    onChange={(e)=>setUsernameFilter(e.target.value)}
                />
                {usernameFilter && <motion.button 
                    initial={{width: 0}}
                    animate={{width: 'auto'}}
                    transition={{duration: '0.1'}}
                    onClick={()=>setUsernameFilter('')}
                    className='mx-2 px-5 py-1 rounded bg-green-400 overflow-hidden'
                >
                    Clear
                </motion.button>}
            </div>
        </div>
    )
}

export default Filters
