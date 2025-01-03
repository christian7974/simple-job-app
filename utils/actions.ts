'use server'

import { v4 as uuidv4 } from 'uuid';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server'
import { isStrongPasword } from '@/utils/signIn';
import { Application } from './globalTypes';

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        confirmEmail: formData.get('confirmEmail') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    if (data.email.length > 255 || data.password.length > 255) { 
        return { error: "Email and password must be less than 255 characters" }
    }

    if (data.password !== data.confirmPassword) {
        return { error: "Passwords do not match" }
    }
    if (!isStrongPasword(data.password)) {
        return { error: "Password must be 8 characters long, contain an uppercase and lowercase letter, a number and a special character." }
    }
    if (data.email !== data.confirmEmail) {
        return { error: "Emails do not match" }
    }
    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return { error: error.message }

    }

    revalidatePath('/', 'layout')
    return { success: true };

}


export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (data.email.length > 255 || data.password.length > 255) { 
        return { error: "Email and password must be less than 255 characters" }
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout');
    return { success: true };
}

export async function logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { error: error.message }

    }
    revalidatePath('/', 'layout')
    revalidatePath('/private', 'layout')
    return { success: true };

}

export async function verifyApplication(formData: FormData, inserting: boolean = true) {
    const supabase = await createClient();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
        return { error: "User not found" }
    }


    const applicationDate = formData.get('applicationDate') as string || new Date().toISOString().split('T')[0];
    const formattedDate = new Date(applicationDate).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    const newApplication: Application = {
        application_id: uuidv4() as string,
        user_id: user.id,
        company_name: formData.get('companyName') as string,
        job_title: formData.get('positionTitle') as string,
        application_date: formattedDate as string,
        status: formData.get('status') as string,
        notes: formData.get('applicationNotes') as string,
        application_link: formData.get('applicationLink') as string,
    };

    if (newApplication.company_name.length > 255 || newApplication.job_title.length > 255 || newApplication.status.length > 255) { 
        return { error: "Company Name, Position Title, and Status must be less than 255 characters" }
    }

    if (!newApplication.company_name) {
        return { error: "Company Name is required" };
    }
    if (!newApplication.job_title) {
        return { error: "Position Title is required" };
    }
    if (!newApplication.status) {
        return { error: "Status is required" };
    }
    if (newApplication.application_link && (!newApplication.application_link.startsWith('http://') && !newApplication.application_link.startsWith('https://'))) {
        return { error: "Application Link must start with http://" };
    }
    if (inserting) {
        return insertApplication(newApplication, supabase);
    }
}

export async function insertApplication(newApplication: Application, supabase: any) {
    const { data, error } = await supabase.from('applications').insert([newApplication]);
    if (error) {
        return { error: error.message }
    } else {
        return { data: newApplication };
    }
}

export async function updateApplication(newApplication: Application, supabase: any) {
    const { data, error } = await supabase.from('applications').update(newApplication).eq('application_id', newApplication.application_id).select();
    if (error) {
        return { error: error.message }
    } else {
        return { data: newApplication };
    }
}

export async function deleteApplicationBackend(application_id: string) {
    const supabase = await createClient();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
        return { error: "User not found" }
    }
    const { data, error } = await supabase.from('applications').delete().eq('application_id', application_id).select();
    if (error) {
        console.error(error);
        return;
    }
}