
import React from 'react';
import type { LogoData } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface LogoDisplayProps {
  logos: LogoData | null;
}

const LogoImage: React.FC<{ base64: string, alt: string, className?: string }> = ({ base64, alt, className }) => (
    <img 
        src={`data:image/png;base64,${base64}`} 
        alt={alt} 
        className={`bg-white p-2 rounded-lg shadow-lg ${className}`} 
    />
);

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logos }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 className="text-2xl font-bold mb-4 text-slate-200">Logos & Marks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h4 className="text-sm uppercase tracking-widest text-sky-400 mb-2 text-center">Primary Logo</h4>
          <div className="flex justify-center items-center h-48">
            {logos?.primary ? (
              <LogoImage base64={logos.primary} alt="Primary Logo" className="max-h-full max-w-full" />
            ) : <LoadingSpinner size={12}/> }
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-sky-400 mb-2 text-center">Secondary Marks</h4>
          <div className="grid grid-cols-3 gap-4 h-48 items-center">
            {logos?.secondaries.map((logo, index) => (
              <div key={index} className="flex justify-center items-center h-24">
                  <LogoImage base64={logo} alt={`Secondary Mark ${index + 1}`} className="max-h-full max-w-full"/>
              </div>
            )) ?? Array(3).fill(0).map((_, i) => <div key={i} className="flex justify-center items-center h-24"><LoadingSpinner size={8} /></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDisplay;
