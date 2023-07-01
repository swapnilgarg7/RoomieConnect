import React from 'react'

function Post({ post, id }) {
    return (
        <div>
            <h1>{post.name}</h1>
        </div>
    )
}

export default Post