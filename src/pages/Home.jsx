import React, { useState, useEffect } from 'react'
import Slider from '../components/Slider'
import { db } from '../firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Post from '../components/Post';
import Spinner from '../components/Spinner';


function Home() {

    const [recentPosts, setRecentPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getRecentPosts() {
            try {
                const postsRef = collection(db, 'posts');
                const q = query(postsRef, orderBy('timestamp', 'desc'));
                const querySnap = await getDocs(q);
                const posts = [];
                querySnap.forEach((doc) => {
                    posts.push({ data: doc.data(), id: doc.id });
                });
                setRecentPosts(posts);
                setLoading(false);
            }
            catch (error) {
                console.log(error)
            }
        }
        getRecentPosts();
    })
    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Slider />
            <div className='max-w-6xl mx-auto my-12'>
                <h1 className='text-primary text-4xl font-bold '>Recent Posts </h1>
                <ul className='mt-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {recentPosts.map((post) => (
                        <Post
                            key={post.id}
                            post={post.data}
                            id={post.id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home