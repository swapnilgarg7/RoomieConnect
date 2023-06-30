import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function CreatePost() {

    const auth = getAuth();

    const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        vacancy: 1,
        washroom: "indian",
        ac: true,
        furnished: true,
        gender: "male",
        bhk: 0,
        rent: 0,
        address: "",
        description: "",
        lat: 0,
        lng: 0,
        images: {},
    });
    const { name, contact, vacancy, washroom, ac, furnished, gender, bhk, rent, address, description, lat, lng, images } = formData;



    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }
        if (e.target.files) {
            setFormData((prevState) =>
            ({
                ...prevState,
                images: e.target.files
            }));
        }
        if (!e.target.files) {
            setFormData((prevState) =>
            ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }));
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        toast.info("Please wait while we create your post");
        setLoading(true);

        if (images.length > 6) {
            setLoading(false);
            toast.error("Maximum 6 images allowed");
            return;
        }
        let geolocation = {};
        let location;
        if (geoLocationEnabled) {
            const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + process.env.GEOCODE_API);
            const data = await res.json();
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

            location = data.status === "ZERO_RESULTS" ? false : true;

            if (!location) {
                setLoading(false);
                toast.error("Invalid Address");
                return;
            }
        }
        else {
            geolocation.lat = lat;
            geolocation.lng = lng;
        }

        async function storeImage(image) {

            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }
                    , (error) => {

                        reject(error);
                    }
                    , () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);

                        });
                    }
                );
            }
            );
        }



        const imgURLs = await Promise.all(
            [...images].map((image) => storeImage(image))).catch((err) => {
                setLoading(false);
                toast.error("Error uploading images");
                return;
            });
        console.log('done' + imgURLs);

        const formDataCopy = {
            ...formData,
            images: imgURLs,
            lat: geolocation.lat, lng: geolocation.lng,
            timestamp: serverTimestamp()
        };
        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success("Post created successfully");


    }


    if (loading) {
        return <Spinner />
    }
    return (
        <div className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center text-primary my-6 font-bold mb-12'>Create Post</h1>

            <form onSubmit={onSubmit}>
                <p className='text-primary text-2xl font-semibold'>Your Name:</p>
                <input type='text' id='name' value={name} onChange={onChange} required
                    className='w-full border border-primary rounded-md p-2 mb-4' />
                <p className='text-primary text-2xl font-semibold'>Number of Roommates vacancy:</p>
                <input type='number' id='vacancy' value={vacancy} onChange={onChange} required
                    min="1" max="100"
                    className='w-full border border-primary rounded-md p-2 mb-4' />

                <p className='text-primary text-2xl font-semibold'>Rent (per person):</p>
                <div className='flex mb-4 justify content w-full mx-auto'>
                    <input type='number' id='rent' value={rent} onChange={onChange} required
                        min="1" max="100000"
                        className='w-[80%] border border-primary rounded-md p-2' />
                    <p className='w-[20%] mt-1 text-center'>₹ / month</p>
                </div>

                <p className='text-primary text-2xl font-semibold'>AC Facility?</p>
                <div className='flex mb-4'>
                    <button
                        type='button'
                        value={true}
                        id="ac"
                        onClick={onChange}
                        className={
                            `mr-3 px-7 py-3 text-md uppercase shadow-md rounded-xl
                            transition duration-150 ease-in-out hover:shadow-secondary
                            border-accent  w-full
                            ${ac ? "bg-secondary text-light border-0" : "bg-light text-primary border-2"
                            }`
                        }>
                        Yes
                    </button>
                    <button
                        type='button'
                        value={false}
                        id="ac"
                        onClick={onChange}
                        className={
                            `mr-3 px-7 py-3 text-md uppercase shadow-md rounded-xl
                            transition duration-150 ease-in-out hover:shadow-secondary
                            border-accent w-full
                            ${!ac ? "bg-secondary text-light border-0" : "bg-light text-primary border-2"
                            }`
                        }>
                        No
                    </button>
                </div>
                <p className='text-primary text-2xl font-semibold'>Washroom Type:</p>
                <div className='flex mb-4'>
                    <button
                        type='button'
                        value="indian"
                        id="washroom"
                        onClick={onChange}
                        className={
                            `mr-3 px-7 py-3 text-md uppercase shadow-md rounded-xl
                            transition duration-150 ease-in-out hover:shadow-secondary
                            border-accent  w-full
                            ${washroom === "indian" ? "bg-secondary text-light border-0" : "bg-light text-primary border-2"
                            }`
                        }>
                        Indian
                    </button>
                    <button
                        type='button'
                        value="western"
                        id="washroom"
                        onClick={onChange}
                        className={
                            `mr-3 px-7 py-3 text-md uppercase shadow-md rounded-xl
                            transition duration-150 ease-in-out hover:shadow-secondary
                            border-accent w-full
                            ${washroom === "western" ? "bg-secondary text-light border-0" : "bg-light text-primary border-2"
                            }`
                        }>
                        Western
                    </button>
                </div>
                <p className='text-primary text-2xl font-semibold'>Address:</p>
                <textarea type='text' id='address' value={address} onChange={onChange} required
                    className='w-full border border-primary rounded-md p-2 mb-4 ' />
                <div>
                    {!geoLocationEnabled && <p className='text-primary text-2xl font-semibold'>Latitude:</p>}
                    {!geoLocationEnabled && <input type='number' id='lat' value={lat} onChange={onChange} required
                        min="-90" max="90"
                        className='w-full border border-primary rounded-md p-2 mb-4 ' />}
                    {!geoLocationEnabled && <p className='text-primary text-2xl font-semibold'>Longitude:</p>}
                    {!geoLocationEnabled && <input type='number' id='lng' value={lng} onChange={onChange} required
                        min="-180" max="180"
                        className='w-full border border-primary rounded-md p-2 mb-4 ' />}
                </div>


                <p className='text-primary text-2xl font-semibold mt-4'>Additional Description/Details:</p>
                <textarea type='text' id='description' value={description} onChange={onChange}
                    className='w-full border border-primary rounded-md p-2 mb-4 ' />

                <div className='mb-4'>
                    <p className='text-primary text-2xl font-semibold'>Images (Max. 6):</p>
                    <p className='text-primary text-xl'>The first image will be the cover:</p>
                    <input type='file' id='images' onChange={onChange}
                        accept='.jpg, .jpeg, .png'
                        multiple
                        required
                        className='w-full border border-primary rounded-md p-2 mt-2 mb-4 ' />
                </div>

                <button type="submit" className='mb-12 w-full bg-primary p-4 text-light text-xl rounded-xl hover:bg-accent font-semibold shadow-md shadow-black
                    transition duration-150 ease-in-out hover:shadow-secondary'>
                    Submit Post
                </button>

            </form>
        </div>
    )
}


export default CreatePost