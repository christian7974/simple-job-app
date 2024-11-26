import { useState } from "react";
import { useRouter } from "next/navigation";

import { login, signup, logout } from "@/utils/actions";

export default function LogInComponent() { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    async function handleLogin(event: any) {
        event.preventDefault();
        setErrorMessage("");
        const formData = new FormData(event.target as HTMLFormElement);
        const result = await login(formData);
        if (result.error) {
          setErrorMessage(result.error);
        } else {
          router.push("/private");
        }
      }

    return (
    <>
        <h1>Log in component</h1>
        <form onSubmit={handleLogin}>
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
        <button type="submit">Log in</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>)
}   