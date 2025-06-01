import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({
      message: 'You must accept the terms and conditions',
    }),
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      companyName: '',
      acceptTerms: false,
    },
  });
  
  const watchFields = watch();
  
  const isStep1Valid = 
    watchFields.name?.length >= 2 && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchFields.email || '');
  
  const nextStep = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    }
  };
  
  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'company',
      });
      navigate('/onboarding');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  
  return (
    <Layout className="bg-gray-50">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              {step === 1
                ? 'Start with your personal information'
                : 'Set up your company details and password'}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              {step === 1 ? (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    error={errors.companyName?.message}
                    {...register('companyName')}
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    error={errors.password?.message}
                    helperText="At least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
                    {...register('password')}
                  />
                  
                  <div className="flex items-center">
                    <input
                      id="accept-terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      {...register('acceptTerms')}
                    />
                    <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                      I accept the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-error-600">{errors.acceptTerms.message}</p>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              {step === 1 ? (
                <Button
                  type="button"
                  className="w-full"
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                >
                  Continue
                </Button>
              ) : (
                <div className="flex flex-col space-y-3 w-full">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!isValid}
                  >
                    Create Account
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                </div>
              )}
              
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}