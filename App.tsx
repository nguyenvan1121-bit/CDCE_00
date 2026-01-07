import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import DataTable from './components/DataTable';
import { fetchSheetData, SHEET_ID } from './services/dataService';
import { DataRow } from './types';
import { Zap, List, LayoutGrid, CheckCircle2, Loader2, AlertCircle, ExternalLink, Search as SearchIcon } from 'lucide-react';

const App: React.FC = () => {
  const [dataset, setDataset] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<{ match: DataRow } | null>(null);
  const [viewMode, setViewMode] = useState<'search' | 'all'>('search');

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const data = await fetchSheetData();
        setDataset(data);
        setError(null);
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Connection error. Ensure the data source is accessible.");
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleSelect = useCallback((item: DataRow | null) => {
    if (!item) {
      setActiveResult(null);
      return;
    }
    setActiveResult({ match: item });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] right-[-10%] w-[100vw] h-[100vw] bg-indigo-200/20 blur-[200px] rounded-full animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-blue-200/20 blur-[180px] rounded-full animate-pulse duration-[8s]"></div>
      </div>

      <header className="w-full py-4 px-6 md:px-12 border-b border-white/40 bg-white/70 backdrop-blur-2xl sticky top-0 z-[2000] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-yellow-400 h-5 w-5 fill-yellow-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">IntelliSearch</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-all ${
              !loading && !error ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
              error ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
              <span className="text-[9px] font-black uppercase tracking-widest">
                {loading ? 'Syncing' : `${dataset.length} Records`}
              </span>
            </div>
            <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}`} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-2">
              Source <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto px-6 py-10 w-full">
        <div className="flex justify-center gap-2 p-1.5 bg-slate-200/40 rounded-full w-fit mx-auto backdrop-blur-xl border border-white/60 mb-12 shadow-sm">
          <button onClick={() => setViewMode('search')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'search' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}>Explore</button>
          <button onClick={() => setViewMode('all')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'all' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}>Database</button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Updating Database...</p>
          </div>
        ) : viewMode === 'search' ? (
          <div className="space-y-12 max-w-5xl mx-auto">
            <SearchBar data={dataset} onSelect={handleSelect} />
            {activeResult ? <ResultCard result={activeResult} /> : (
              <div className="bg-white/40 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
                <SearchIcon className="h-10 w-10 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 text-sm">Search for a Part Number to see results</p>
              </div>
            )}
          </div>
        ) : (
          <DataTable 
            data={dataset} 
            onSelect={(item: DataRow) => { handleSelect(item); setViewMode('search'); }} 
            activeId={activeResult?.match.columnA} 
          />
        )}
      </main>
    </div>
  );
};

export default App;