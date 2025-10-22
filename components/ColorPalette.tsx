
import React, { useState } from 'react';
import type { ColorInfo } from '../types';
import CopyIcon from './icons/CopyIcon';

interface ColorPaletteProps {
  palette: ColorInfo[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ palette }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 className="text-2xl font-bold mb-4 text-slate-200">Color Palette</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {palette.map((color) => (
          <div key={color.hex} className="flex flex-col">
            <div
              className="h-24 w-full rounded-md border border-slate-600 shadow-lg"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="mt-2 text-left">
              <p className="font-bold text-white">{color.name}</p>
              <div className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-sky-400" onClick={() => handleCopy(color.hex)}>
                <span>{copiedHex === color.hex ? 'Copied!' : color.hex}</span>
                {copiedHex !== color.hex && <CopyIcon className="h-4 w-4" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">{color.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
