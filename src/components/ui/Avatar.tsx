import React from 'react';
import { cn, generateAvatarFallback } from '../../lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ src, alt = '', name = '', size = 'md', className, ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };
  
  const fallbackText = name ? generateAvatarFallback(name) : alt ? generateAvatarFallback(alt) : '??';
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={cn(
        'relative inline-block overflow-hidden rounded-full bg-gray-100',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 font-medium">
          {fallbackText}
        </div>
      )}
    </div>
  );
}