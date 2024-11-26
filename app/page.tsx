"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

import LogInComponent from "@/components/LogInComponent";
import SignUpComponent from "@/components/SignUpComponent";

export default function Home() {
    /* 
    Home page when user gets to website
    */
    const router = useRouter();
    const [loggingIn, setLoggingIn] = useState(true);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Home Page</h1>
            <button id="logInOrSignUp" onClick={() => setLoggingIn(!loggingIn)}>{loggingIn ? "Sign Up" : "Log In"}</button>
            {loggingIn ? <LogInComponent /> : <SignUpComponent />}
        </div>
    );
}
