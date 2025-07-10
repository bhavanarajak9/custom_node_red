import React, { useEffect, useRef } from 'react';
import './debug-panel.css';

const DebuggerPanel = ({ logs = [] }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
   <div className="debug-panel">
  <div className="debug-header">🪵 Debug Console</div>
  <div className="debug-log-list">
    {logs.length > 0 ? (
      logs.map((log, i) => (
        <div key={i} className="debug-log">{log}</div>
      ))
    ) : (
      <div className="debug-empty">No logs yet</div>
    )}
  </div>
</div>
  );
};


export default DebuggerPanel;


