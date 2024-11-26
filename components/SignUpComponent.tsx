"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signup } from "@/utils/actions";
import { isStrongPasword } from "@/utils/signIn";

export default function SignUpComponent() {

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignup(event: any) {
        event.preventDefault();
        setErrorMessage("");  
        setLoading(true);
        const formData = new FormData(event.target);
        const result = await signup(formData);
        if (password != confirmPassword) {
          setErrorMessage("Passwords do not match");
          setLoading(false);
          return;
        }
        if (email != confirmEmail) { 
          setErrorMessage("Emails do not match");
          setLoading(false);
          return;
        }

        if (!isStrongPasword(password)) { 
          setErrorMessage("Password must be 8 characters long, contain an uppercase and lowercase letter, a number and a special character.");
          setLoading(false);
          return;
        }

        if (result.error) {
          setErrorMessage(result.error);
          setLoading(false);
        } else {
          router.push("/private");
        }
      }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="email">Email:</label>
                <input
                id="email"
                className="text-black"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="email">Confirm Email:</label>
                <input
                id="confirmEmail"
                className="text-black"
                name="confirmEmail"
                type="email"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                id="password"
                className="text-black"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Confirm Password:</label>
                <input
                id="confirmPassword"
                className="text-black"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">{loading ? "Signing you up!" : "Sign Up"}</button>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </>
    )
}