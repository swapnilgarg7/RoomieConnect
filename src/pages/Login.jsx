import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import OAuth from '../components/OAuth'
import { Link } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }
    );
    const { email, password } = formData;

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    function onChange(e) {

        setFormData({ ...formData, [e.target.id]: e.target.value });

    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                navigate('/');
                toast.success(`Welcome ${userCredential.user.displayName}`);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <section>
            <h1 className='text-3xl text-center text-primary my-6 font-bold'>Sign In</h1>
            <div className='flex flex-col md:flex-row  flex-wrap justify-center items-center px-6 py-12
                max-w-6xl mx-auto'>
                <div className='w-full md:w-[50%] mb-12 pt-12'>
                    <img className='w-full rounded-xl'

                        alt='Sign In'
                        src='https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' />
                </div>
                <div className='w-full md:w-[40%] md:ml-20'>
                    <form onSubmit={onSubmit}>
                        <input className='w-full justify-center px-4 py-2 text-xl text-secondary
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
                                Don&apos;t have an account?&nbsp;
                                <Link to='/register' className='font-semibold
                                     hover:text-secondary hover:underline 
                                     '>
                                    Register
                                </Link>
                            </p>
                            <p>
                                <Link to='/forgotpassword' className='font-semibold hover:text-secondary hover:underline '>
                                    Forgot Password?
                                </Link>
                            </p>
                        </div>

                        <button className='w-full justify-center px-4 py-3 text-xl text-light
                            border-primary rounded-xl transition ease-in-out bg-secondary
                            hover:bg-accent hover:text-primary'
                            type='submit'>
                            Sign In
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

export default Login