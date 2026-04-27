import React from 'react';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse bg-slate-200/60 dark:bg-slate-700/60 rounded-md ${className || ''}`} aria-hidden="true" {...props} />
  );
}
