import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// For client-side usage
// During build time, we use empty strings to prevent build errors
// In production, these will be replaced with actual values from environment
export const supabase =
  typeof window !== "undefined"
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Message = {
  id: string;
  user_id: string;
  raw_text: string;
  formatted_text: string;
  created_at: string;
};

// Auth functions
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password`,
  });
  return { data, error };
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Message functions
export async function saveMessage(
  userId: string,
  rawText: string,
  formattedText: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      user_id: userId,
      raw_text: rawText,
      formatted_text: formattedText,
    })
    .select()
    .single();
  return { data, error };
}

export async function getMessages(userId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
  return { data, error };
}

export async function deleteMessage(messageId: string) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId);
  return { error };
}