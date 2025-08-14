import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Decode JWT and return payload object. Safe for non-existent or invalid tokens.
export function decodeJwtPayload<T = any>(token: string | null | undefined): T | null {
  if (!token) return null;
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(json))) as T
  } catch {
    return null
  }
}
