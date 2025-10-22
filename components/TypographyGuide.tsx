
import React from 'react';
import type { FontPairing } from '../types';

interface TypographyGuideProps {
  typography: FontPairing;
}

// Function to create a Google Fonts link
const createFontLink = (fontName: string) => {
    const formattedFontName = fontName.replace(/ /g, '+');
    return `https://fonts.google.com/specimen/${formattedFontName}`;
}

const TypographyGuide: React.FC<TypographyGuideProps> = ({ typography }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 className="text-2xl font-bold mb-4 text-slate-200">Typography</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm uppercase tracking-widest text-sky-400 mb-2">Header Font</h4>
          <a href={createFontLink(typography.header)} target="_blank" rel="noopener noreferrer" className="text-4xl font-bold text-white hover:underline" style={{ fontFamily: `'${typography.header}', sans-serif` }}>
            {typography.header}
          </a>
          <p className="text-5xl mt-2" style={{ fontFamily: `'${typography.header}', sans-serif` }}>Aa</p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-sky-400 mb-2">Body Font</h4>
          <a href={createFontLink(typography.body)} target="_blank" rel="noopener noreferrer" className="text-4xl font-bold text-white hover:underline" style={{ fontFamily: `'${typography.body}', sans-serif` }}>
            {typography.body}
          </a>
          <p className="mt-2 text-slate-300" style={{ fontFamily: `'${typography.body}', sans-serif` }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypographyGuide;
