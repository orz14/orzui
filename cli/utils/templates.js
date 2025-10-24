function getComponentTemplate(component, config) {
  const templates = {
    button: getButtonTemplate(config),
    card: getCardTemplate(config),
    input: getInputTemplate(config),
    badge: getBadgeTemplate(config),
    alert: getAlertTemplate(config),
    avatar: getAvatarTemplate(config),
  };

  return templates[component] || "";
}

function getButtonTemplate(config) {
  if (config.typescript) {
    return `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
      outline:
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent active:bg-blue-100',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent active:bg-gray-200',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
`;
  }

  // JavaScript version
  return `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
      outline:
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent active:bg-blue-100',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent active:bg-gray-200',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
`;
}

function getCardTemplate(config) {
  if (config.typescript) {
    return `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      shadow = 'md',
      bordered = false,
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const shadows = {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg transition-all duration-200',
          paddings[padding],
          shadows[shadow],
          bordered && 'border border-gray-200',
          hoverable && 'hover:shadow-lg cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
`;
  }

  return `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Card = React.forwardRef(
  (
    {
      padding = 'md',
      shadow = 'md',
      bordered = false,
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const shadows = {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg transition-all duration-200',
          paddings[padding],
          shadows[shadow],
          bordered && 'border border-gray-200',
          hoverable && 'hover:shadow-lg cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
`;
}

function getInputTemplate(config) {
  if (config.typescript) {
    return `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      inputSize = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    const baseStyles =
      'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

    const normalStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

        <div className="relative">
          {leftIcon && (
            <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              baseStyles,
              normalStyles,
              sizes[inputSize],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {!error && helperText && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
`;
  }

  return `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      inputSize = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    const baseStyles =
      'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

    const normalStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

        <div className="relative">
          {leftIcon && (
            <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              baseStyles,
              normalStyles,
              sizes[inputSize],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {!error && helperText && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
`;
}

function getBadgeTemplate(config) {
  const template = config.typescript
    ? `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';`
    : `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Badge = React.forwardRef(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';`;

  return template;
}

function getAlertTemplate(config) {
  const template = config.typescript
    ? `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  title?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', title, className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-50 border-gray-200 text-gray-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        {title && <h5 className="mb-1 font-medium">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';`
    : `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Alert = React.forwardRef(
  ({ variant = 'default', title, className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-50 border-gray-200 text-gray-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        {title && <h5 className="mb-1 font-medium">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';`;

  return template;
}

function getAvatarTemplate(config) {
  const template = config.typescript
    ? `import * as React from 'react';
import { cn } from '@/lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', fallback, className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const showFallback = !src || imageError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden',
          sizes[size],
          className
        )}
        {...props}
      >
        {!showFallback && (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && (
          <span className="font-medium text-gray-600">
            {fallback || alt?.charAt(0).toUpperCase() || '?'}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';`
    : `import * as React from 'react';
import { cn } from '@/lib/cn';

export const Avatar = React.forwardRef(
  ({ src, alt, size = 'md', fallback, className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const showFallback = !src || imageError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden',
          sizes[size],
          className
        )}
        {...props}
      >
        {!showFallback && (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && (
          <span className="font-medium text-gray-600">
            {fallback || alt?.charAt(0).toUpperCase() || '?'}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';`;

  return template;
}

module.exports = { getComponentTemplate };
