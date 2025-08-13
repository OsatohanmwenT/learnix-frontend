"use server";

import { getSession } from "@/lib/actions/session";
import { redirect } from "next/navigation";

export type UserRole = "student" | "instructor" | "admin";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  image?: string;
}

/**
 * Check if user has required role(s)
 */
export async function hasRole(
  user: AuthUser | null,
  allowedRoles: UserRole[]
): Promise<boolean> {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Check if user is an instructor or admin
 */
export async function isInstructorOrAdmin(
  user: AuthUser | null
): Promise<boolean> {
  return hasRole(user, ["instructor", "admin"]);
}

/**
 * Check if user is an admin
 */
export async function isAdmin(user: AuthUser | null): Promise<boolean> {
  return hasRole(user, ["admin"]);
}

/**
 * Require authentication and specific role(s)
 * Redirects to appropriate page if not authorized
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getSession();
  const user = session.user as AuthUser | null;

  // If no user, redirect to sign-in
  if (!user) {
    redirect("/sign-in");
  }

  // Check if user has required role
  if (!hasRole(user, allowedRoles)) {
    redirect("/not-allowed");
  }

  return user;
}

/**
 * Require instructor or admin role
 */
export async function requireInstructorOrAdmin() {
  return await requireRole(["instructor", "admin"]);
}

/**
 * Require admin role
 */
export async function requireAdmin() {
  return await requireRole(["admin"]);
}

/**
 * Get current user with optional role check
 */
export async function getCurrentUser(requiredRoles?: UserRole[]) {
  const session = await getSession();
  const user = session.user as AuthUser | null;

  if (requiredRoles && requiredRoles.length > 0) {
    if (!user) {
      redirect("/sign-in");
    }
    if (!hasRole(user, requiredRoles)) {
      redirect("/not-allowed");
    }
  }

  return user;
}
