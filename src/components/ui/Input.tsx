import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      label, 
      error, 
      helperText, 
      className, 
      leftIcon, 
      rightIcon, 
      containerClassName, 
      ...props 
    }, 
    ref
  ) => {
    const id = React.useId();
    
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            id={id}
            ref={ref}
            className={cn(
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
              'border px-3 py-2',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-error-600" id={`${id}-error`}>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';