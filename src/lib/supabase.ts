import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a lazy-initialized client that only creates when env vars are available
let supabaseInstance: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Return a mock client for build time / missing env vars
      // This allows the build to succeed even without env vars
      console.warn("Supabase environment variables are not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    supabaseInstance = createClient(
      supabaseUrl || "https://placeholder.supabase.co",
      supabaseAnonKey || "placeholder-key"
    );
  }
  return supabaseInstance;
}

// Export as a getter to avoid initialization at build time
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabase();
    return client[prop as keyof SupabaseClient];
  }
});

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