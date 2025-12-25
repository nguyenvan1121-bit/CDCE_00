import React, { useState, useMemo } from 'react';
import { DataRow } from '../types';
import { Hash, Type, Search, X, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface DataTableProps {
  data: DataRow[];
  onSelect: (item: DataRow) => void;
  activeId?: string;
}

const ROWS_PER_PAGE = 50;

const DataTable: React.FC<DataTableProps> = ({ data, onSelect, activeId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(ROWS_PER_PAGE);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(row => 
      row.columnB.toLowerCase().includes(term) || 
      row.columnC.toLowerCase().includes(term) || 
      row.columnD.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const displayedRows = useMemo(() => {
    return filteredData.slice(0, displayLimit);
  }, [filteredData, displayLimit]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm">
        <div className="flex items-center gap-4">
           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Record Browser</h3>
        </div>
        <div className="relative group flex-1 max-w-md">
          <input 
            type="text"
            placeholder="Search within records..."
            className="w-full pl-6 pr-4 py-3 bg-white rounded-xl border border-slate-100 text-sm font-bold outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">ID</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Part Number</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Description</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Make/Buy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedRows.map((row) => (
                <tr 
                  key={row.columnA}
                  onClick={() => onSelect(row)}
                  className={`cursor-pointer hover:bg-slate-50 transition-all ${activeId === row.columnA ? 'bg-indigo-50' : ''}`}
                >
                  <td className="px-8 py-6 text-sm font-black text-slate-300">{row.columnA}</td>
                  <td className="px-8 py-6 text-base font-black text-slate-800">{row.columnB}</td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-500 tracking-widest">{row.columnC}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">{row.columnD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;