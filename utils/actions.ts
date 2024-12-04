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

export async function addApplication(formData: FormData) {

    const supabase = await createClient();
    const id = Math.random().toString(36).substring(7);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
        return { error: "User not found" }
    }
    const newApplicationInfo: Application = {
        application_id: uuidv4() as string,
        user_id: user.id,
        company_name: formData.get('companyName') as string,
        job_title: formData.get('positionTitle') as string,
        application_date: formData.get('applicationDate') as string || new Date().toISOString(),
        status: formData.get('status') as string,
        notes: formData.get('applicationNotes') as string,
        application_link: formData.get('applicationLink') as string,
    };
    if (!newApplicationInfo.company_name) { 
        return { error: "Company Name is required" };
    }
    if (!newApplicationInfo.job_title) { 
        return { error: "Position Title is required" };
    }
    if (!newApplicationInfo.status) { 
        return {error: "Status is required" };
    }

    const {data, error} = await supabase.from('applications').insert([newApplicationInfo]);
    if (error) {
        return { error: error.message }
    } else {
        return {data: newApplicationInfo};
    }
}