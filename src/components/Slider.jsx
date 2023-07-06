import { db } from '../firebase'
import Spinner from '../components/Spinner';
import React, { useEffect, useState } from 'react'
import { collection, orderBy, limit, query, getDocs } from 'firebase/firestore'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router-dom';

export default function Slider() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

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
            setLoading(false);
        }
        getPosts();
    }, [])


    if (loading) {
        return <Spinner />
    }
    if (posts.length === 0) {
        return <h1 className='text-center text-2xl font-bold'>No posts to show</h1>
    }
    return (
        <div>
            <Swiper
                slidesPerView={1} navigation pagination={{ type: "progressbar" }} effect='fade'
                modules={[EffectFade]} autoplay={{ delay: 2000 }}
            >
                {posts.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={() => navigate(`post/${id}`)}>
                        <div className=' relative mx-auto w-full md:w-1/2 overflow-hidden h-[400px]'
                            style={{
                                background: `url(${data.imgURLs[0]}) center no-repeat`,
                                backgroundSize: "cover"
                            }}>
                            <p className='absolute left-2 top-3 
                            font-medium bg-secondary text-light
                            rounded-xl py-2 px-4 shadow-lg opacity-90'>
                                {data.bhk} apartment
                            </p>
                            <p className='absolute left-2 bottom-3 
                            font-medium bg-green-100 text-primary
                            rounded-xl py-2 px-4 shadow-lg opacity-90'>
                                ₹{data.rent}  / month
                            </p>
                        </div>

                    </SwiperSlide>))}
            </Swiper>
        </div>
    )
}
