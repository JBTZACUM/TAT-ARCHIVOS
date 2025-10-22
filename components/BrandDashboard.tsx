
import React from 'react';
import type { BrandIdentity, LogoData } from '../types';
import ColorPalette from './ColorPalette';
import LogoDisplay from './LogoDisplay';
import TypographyGuide from './TypographyGuide';

interface BrandDashboardProps {
  identity: BrandIdentity | null;
  logos: LogoData | null;
}

const BrandDashboard: React.FC<BrandDashboardProps> = ({ identity, logos }) => {
  const isReady = identity && logos;

  const fontHeader = identity?.typography.header.replace(/ /g, '+');
  const fontBody = identity?.typography.body.replace(/ /g, '+');
  const fontLink = `https://fonts.googleapis.com/css2?family=${fontHeader}&family=${fontBody}&display=swap`;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
        {isReady && <link href={fontLink} rel="stylesheet" />}
      <h2 className="text-4xl font-extrabold text-center mb-6 text-white">Your Brand Bible</h2>
      <div className="space-y-8">
        <LogoDisplay logos={logos} />
        {identity ? <ColorPalette palette={identity.palette} /> : <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 h-48 animate-pulse"></div>}
        {identity ? <TypographyGuide typography={identity.typography} /> : <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 h-48 animate-pulse"></div>}
      </div>
    </div>
  );
};

export default BrandDashboard;
