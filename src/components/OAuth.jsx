import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
function OAuth() {
    const navigate = useNavigate();
    function onGoogleClick() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef).then(docSnap => {
                    if (!docSnap.exists()) {
                        setDoc(doc(db, "users", user.uid), {

                            name: user.displayName,
                            email: user.email,
                            createdAt: new Date()
                        });
                    }
                })
                toast.success(`Welcome ${user.displayName}`);
                navigate('/');
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }



    return (
        <button type='button'
            className='w-full justify-center px-4 py-3 text-xl text-light
    rounded-xl transition ease-in-out bg-red-600
  hover:bg-red-200 hover:text-red-700 flex items-center'
            onClick={onGoogleClick}>
            <FcGoogle className='mr-2 text-2xl rounded-full' />
            Continue with Google
        </button>
    )
}

export default OAuth