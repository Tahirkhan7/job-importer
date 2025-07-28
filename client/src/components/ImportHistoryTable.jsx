import React from 'react';

export default function ImportHistoryTable({ logs }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Feed URL</th>
          <th>Total</th>
          <th>New</th>
          <th>Updated</th>
          <th>Failed</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, idx) => (
          <tr key={idx}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.feedUrl}</td>
            <td>{log.totalFetched}</td>
            <td>{log.newJobs}</td>
            <td>{log.updatedJobs}</td>
            <td>{log.failedJobs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
