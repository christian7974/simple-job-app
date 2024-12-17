"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/utils/actions";
import { User } from "@/utils/globalTypes";
import ApplicationTable from "@/components/ApplicationTable";
import AddApplicationModal from "@/components/AddApplicationModal";
import { ApplicationsProvider, useApplications } from '@/contexts/ApplicationsContext';

export default function ApplicationPageClient({ user }: { user: User }) {
    return (
        <ApplicationsProvider>
            <ApplicationPageClientContext user={user} />
        </ApplicationsProvider>
    )
}

function ApplicationPageClientContext({user}: {user: User}) {
    const {applications, setApplications} = useApplications();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                setIsModalOpen(true);
            }
        })
    })

    useEffect(() => {
        async function fetchApplications() {
            console.log("fetching applications");
            const supabase = await createClient();
            const { data, error } = await supabase.from('applications').select('*').eq('user_id', user.id);
            data?.sort((a, b) => a.application_date > b.application_date ? 1 : -1);
            if (data) {
                console.log(data[0].application_date);
            }
            if (error) {
                console.error(error);
                return;
            }

            setApplications(data);
        }
        fetchApplications();
    }, []);

    return (
        <div className="flex flex-col p-4 gap-y-4 overflow-auto">
          <div className="flex flex-row justify-between">
            <h2 className="max-[700px]:text-3xl">{user.email}'s Applications</h2>
            <button className="submit-button" onClick={logout}>Logout</button>
          </div>
          {applications.length > 0 ? (
            <ApplicationTable />
          ) : (
            <p>No applications found.</p>
          )}
          <div className="text-center">
            <button 
                className="submit-button"
                onClick={() => setIsModalOpen(true)}>Add New Application</button>
          </div>
          <AddApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      );
}
