// Splash gate — redirects into onboarding the very first time, otherwise into
// the tab shell. Keeps the user on whichever flow they last finished.

import { Redirect } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';

export default function Splash() {
  const onboarded = useAppStore((s) => s.onboarded);
  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding'} />;
}
