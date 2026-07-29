import { supabase } from "@/lib/supabase";

export async function signIn(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/* -------------------------
   User Role Helpers
-------------------------- */

export async function getCurrentUserRole() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data.role;
}

export async function isAdmin() {
  const role = await getCurrentUserRole();
  return role === "admin";
}

export async function isSupervisor() {
  const role = await getCurrentUserRole();
  return role === "supervisor";
}

export async function isStaff() {
  const role = await getCurrentUserRole();
  return role === "staff";
}