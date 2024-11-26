'use server'

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server'
import { isStrongPasword } from '@/utils/signIn';

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