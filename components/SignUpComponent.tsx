"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signup } from "@/utils/actions";
import { isStrongPasword } from "@/utils/signIn";
import CredentialTextInput from "./CredentialTextInput";

export default function SignUpComponent() {

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            setErrorMessage("Check your email within 10 minutes to confirm your email address.");
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#B899FF] w-[80%] rounded-md gap-y-4 py-3">
            <h2>Sign Up</h2>
            <button 
                className="show-password-button bg-[#F1EBFF]"
                onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? "Hide Passwords" : "Show Passwords"}</button>
            <form onSubmit={handleSignup} className="flex flex-col items-center w-full gap-y-3">
                <label htmlFor="email">Email:</label>
                <CredentialTextInput 
                    id="email"
                    name="email"
                    type="email"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Confirm Email:</label>
                <CredentialTextInput
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    required
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <CredentialTextInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Confirm Password:</label>
                <CredentialTextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                    className="submit-button"
                    type="submit">{loading ? "Signing you up!" : "Sign Up"}</button>
            </form>
            {errorMessage && 
                <div className="credential-error-message">
                    <p>{errorMessage}</p>
                </div>}
        </div>
    )
}