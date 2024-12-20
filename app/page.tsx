"use client"

import anime from 'animejs/lib/anime.es.js';

import { useState, useEffect, useRef } from 'react';
import LogInComponent from "@/components/LogInComponent";
import SignUpComponent from "@/components/SignUpComponent";

export default function Home() {
    const logInRef = useRef(null);
    useEffect(() => {
        anime({
            targets: logInRef.current,
            translateY: [-20, 0],
            opacity: [0, 1],
            easing: 'easeInOutSine',
            duration: 500,
            delay: 100
        })
        
    })
    const [loggingIn, setLoggingIn] = useState(true);
    
    return (
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center min-h-screen px-4">
            <div className="w-full md:w-[45%] flex flex-col items-center justify-center gap-y-4 max-[600px]:mb-4">
                <h1 className="text-center max-[600px]:mt-4">Simple Job Application Tracker</h1>
                <p 
                    className="leading-loose text-lg text-center max-[600px]:hidden">
                    This is a way for young professionals (or for anyone in any stage of life) to track their job applications. This was important
                    for me as it allowed me to make sure that I was not applying to the same company twice as well as to get a sense of the kind of places and jobs I was
                    applying to. Instead of using a Google Sheet, I wanted to create an app (not only is this an actual tool, but it gave me the opportunity to work with
                    React and <a href="https://www.supabase.com" target="blank" className="text-blue-400 hover:cursor-pointer active:text-blue-500">Supabase</a>).
                </p>
                <button
                    id="logInOrSignUp"
                    className="submit-button"
                    onClick={() => setLoggingIn(!loggingIn)}>
                    {loggingIn ? "No Account?" : "Existing Account?"}
                </button>
            </div>
            <div className="w-full md:w-[45%] flex flex-col justify-center items-center gap-y-7 lg:min-h-screen max-[500px]:mb-4" ref={logInRef}>
                {loggingIn ? <LogInComponent /> : <SignUpComponent />}
            </div>
        </div>
    );
}