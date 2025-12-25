import React from 'react';
import { Hash, Tag, FileText, CheckCircle2, Layers } from 'lucide-react';
import { SearchResult } from '../types';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { match } = result;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl border border-white flex flex-col md:flex-row items-center gap-6 group">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
          <Hash className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="flex-1 text-center md:text-left overflow-hidden">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-0.5">Part Number</p>
          <h2 className="text-lg md:text-2xl font-semibold text-slate-900 tracking-tight truncate">{match.columnB}</h2>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100">
           <p className="text-[10px] font-bold text-slate-400">ID {match.columnA}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <Layers className="h-4 w-4 text-white opacity-60" />
              <p className="text-[8px] font-bold text-indigo-200 uppercase tracking-[0.4em]">Description</p>
            </div>
            <p className="text-lg md:text-2xl text-white font-medium leading-relaxed">{match.columnC}</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Decision Status</p>
          </div>
          <p className="text-md md:text-lg font-semibold text-slate-800 leading-relaxed">{match.columnD}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;