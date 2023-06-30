import React, { useState } from 'react'

function CreatePost() {

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
    });
    const { name, contact, vacancy, washroom, ac, furnished, gender, bhk, rent, address, description, } = formData;



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
    return (
        <div className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center text-primary my-6 font-bold mb-12'>Create Post</h1>

            <form>
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

                <p className='text-primary text-2xl font-semibold'>Additional Description/Details:</p>
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