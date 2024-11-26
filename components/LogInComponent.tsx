"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/utils/actions";
import { validEmail } from "@/utils/logIn";

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
          setErrorMessage("Invalid email");
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
      <h1>Log in component</h1>
      <button onClick={() => {setShowPassword(!showPassword)}}>{showPassword ? "Hide Password" : "Show Password"}</button>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className="text-black"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="text-black"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>{loading ? "Logging In..." : "Log In"}</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>)
}   