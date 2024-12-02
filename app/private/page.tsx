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
    
    return (
        <>
            <ApplicationPageClient user={user} />
        </>
    )
}