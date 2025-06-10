"use server";

import { signIn, signOut } from "@/auth";

export async function Login(provider: string) {
  await signIn(provider);
}

export async function Logout() {
  await signOut();
}
