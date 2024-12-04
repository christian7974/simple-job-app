"use client"

import {useState, useEffect} from "react"

import { logout } from "@/utils/actions";
import { User } from "@/utils/globalTypes";
import { createClient } from "@/utils/supabase/client";

import ApplicationTable from "@/components/ApplicationTable";
import AddApplicationModal from "./AddApplicationModal";

export default function ApplicationPageClient({ user }: { user: User }) {
    const [applications, setApplications] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        async function fetchApplications() {
            const supabase = createClient();
            let { data: applications, error: applicationsError } = await supabase
            .from('applications')
            .select('*');
            if (applicationsError) {
                return;
            }
            applications && setApplications(applications);
        }
        fetchApplications();
        }, []);
    
    function handleAddApplication(newApplication: any) {
        setApplications([...applications, newApplication]);
    }
    return (
        <div className="flex flex-col p-4 overflow-auto">
            <div className="text-center">
                <h1>{user.email}'s Applications</h1>
                <button onClick={logout}>Logout</button>
            </div>
            {applications.length > 0 ? (
                <ApplicationTable applicationsList={applications} />
            ) : (
                <p>No applications found.</p>
            )}
            <div className="text-center">
                <button onClick={() => setIsModalOpen(true)}>Add New Application</button>
            </div>
            <AddApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onAddApplication={handleAddApplication}>
            </AddApplicationModal>
        </div>)
}