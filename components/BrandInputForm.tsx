
import React from 'react';

interface BrandInputFormProps {
  mission: string;
  setMission: (mission: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const BrandInputForm: React.FC<BrandInputFormProps> = ({ mission, setMission, onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
        Describe Your Brand's Soul
      </h2>
      <p className="text-center text-slate-400 mb-6">
        Enter your company's mission, values, or a brief description. The more detail you provide, the better the results.
      </p>
      <div className="relative">
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          placeholder="e.g., 'To empower small businesses with accessible and user-friendly financial tools, fostering growth and economic inclusion.'"
          className="w-full h-36 p-4 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none transition-shadow"
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !mission.trim()}
        className="w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
      >
        {isLoading ? 'Generating...' : 'Create Brand Bible'}
      </button>
    </div>
  );
};

export default BrandInputForm;
