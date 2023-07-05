import React, { useEffect, useState } from 'react'
import { collection, orderBy, limit, query, getDocs } from 'firebase/firestore'
import Slider from '../components/Slider'
import { db } from '../firebase'

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, orderBy('timestamp', 'desc'), limit(5));
            const postsSnap = await getDocs(q);
            let posts = [];
            postsSnap.forEach((doc) => {
                posts.push({ id: doc.id, data: doc.data() });
            });
            setPosts(posts);
            console.log(posts);
        }
        getPosts();
    }, [])
    return (
        <div>
            <Slider />
        </div>
    )
}

export default Home