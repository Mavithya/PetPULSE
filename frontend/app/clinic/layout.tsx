'use client';

import React from 'react';
import { DashboardLayout } from '@/app/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isAuthenticated } = useAuth();

  // Redirect if not a clinic
  if (!isAuthenticated || role !== 'clinic') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-600 dark:text-slate-400">
          Access denied. Please login as a clinic.
        </p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
