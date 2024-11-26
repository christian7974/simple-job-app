import { logout } from "@/utils/actions";

import { User } from "@/utils/globalTypes";

export default function ApplicationPageClient({ user }: { user: User }) {
    return (
        <>
            <h1>{user.email}</h1>
            <button onClick={logout}>Logout</button>
        </>)
}