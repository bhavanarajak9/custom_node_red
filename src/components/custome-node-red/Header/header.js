// HeaderBar.jsx
import React from 'react';
import './HeaderBar.css';

// HeaderBar.jsx
const HeaderBar = ({ onDeploy, flowName, onFlowNameChange }) => {
  return (
    <div className="header-bar">
      <div className="left-section">
        <input
          type="text"
          placeholder="Filter Nodes"
          className="input filter-input"
        />

        <div className="workflow-group">
          <label htmlFor="workflow-name" className="workflow-label">Workflow Name</label>
          <input
            id="workflow-name"
            type="text"
            value={flowName}
            onChange={(e) => onFlowNameChange(e.target.value)}
            placeholder="A series of actions when an alarm occurs"
            className="input workflow-input"
          />
        </div>
      </div>

      <div className="right-section">
        <button className="btn settings-btn">Settings</button>
        <button className="btn debug-btn">Debug</button>
        <button className="btn deploy-btn" onClick={onDeploy}>Deploy</button>
      </div>
    </div>
  );
};


export default HeaderBar;
