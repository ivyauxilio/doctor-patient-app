// hooks/useRequireAuth.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

export default function useRequireAuth() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!user?.id;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    } else {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated, user };
}
