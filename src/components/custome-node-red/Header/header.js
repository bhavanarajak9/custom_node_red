import React from 'react';
import './HeaderBar.css';
import { DownOutlined } from '@ant-design/icons';

const HeaderBar = ({ onDeploy, flowName, onFlowNameChange, onGlobalSettingsClick,setNodeletModalOpen }) => {
  return (
    <div className="header-bar">
      <div className="left-section">
        <input
          type="text"
          placeholder="Filter Nodes"
          className="input filter-input"
        />

        <div className="workflow-group">
          <label htmlFor="workflow-name" className="workflow-label">
            Workflow Name
          </label>
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
        <button className="btn violet-btn" onClick={onGlobalSettingsClick}>
          Global Settings <DownOutlined style={{ fontSize: '10px', marginLeft: 4 }} />
        </button>
        <button className="btn violet-btn" onClick={() => setNodeletModalOpen(true)}>
          Nodelets Management
        </button>
        <button className="btn violet-btn">Test</button>
        <button className="btn violet-btn">Save</button>
        <button className="btn violet-btn" onClick={onDeploy}>
          Deploy
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
