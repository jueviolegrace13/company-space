import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../lib/utils';
import { useCompany } from '../../contexts/CompanyContext';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  withoutFooter?: boolean;
}

export function Layout({ children, className, withoutFooter = false }: LayoutProps) {
  const { company } = useCompany();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn('flex-grow', className)}>
        {children}
      </main>
      {!withoutFooter && (
        <Footer 
          companyName={company?.name || 'CommunityHub'} 
          logoUrl={company?.logoUrl} 
        />
      )}
    </div>
  );
}