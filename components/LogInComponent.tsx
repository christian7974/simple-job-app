"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/utils/actions";
import { validEmail } from "@/utils/logIn";
import CredentialTextInput from "@/components/CredentialTextInput";

export default function LogInComponent() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleLogin(event: any) {
        event.preventDefault();
        setErrorMessage("");
        setLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const result = await login(formData);

        if (!validEmail(email)) {
            setErrorMessage("Invalid email - please enter a valid email");
            setLoading(false);
            return;
        }

        if (result.error) {
            console.log(result);
            setErrorMessage(result.error);
            setLoading(false);
        } else {
            router.push("/private");
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#E89BAB] w-[80%] rounded-md gap-y-4 py-3">
            <h2>Log In</h2>
            <button 
                className="show-password-button bg-[#FFEBEB]"
                onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? "Hide Password" : "Show Password"}</button>
            <form onSubmit={handleLogin} className="flex flex-col items-center w-full gap-y-3">
                <label className="label-credential" htmlFor="email">Email:</label>
                <CredentialTextInput 
                    id="email"
                    name="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                />
                <label htmlFor="password">Password:</label>
                <CredentialTextInput 
                    id="password"
                    name="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    />
                
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}>{loading ? "Logging In..." : "Log In"}</button>
            </form>
            {errorMessage && 
                <div className="credential-error-message">
                    <p>{errorMessage}</p>
                </div>}
        </div>)
}   