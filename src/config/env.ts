/**
 * Environment configuration for Vite / React client deployment (e.g. Vercel).
 * Sensitive API keys are never hardcoded and are read securely from environment variables.
 * For Vite client builds, environment variables are prefixed with VITE_.
 * On Vercel: Project Settings > Environment Variables > Add VITE_GEMINI_API_KEY
 */
export const GEMINI_API_KEY: string = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
export const APP_URL: string = (import.meta.env.VITE_APP_URL as string) || '';
