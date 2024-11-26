import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import ApplicationPageClient from '@/components/ApplicationPageClient';

import { User } from "@/utils/globalTypes";

export default async function PrivatePage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/')
    }

    const user: User = {
        email: data.user.email ?? '',
        id: data.user.id ?? ''
    }
    
    
    let { data: applications, error: applicationsError } = await supabase
    .from('applications')
    .select('*')
    if (applicationsError) {
        console.error("Error fetching applications", applicationsError);
        return <p>Error fetching applications</p>;
    }
    return (
        <>
            <ApplicationPageClient user={user} />
        </>
    )
}