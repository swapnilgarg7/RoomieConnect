import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

function Post({ post, id }) {
    return (
        <li className='bg-white flex flex-col justify-between items-center shadow-md
        hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-150 pb-4'>
            <Link to={`/post/{id}`}>
                <img
                    className='w-72 h-48 object-cover 
                    aspect-square
                    hover:scale-105 transition-scale duration-150 ease-in'
                    src={post.imgURLs[0]}
                    loading='lazy'
                    alt="img" />
                <div className='px-4'>
                    <div className='flex items-center'>
                        <MdLocationOn className='h-4 w-4 text-red-500' />
                        <p className='font-semibold text-sm my-2 text-gray-700 truncate'>
                            {post.address}
                        </p>
                    </div>
                    <p className='font-semibold text-lg'>{post.bhk} apartment</p>
                    <p className='text-secondary font-bold'> ₹{post.rent}  / month</p>
                </div>
                <div>
                    <div className='flex'>

                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Post