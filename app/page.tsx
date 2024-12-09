"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import LogInComponent from "@/components/LogInComponent";
import SignUpComponent from "@/components/SignUpComponent";

export default function Home() {
    /* 
    Home page when user gets to website
    */
    const router = useRouter();
    const [loggingIn, setLoggingIn] = useState(true);

    return (
        <div className="flex justify-between px-10">
            <div className="w-[45%] flex flex-col items-center justify-center gap-y-4">
                <h1 className="">Home Page</h1>
                <button 
                    id="logInOrSignUp" 
                    className="submit-button"
                    onClick={() => setLoggingIn(!loggingIn)}>{loggingIn ? "No Account?" : "Existing Account?"}</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-7 w-[45%] min-h-screen">
                {loggingIn ? <LogInComponent /> : <SignUpComponent />}
            </div>
        </div>
    );
}
