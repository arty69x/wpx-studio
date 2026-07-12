import { AuthExperience } from '@/components/artyverse/AuthExperience';
import type { AuthMode } from '@/data/artyverse-platform';
import './auth.css';

export default async function AuthPage({ params }: { params: Promise<{ mode?: string[] }> }) {
  const { mode } = await params;
  const candidate = mode?.[0] as AuthMode | undefined;
  const valid: AuthMode[] = ['login', 'register', 'otp', 'forgot-password', 'reset-password'];
  return <AuthExperience initialMode={candidate && valid.includes(candidate) ? candidate : 'login'} />;
}
