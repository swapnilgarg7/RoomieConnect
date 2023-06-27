import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Profile() {

    const auth = getAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const { name, email } = formData;

    function onChange(e) {
    }

    function onLogout() {
        auth.signOut();
        navigate('/login');
        toast.success('Logged out successfully');
    }

    return (
        <div>
            <section className='max-w-6xl flex flex-col items-center justify-content mx-auto'>
                <h1 className='text-3xl text-center text-primary my-6 font-bold'>Profile</h1>

                <div className='w-full md:w-1/2 px-3'>
                    <form>
                        <input className='w-full justify-center px-4 py-2 text-xl text-secondary
                            border-primary rounded-xl transition ease-in-out bg-white'
                            type='text' id="name" value={name} onChange={onChange}
                            disabled placeholder='Name' />
                        <input className='w-full justify-center px-4 py-2 text-xl text-secondary
                            border-primary rounded-xl transition ease-in-out bg-white mt-2 mb-6'
                            type='email' id="email" value={email} onChange={onChange}
                            disabled placeholder='Email Address' />

                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 px-2'>
                            <p className='flex items-center text-light
                            border-primary rounded-xl transition ease-in-out bg-secondary
                            hover:bg-accent hover:text-primary py-2 px-4 cursor-pointer'>
                                <span className=''>
                                    Edit your name</span>
                            </p>
                            <p className='text-light
                            border-primary rounded-xl transition ease-in-out bg-red-500
                            hover:bg-red-800 hover:text-light py-2 px-4 cursor-pointer'
                                onClick={onLogout}>
                                Log Out
                            </p>

                        </div>
                    </form>

                </div>

            </section>
        </div>
    )
}

export default Profile