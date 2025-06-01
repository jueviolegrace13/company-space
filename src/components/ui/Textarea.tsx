import React from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, containerClassName, ...props }, ref) => {
    const id = React.useId();
    
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <textarea
          id={id}
          ref={ref}
          className={cn(
            'block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm min-h-[80px]',
            error
              ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
              : 'border-gray-300',
            'border px-3 py-2',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
          {...props}
        />
        
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

Textarea.displayName = 'Textarea';