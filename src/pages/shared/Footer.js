import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import footerLogo from '../../assets/footerLogo.png'

const Footer = () => {
    return (
        <footer className="flex p-4 lg:px-20 lg:py-10 bg-zinc-900 text-light w-full">
            <div>
                <img src={footerLogo} alt="" className='h-16 ' />
                <p>Phone Kinun Co. Ltd.<br />Providing reliable service since 2021</p>
            </div>
            <div className='flex gap-2 lg:gap-6 items-center justify-center flex-1'>
                <div className='bg-zinc-800 h-10 w-10 rounded-full grid place-items-center hover:scale-105 duration-00'>
                    <FaFacebook className='text-primary text-2xl' />
                </div>
                <div className='bg-zinc-800 h-10 w-10 rounded-full grid place-items-center hover:scale-105 duration-00'>
                    <FaLinkedin className='text-primary text-2xl' />
                </div>
                <div className='bg-zinc-800 h-10 w-10 rounded-full grid place-items-center hover:scale-105 duration-00'>
                    <FaGithub className='text-primary text-2xl' />
                </div>
                <div className='bg-zinc-800 h-10 w-10 rounded-full grid place-items-center hover:scale-105 duration-00'>
                    <FaInstagram className='text-primary text-2xl' />
                </div>
            </div>

        </footer>
    );
};

export default Footer;