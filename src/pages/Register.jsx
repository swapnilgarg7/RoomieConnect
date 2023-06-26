import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import OAuth from '../components/OAuth'
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';

import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    }
    );
    const { name, email, password } = formData;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    function onChange(e) {

        setFormData({ ...formData, [e.target.id]: e.target.value });

    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    updateProfile(auth.currentUser, {
                        displayName: name
                    })

                    const user = userCredential.user;
                    const formDataCopy = { ...formData };
                    delete formDataCopy.password;
                    setDoc(doc(db, "users", user.uid), formDataCopy);

                    toast.success('Account created successfully');
                    navigate('/');
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <section>
            <h1 className='text-3xl text-center text-primary my-6 font-bold'>Sign Up</h1>
            <div className='flex flex-col md:flex-row  flex-wrap justify-center items-center px-6 py-12
                max-w-6xl mx-auto'>
                <div className='w-full md:w-[50%] mb-12 pt-12'>
                    <img className='w-full rounded-xl'

                        alt="Sign Up"
                        src='https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' width={500} height={500} />
                </div>
                <div className='w-full md:w-[40%] md:ml-20'>
                    <form onSubmit={onSubmit}>
                        <input className='w-full justify-center px-4 py-2 text-xl text-secondary
                           border-primary rounded-xl transition ease-in-out'
                            type='text' id="name" value={name} onChange={onChange}
                            placeholder='Name' />
                        <input className='mt-6 w-full justify-center px-4 py-2 text-xl text-secondary
                           border-primary rounded-xl transition ease-in-out'
                            type='email' id="email" value={email} onChange={onChange}
                            placeholder='Email Address' />
                        <div className='relative'>
                            <input className='mt-6 w-full justify-center px-4 py-2 text-xl text-primary
                           border-primary rounded-xl transition ease-in-out'
                                type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange}
                                placeholder='Password' />
                            {
                                showPassword ?
                                    <AiFillEye className='absolute right-3 top-9 text-xl cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)} />
                                    :
                                    <AiFillEyeInvisible className='absolute right-3 top-9 text-xl cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)} />
                            }
                        </div>
                        <div className='text-primary py-4 flex flex-row flex-wrap justify-between'>
                            <p>
                                Already have an account?&nbsp;
                                <Link to='/login' className='font-semibold
                                     hover:text-secondary hover:underline 
                                     '>
                                    Login
                                </Link>
                            </p>

                        </div>
                        <button className='w-full justify-center px-4 py-3 text-xl text-light
                            border-primary rounded-xl transition ease-in-out bg-secondary
                            hover:bg-accent hover:text-primary'
                            type='submit'>
                            Sign Up
                        </button>
                        <div className='my-4 flex items-center
                        before:border-t before:border-secondary before:flex-1
                    after:border-t after:border-secondary after:flex-1
                        '>
                            <p className='text-center text-primary font-semibold mx-2'>OR</p>
                        </div>

                        <OAuth />
                    </form>
                </div>
            </div>
        </section >
    )
}

export default Register