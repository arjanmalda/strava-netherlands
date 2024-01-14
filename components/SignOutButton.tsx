'use client';

import { Button } from '@/components/Button';
import { deleteTokens } from '@/utils/deleteTokens';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export const SignOutButton = () => {
  const router = useRouter();
  const signOut = useCallback(() => {
    deleteTokens();
    router.push('/login');
  }, []);

  return (
    <Button onClick={signOut} look="primary" icon="ArrowLeftOnRectangleIcon">
      <span>Sign out</span>
    </Button>
  );
};
