import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, updateDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Post from '../components/Post';


export default function Profile() {

    const auth = getAuth();

    const navigate = useNavigate();

    const [changeDetails, setChangeDetails] = useState(false);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const { name, email } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    function onLogout() {
        auth.signOut();
        navigate('/login');
        toast.success('Logged out successfully');
    }

    async function onSubmit() {
        try {
            if (name !== auth.currentUser.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: name

                });
                toast.success('Profile updated successfully');
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name: name
                });


            }

        }
        catch (err) {
            toast.error(err.message);
        }

    }

    useEffect(() => {
        async function fetchUserPosts() {

            const postRef = collection(db, 'posts');
            const userPostsQuery = query(postRef, where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc"));
            const userPostsSnapshot = await getDocs(userPostsQuery);
            let posts = [];
            userPostsSnapshot.forEach((doc) => {
                return posts.push({ data: doc.data(), id: doc.id });
            });
            setPosts(posts);
            setLoading(false);
        }
        fetchUserPosts();
    }, [auth.currentUser.uid]);
    return (
        <div>
            <section className='max-w-6xl flex flex-col items-center justify-content mx-auto'>
                <h1 className='text-3xl text-center text-primary my-6 font-bold'>Profile</h1>

                <div className='w-full md:w-1/2 px-3'>
                    <form>
                        <input className={`w-full justify-center px-4 py-2 text-xl text-secondary
                            border-primary rounded-xl transition ease-in-out bg-white 
                            ${changeDetails && "bg-red-100"}`}
                            type='text' id="name" value={name} onChange={onChange}
                            disabled={!changeDetails} placeholder='Name' />
                        <input className='w-full justify-center px-4 py-2 text-xl text-secondary
                            border-primary rounded-xl transition ease-in-out bg-white mt-2 mb-6'
                            type='email' id="email" value={email} onChange={onChange}
                            disabled placeholder='Email Address' />

                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 px-2'>
                            <p className='flex items-center text-light
                            border-primary rounded-xl transition ease-in-out bg-secondary
                            hover:bg-accent hover:text-primary py-2 px-4 cursor-pointer'
                                onClick={() => {
                                    changeDetails && onSubmit();
                                    setChangeDetails((prevState) => !prevState)
                                }}>

                                {changeDetails ? 'Apply Changes' : 'Edit Your Name'}
                            </p>
                            <p className='text-light
                            border-primary rounded-xl transition ease-in-out bg-red-500
                            hover:bg-red-800 hover:text-light py-2 px-4 cursor-pointer'
                                onClick={onLogout}>
                                Log Out
                            </p>

                        </div>
                    </form>
                    <button type="submit" className='mt-6 w-full bg-primary p-4 text-light text-xl rounded-xl hover:bg-accent font-semibold shadow-md shadow-black
                    transition duration-150 ease-in-out hover:shadow-secondary'>
                        <Link to="/create-post">
                            Create Post to find a Roommate
                        </Link>
                    </button>

                </div>

            </section>
            <div className='my-12 max-w-6xl px-3 mx-auto'>
                {!loading && (
                    <>
                        <h2 className='text-3xl text-primary text-center font-semibold mb-6'>My Posts</h2>
                        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {posts.map((post) => (
                                <Post key={post.id} post={post.data} id={post.id} />
                            ))}
                        </ul>
                    </>
                )}
                {loading && <Spinner />}
            </div>
        </div>
    )
}



