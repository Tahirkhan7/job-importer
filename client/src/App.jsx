import React, { useEffect, useState } from 'react';
import { fetchImportLogs, triggerImport } from './services/api';
import ImportHistoryTable from './components/ImportHistoryTable';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleImport = async () => {
    setLoading(true);
    await triggerImport();
    await getLogs();
    setLoading(false);
  };

  useEffect(() => {
  getLogs();
}, []);

const getLogs = async () => {
  const { data } = await fetchImportLogs();
  setLogs(data);
};


  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Job Importer Dashboard</h1>
      <button onClick={handleImport} disabled={loading}>
        {loading ? 'Importing...' : 'Trigger Import'}
      </button>
      <hr style={{ margin: '1rem 0' }} />
      <ImportHistoryTable logs={logs} />
    </div>
  );
}

export default App;
