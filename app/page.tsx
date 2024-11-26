"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, signup, logout } from "@/utils/actions";

import LogInComponent from "@/components/LogInComponent"; 
import SignUpComponent from "@/components/SignUpComponent";

export default function Home() {
  /* 
  Home page when user gets to website
  */
  const router = useRouter();
  // if (error || !data?.user) {
  //   console.log("not logged in");
  // } else {
  //   console.log("you are logged in as " + data.user.email);
  // }
  const [loggingIn, setLoggingIn] = useState(true);



  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <h1>Home page</h1>
    //   <form>
    //     <label htmlFor="email">Email:</label>
    //     <input id="email" className="text-black" name="email" type="email" required />
    //     <label htmlFor="password">Password:</label>
    //     <input id="password" className="text-black" name="password" type="password" required />
    //     <button formAction={login}>Log in</button>
    //     <button formAction={signup}>Sign up</button>
    //   </form>
    //   <HomePageClient />
    // </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Home Page</h1>
      <button id="logInOrSignUp" onClick={() => setLoggingIn(!loggingIn)}>{loggingIn ? "Sign Up" : "Log In"}</button>
      {loggingIn ?<LogInComponent /> : <SignUpComponent />}
      
    </div>
  );
}
