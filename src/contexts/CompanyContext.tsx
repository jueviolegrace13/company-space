import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface CompanyBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
  faviconUrl?: string;
  customCss?: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  websiteUrl?: string;
  logoUrl?: string;
  branding: CompanyBranding;
  subscription: {
    plan: 'free' | 'standard' | 'premium';
    status: 'active' | 'inactive' | 'trial';
    expiresAt?: string;
  };
}

interface CompanyContextType {
  company: Company | null;
  isLoading: boolean;
  updateCompany: (data: Partial<Company>) => Promise<void>;
  updateBranding: (data: Partial<CompanyBranding>) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) {
        setCompany(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock company data
        const mockCompany: Company = {
          id: '1',
          name: 'Acme Corporation',
          description: 'Leading provider of innovative solutions',
          websiteUrl: 'https://acme.example.com',
          logoUrl: 'https://via.placeholder.com/150x50?text=ACME',
          branding: {
            primaryColor: '#0284c7',
            secondaryColor: '#0d9488',
            accentColor: '#f97316',
            logoUrl: 'https://via.placeholder.com/150x50?text=ACME',
          },
          subscription: {
            plan: 'standard',
            status: 'active',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        };
        
        setCompany(mockCompany);
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [user]);

  const updateCompany = async (data: Partial<Company>) => {
    if (!company) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update company data
      setCompany({
        ...company,
        ...data,
      });
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBranding = async (data: Partial<CompanyBranding>) => {
    if (!company) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update branding data
      setCompany({
        ...company,
        branding: {
          ...company.branding,
          ...data,
        },
      });
    } catch (error) {
      console.error('Error updating branding:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    company,
    isLoading,
    updateCompany,
    updateBranding,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};