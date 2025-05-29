
import React from 'react';

export const FontSizeIncreaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {/* Letra 'A' */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16L9.5 9L12 16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13.5H11" />
    {/* Sinal '+' */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 10.5V13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 12H17" />
  </svg>
);