'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("Error")
    redirect('/error')
  }

  console.log("successfully signed up")
  revalidatePath('/', 'layout')
  redirect('/private')
}


export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("error");
    redirect('/error');
  }

  await revalidatePath('/', 'layout');
  redirect('/private')
}

export async function logout() {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error)
    redirect('/error')
  }
  console.log("logged out")
  revalidatePath('/', 'layout')
  revalidatePath('/private', 'layout')
  redirect('/')
}