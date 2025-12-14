import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='px-6 md:px-10 bg-white text-gray-700'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-16'>
                
                {/* Left: About */}
                <div>
                    <img className='mb-4 w-36' src={assets.logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
                    <p className='text-sm leading-6 text-gray-600'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.
                    </p>
                </div>

                {/* Center: Company Links */}
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Company</h3>
                    <ul className='space-y-2'>
                        <li><Link to="/" className='hover:text-blue-500 transition-all'>Home</Link></li>
                        <li><Link to="/about" className='hover:text-blue-500 transition-all'>About us</Link></li>
                        <li><Link to="/contact" className='hover:text-blue-500 transition-all'>Contacts</Link></li>
                        <li><Link to="/privacy" className='hover:text-blue-500 transition-all'>Privacy policy</Link></li>
                    </ul>
                </div>

                {/* Right: Contact */}
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Get in Touch</h3>
                    <ul className='space-y-2 text-sm'>
                        <li><span className='font-medium'>Phone:</span> +84-843-305-125</li>
                        <li><span className='font-medium'>Email:</span> 13dvhung@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className='border-t text-center py-4 text-sm text-gray-500'>
                © 2025 - All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
