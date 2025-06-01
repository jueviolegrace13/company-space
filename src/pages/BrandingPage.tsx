import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useCompany } from '../contexts/CompanyContext';

const brandingSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  websiteUrl: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  logoUrl: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color'),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color'),
  customCss: z.string().optional(),
});

type BrandingFormData = z.infer<typeof brandingSchema>;

export function BrandingPage() {
  const { company, updateCompany, updateBranding, isLoading } = useCompany();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      name: company?.name || '',
      description: company?.description || '',
      websiteUrl: company?.websiteUrl || '',
      logoUrl: company?.logoUrl || '',
      primaryColor: company?.branding.primaryColor || '#0284c7',
      secondaryColor: company?.branding.secondaryColor || '#0d9488',
      accentColor: company?.branding.accentColor || '#f97316',
      customCss: company?.branding.customCss || '',
    },
  });
  
  const watchedColors = {
    primaryColor: watch('primaryColor'),
    secondaryColor: watch('secondaryColor'),
    accentColor: watch('accentColor'),
  };
  
  const onSubmit = async (data: BrandingFormData) => {
    try {
      await updateCompany({
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl || undefined,
        logoUrl: data.logoUrl || undefined,
      });
      
      await updateBranding({
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        accentColor: data.accentColor,
        customCss: data.customCss || undefined,
      });
    } catch (error) {
      console.error('Error updating branding:', error);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Company Branding</h1>
          <p className="text-gray-500 mt-1">
            Customize how your company appears to clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Update your company details and branding elements
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      label="Company Name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Description
                      </label>
                      <textarea
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={4}
                        {...register('description')}
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
                      )}
                    </div>
                    
                    <Input
                      label="Website URL"
                      type="url"
                      placeholder="https://example.com"
                      error={errors.websiteUrl?.message}
                      {...register('websiteUrl')}
                    />
                    
                    <Input
                      label="Logo URL"
                      type="url"
                      placeholder="https://example.com/logo.png"
                      error={errors.logoUrl?.message}
                      helperText="Enter a direct link to your logo image"
                      {...register('logoUrl')}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            className="h-10 w-10 border border-gray-300 rounded mr-2"
                            {...register('primaryColor')}
                          />
                          <Input
                            className="font-mono"
                            {...register('primaryColor')}
                          />
                        </div>
                        {errors.primaryColor && (
                          <p className="mt-1 text-sm text-error-600">{errors.primaryColor.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Secondary Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            className="h-10 w-10 border border-gray-300 rounded mr-2"
                            {...register('secondaryColor')}
                          />
                          <Input
                            className="font-mono"
                            {...register('secondaryColor')}
                          />
                        </div>
                        {errors.secondaryColor && (
                          <p className="mt-1 text-sm text-error-600">{errors.secondaryColor.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Accent Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            className="h-10 w-10 border border-gray-300 rounded mr-2"
                            {...register('accentColor')}
                          />
                          <Input
                            className="font-mono"
                            {...register('accentColor')}
                          />
                        </div>
                        {errors.accentColor && (
                          <p className="mt-1 text-sm text-error-600">{errors.accentColor.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom CSS (Advanced)
                    </label>
                    <textarea
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-mono text-sm"
                      rows={6}
                      placeholder="/* Add your custom CSS here */"
                      {...register('customCss')}
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">
                      Add custom CSS to further customize your client portal appearance.
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                  >
                    Reset to Defaults
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your branding will appear to clients
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className="h-16 flex items-center px-4"
                    style={{ backgroundColor: watchedColors.primaryColor, color: 'white' }}
                  >
                    <h3 className="font-bold">Header</h3>
                  </div>
                  
                  <div className="p-4 bg-white">
                    <div 
                      className="h-8 w-32 rounded mb-4 flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: watchedColors.primaryColor }}
                    >
                      Primary Button
                    </div>
                    
                    <div 
                      className="h-8 w-32 rounded mb-4 flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: watchedColors.secondaryColor }}
                    >
                      Secondary Button
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="h-2 rounded bg-gray-200"></div>
                      <div className="h-2 rounded bg-gray-200 w-5/6"></div>
                      <div className="h-2 rounded bg-gray-200 w-4/6"></div>
                    </div>
                    
                    <div 
                      className="text-sm font-medium"
                      style={{ color: watchedColors.accentColor }}
                    >
                      Accent Text / Links
                    </div>
                  </div>
                  
                  <div 
                    className="h-10 px-4 flex items-center text-sm"
                    style={{ backgroundColor: watchedColors.secondaryColor, color: 'white', opacity: 0.9 }}
                  >
                    Footer
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Color Palette</h4>
                    <div className="flex space-x-2">
                      <div 
                        className="h-8 w-8 rounded"
                        style={{ backgroundColor: watchedColors.primaryColor }}
                      ></div>
                      <div 
                        className="h-8 w-8 rounded"
                        style={{ backgroundColor: watchedColors.secondaryColor }}
                      ></div>
                      <div 
                        className="h-8 w-8 rounded"
                        style={{ backgroundColor: watchedColors.accentColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Choose colors that reflect your brand identity</li>
                      <li>Ensure text is readable against background colors</li>
                      <li>Consider accessibility for all users</li>
                      <li>Test your branding on mobile devices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}