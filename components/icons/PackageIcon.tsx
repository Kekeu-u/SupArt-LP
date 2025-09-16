import React from 'react';

const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811V8.28a2.25 2.25 0 00-1.88-2.22l-7.5-1.125a2.25 2.25 0 00-2.24 0L1.88 6.06A2.25 2.25 0 000 8.28v8.532a2.25 2.25 0 001.88 2.22l7.5 1.125a2.25 2.25 0 002.24 0l7.5-1.125A2.25 2.25 0 0021 16.811z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-9M21 8.28l-9 3.375-9-3.375M3 13.18l9 3.375 9-3.375" />
  </svg>
);

export default PackageIcon;