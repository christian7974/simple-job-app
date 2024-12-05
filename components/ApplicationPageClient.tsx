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
        async function fetchApplications() {
            const supabase = await createClient();
            const { data, error } = await supabase.from('applications').select('*').eq('user_id', user.id);
            if (error) {
                console.error(error);
                return;
            }

            setApplications(data);
        }
        fetchApplications();
    }, [user.id, setApplications]);

    return (
        <div className="flex flex-col p-4 overflow-auto">
          <div className="text-center">
            <h1>{user.email}'s Applications</h1>
            <button onClick={logout}>Logout</button>
          </div>
          {applications.length > 0 ? (
            <ApplicationTable />
          ) : (
            <p>No applications found.</p>
          )}
          <div className="text-center">
            <button onClick={() => setIsModalOpen(true)}>Add New Application</button>
          </div>
          <AddApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      );
}
