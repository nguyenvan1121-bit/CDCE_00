import { DataRow } from '../types';

export const SHEET_ID = '1P9EDUYJ4ew6fFOih63XIDUjSyWEdiije';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

function parseCSV(csv: string): string[][] {
  const lines: string[][] = [];
  const rows = csv.split(/\r?\n/);
  
  for (let row of rows) {
    if (!row.trim()) continue;
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    lines.push(values);
  }
  return lines;
}

export const fetchSheetData = async (): Promise<DataRow[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error('Failed to fetch spreadsheet data.');
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    return rows.slice(1).map((row, index) => ({
      columnA: row[0] || String(index + 1),
      columnB: row[1] || 'No Key',
      columnC: row[2] || 'N/A',
      columnD: row[3] || 'No result available'
    })).filter(row => row.columnB !== 'No Key' && row.columnB.length > 0);
  } catch (error) {
    console.error("Data Sync Error:", error);
    throw error;
  }
};