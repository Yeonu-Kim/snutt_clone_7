'use client';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App').then((module) => module.App));

export function ClientOnly() {
  return <App />;
}
