import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/bundle';

export default function Post() {

    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

    useEffect(() => {
        setLoading(true);
        async function getPost() {
            const docRef = doc(db, "posts", params.postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost(docSnap.data());
                setLoading(false);
            }
            else {
                navigate('/');
                toast.error('Post does not exist');
                setLoading(false);
            }
        }
        getPost();
    }, [params.postId, navigate]);

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
            <Swiper
                slidesPerView={1} navigation pagination={{ type: "progressbar" }} effect='fade'
                modules={[EffectFade]} autoplay={{ delay: 3000 }}
            >
                {post.imgURLs.map((imgURL, index) => (
                    <SwiperSlide key={index}>
                        <div className=' relative mx-auto w-full md:w-1/2 overflow-hidden h-[400px]'
                            style={{
                                background: `url(${post.imgURLs[index]}) center no-repeat`,
                                backgroundSize: "cover"
                            }}>

                        </div>
                    </SwiperSlide>))}
            </Swiper>
        </main>
    )
}
