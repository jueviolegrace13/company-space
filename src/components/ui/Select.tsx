import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helperText, 
    className, 
    containerClassName, 
    onChange,
    ...props 
  }, ref) => {
    const id = React.useId();
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };
    
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={cn(
              'block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm appearance-none pr-10',
              error
                ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
                : 'border-gray-300',
              'border px-3 py-2',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-description` : undefined}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
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

Select.displayName = 'Select';