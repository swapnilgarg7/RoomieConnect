import React from 'react'
import { useLocation } from 'react-router-dom'
function Header() {
    const location = useLocation();

    function pathMatchRoute(route) {
        return location.pathname === route ? true : false
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div className='flex items-center py-1'>
                    <img src='/logo.png' alt='logo' className='w-[50px] h-[50px]' />
                    <h1 className='text-3xl text-primary font-'>Roomie Connect</h1>
                </div>
                <div>
                    <ul className='flex space-x-10 text-sm font-bold text-secondary'>
                        <li className={`cursor-pointer py-3 border-b-[3px] border-transparent
                        ${pathMatchRoute("/") && "text-primary border-b-accent"}`}>Home</li>
                        <li className={`cursor-pointer py-3 border-b-[3px] border-transparent
                        ${pathMatchRoute("/offers") && "text-primary border-b-accent"}`}>Offers</li>
                        <li className={`cursor-pointer py-3 border-b-[3px] border-transparent
                        ${pathMatchRoute("/login") && "text-primary border-b-accent"}`}>Login</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header