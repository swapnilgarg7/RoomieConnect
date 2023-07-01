import React from 'react'
import { Link } from 'react-router-dom'

function Post({ post, id }) {
    console.log(post)
    return (
        <li>
            <Link to={`/post/{id}`}>
                <img src={post.images[0]} alt="img" />
            </Link>
        </li>
    )
}

export default Post