// sidebar-list.jsx
import React from 'react';
import './sidbar.css';

const toolbox = [
  {
    group: "Trigger",
    items: [
      { id: "trigger_manual", label: "Manually", type: "trigger", color: "#E67E22" },
      { id: "trigger_schedule", label: "On a Schedule", type: "trigger", color: "#E67E22" },
      { id: "trigger_kafka", label: "Kafka Trigger", type: "trigger", color: "#E67E22" },
      { id: "trigger_webhook", label: "Webhook Trigger", type: "trigger", color: "#E67E22" }
    ]
  },
  {
    group: "Common",
    items: [
      { id: "common_python", label: "Python Function", type: "function", color: "#16A085" },
      { id: "common_http", label: "HTTP Request", type: "function", color: "#16A085" },
      { id: "common_webhook", label: "Webhook", type: "function", color: "#16A085" },
      { id: "common_time", label: "Date & Time", type: "function", color: "#16A085" },
      { id: "common_switch", label: "Switch", type: "function", color: "#16A085" },
      { id: "common_filter", label: "Filter", type: "function", color: "#16A085" },
      { id: "common_send_mail", label: "Send Mail", type: "function", color: "#16A085" },
      { id: "common_loop", label: "loop", type: "function", color: "#16A085" },
      { id: "common_merge", label: "merge", type: "function", color: "#16A085" },
    ]
  },
  {
    group: "Action in an app",
    items: [
      { id: "action_worst_param", label: "Get Worst Param", type: "action", color: "#3498DB" },
      { id: "action_rca", label: "Root Cause Analysis", type: "action", color: "#3498DB" },
      { id: "action_work_order", label: "Make Work Order", type: "action", color: "#3498DB" }
    ]
  }
];

console.log(toolbox,"toolbox")

const SidebarList = ({ onAddNode }) => {
  return (
    <div className="sidebar-list">
      {toolbox.map((section) => (
        <div key={section.group} className="toolbox-section">
          <div className="toolbox-title">{section.group}</div>
          <div className="toolbox-items">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="toolbox-item"
                style={{ backgroundColor: item.color }}
                onClick={() => onAddNode(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarList;
