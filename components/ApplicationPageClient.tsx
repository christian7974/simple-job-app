"use client"

import {useState, useEffect} from "react"

import { logout } from "@/utils/actions";
import { User } from "@/utils/globalTypes";
import { createClient } from "@/utils/supabase/client";

export default function ApplicationPageClient({ user }: { user: User }) {
    const [applications, setApplications] = useState<any[]>([]);
    console.log(user.id);
    useEffect(() => {
        async function fetchApplications() {
            console.log("Fetching applications for user ID:", user.id);
            const supabase = createClient();
            let { data: applications, error: applicationsError } = await supabase
            .from('applications')
            .select('*'); // Ensure the query filters by user ID
            if (applicationsError) {
            console.error("Error fetching applications", applicationsError);
            return;
            }

            console.log("Fetched applications:", applications);
            applications && setApplications(applications);
        }
    
        fetchApplications();
      }, []); // Add refresh as a dependency

    return (
        <>
            <h1>{user.email}'s Applications</h1>
            <button onClick={logout}>Logout</button>
            {applications.length > 0 ? (
                <ul>
                    {applications.map((app, index) => (
                        <li key={index}>{JSON.stringify(app)}</li>
                    ))}
                </ul>
            ) : (
                <p>No applications found.</p>
            )}
        </>)
}