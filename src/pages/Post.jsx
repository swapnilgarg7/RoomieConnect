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
import { FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
                console.log(post);
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
            <div className='fixed top-[13%] right-[3%] z-10 bg-light cursor-pointer
            border-2 border-primary rounded-xl p-2'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard');
                }}
            >
                <FaShare />
            </div>

            <div className='m-4 p-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto 
            rounded-lg shadow-lg border-3 lg:space-x-5 '>
                <div className=' w-full '>
                    <div className='flex items-start justify-between mb-4'>
                        <p className='text-2xl font-bold text-primary'>
                            {post.bhk} apartment
                        </p>
                        <p className='text-xl  text-primary font-semibold'>
                            Vacancy : {post.vacancy}
                            <br />
                            For : {post.gender === "male" ? "Male" : "Female"}
                        </p>
                    </div>

                    <p className='text-xl font-bold mb-4 text-secondary'>
                        Rent : ₹{post.rent} / month
                    </p>
                    <div className='flex items-center mb-4'>
                        <FaMapMarkerAlt className='h-8 w-8 text-red-500' />
                        <p className='font-semibold text-lg my-2 text-gray-700 truncate'>
                            {post.address}
                        </p>
                    </div>
                    <p className='text-xl mb-4 text-primary'>
                        <span className='font-semibold'>Additional details :</span> {post.description}
                    </p>



                    <p className='text-xl font-bold  text-primary'>
                        Facilities:
                    </p>
                    <ul className='text-lg'>
                        <li>{post.washroom === "indian" ? "Indian washroom" : "Western washroom"}</li>
                        <li>{post.ac ? "AC provided" : "Non-AC "}</li>
                        <li>{post.wifi ? "Wifi Available" : "Wifi not included"}</li>
                    </ul>
                    <p className='text-xl font-bold mt-2 text-primary'>
                        Contact:
                    </p>
                    <p>
                        {post.name}
                        <br />
                        <a className='underline cursor-pointer' href={`tel:+91${post.contact}`} >
                            +91 {post.contact}
                        </a>
                    </p>


                </div>
                <div className=' w-full  z-10 overflow-x-hidden mt-2'>
                    <MapContainer center={[post.geolocation.lat, post.geolocation.lng]} zoom={13} scrollWheelZoom={true}
                        style={{ height: "100%", width: "100%" }}>

                        <Marker position={[post.geolocation.lat, post.geolocation.lng]}>
                            <Popup>
                                This is the location of the apartment
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </main >
    )
}
