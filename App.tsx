
import React, { useState, useEffect } from 'react';
import BrandInputForm from './components/BrandInputForm';
import BrandDashboard from './components/BrandDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import ChatBot from './components/ChatBot';
import { generateBrandIdentity, generateLogos, initializeChat } from './services/geminiService';
import type { BrandIdentity, LogoData } from './types';

function App() {
  const [mission, setMission] = useState<string>('');
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
  const [logos, setLogos] = useState<LogoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  const handleGenerate = async () => {
    if (!mission.trim()) return;

    setIsLoading(true);
    setError(null);
    setBrandIdentity(null);
    setLogos(null);

    try {
      // Use Promise.all to run both API calls concurrently
      const [identityResult, logosResult] = await Promise.all([
        generateBrandIdentity(mission),
        generateLogos(mission)
      ]);
      
      setBrandIdentity(identityResult);
      setLogos(logosResult);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center mt-12 flex flex-col items-center gap-4">
          <LoadingSpinner size={16} />
          <h2 className="text-2xl font-semibold text-slate-300">Summoning Creative Spirits...</h2>
          <p className="text-slate-400 max-w-md">Our AI is crafting your unique brand identity. This might take a moment.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center mt-12 bg-red-900/50 border border-red-700 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-300">Generation Failed</h2>
          <p className="text-red-400 mt-2">{error}</p>
          <p className="text-slate-400 mt-4 text-sm">Please check your connection, adjust your prompt, and try again.</p>
        </div>
      );
    }
    if (brandIdentity && logos) {
      return <BrandDashboard identity={brandIdentity} logos={logos} />;
    }
    return (
        <div className="text-center mt-12">
            <h2 className="text-4xl font-extrabold text-white">Welcome to the Brand Oracle</h2>
            <p className="text-slate-400 mt-2">Let's build your brand's identity from the ground up.</p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
          AI Brand Identity Generator
        </h1>
      </header>
      <main>
        <BrandInputForm
          mission={mission}
          setMission={setMission}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
        <div className="mt-8">
            {renderContent()}
        </div>
      </main>
      <ChatBot />
    </div>
  );
}

export default App;
