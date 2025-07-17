import React, { useState, memo, useEffect,useRef } from 'react';
import SidebarList from './sidebar-list/sidebar-list';
import MainDragComponent from './main-drag-component/main-drag-componet';
import PropertyPanel from './property-panel/property-panel';
import DebugPanel from './debug-panel/debug-panel'; // ✅ Import DebugPanel
import './main-drag-component/main-drag-component.css';
import './custome-node-red.css';
import { DndContext } from '@dnd-kit/core';
import HeaderBar from "./Header/header";
import NodeletsManagementModal from './models/NodeletsManagementModal';
import GlobalSettingsModal from './models/GlobalSettingsModal';

function CustomNodeRed() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [droppedNodes, setDroppedNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [tempConnection, setTempConnection] = useState(null);
  const [flowName, setFlowName] = useState("");
  const [debugLogs, setDebugLogs] = useState([]); // ✅ Debug logs state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState([
    { name: 'KDB_SESSION_URL', value: 'http://localhost:8083', description: 'kdb.ai session url' },
    { name: 'SMTP_SERVER', value: '', description: '' }
  ]);
  const panelRef = useRef();

  const handleHeaderSave = () => {
    if (panelRef.current && panelRef.current.handleSave) {
      panelRef.current.handleSave();
    }
  };
  const [nodeletModalOpen, setNodeletModalOpen] = useState(false);
  const [nodelets, setNodelets] = useState([
    { name: "Custom Node", version: "0.1", description: "custom logic by customer" },
  ]);

  const logDebug = (msg) => {
    setDebugLogs(prev => [...prev, msg]);
  };

  const updateNodePosition = (id, x, y) => {
    setDroppedNodes((nodes) =>
      nodes.map((node) => (node.id === id ? { ...node, x, y } : node))
    );
    logDebug(`📦 Moved node: ${id} to [${x}, ${y}]`);
  };

  const handleStartConnection = (e, fromNode, type) => {
    if (type !== 'output') return;
    e.stopPropagation();

    const canvas = document.getElementById('canvas');
    const canvasRect = canvas.getBoundingClientRect();

    const startX = fromNode.x + 120;
    const startY = fromNode.y + 15;

    setTempConnection({
      fromNode,
      fromType: type,
      startX,
      startY,
      endX: startX,
      endY: startY
    });

    const handleMouseMove = (moveEvent) => {
      setTempConnection((conn) => ({
        ...conn,
        endX: moveEvent.clientX - canvasRect.left,
        endY: moveEvent.clientY - canvasRect.top
      }));
    };

    const handleMouseUp = (upEvent) => {
      const mouseX = upEvent.clientX - canvasRect.left;
      const mouseY = upEvent.clientY - canvasRect.top;

      const targetNode = droppedNodes.find((node) => {
        const inputX = node.x - 5;
        const inputY = node.y + 10;
        return (
          mouseX >= inputX &&
          mouseX <= inputX + 20 &&
          mouseY >= inputY &&
          mouseY <= inputY + 20
        );
      });

      if (targetNode && targetNode.id !== fromNode.id) {
        setConnections((prev) => [...prev, { from: fromNode.id, to: targetNode.id }]);
        logDebug(`🔗 Connected ${fromNode.id} ➡️ ${targetNode.id}`);
      }

      setTempConnection(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // const exportToJSON = () => {
  //   const nodeData = droppedNodes.map(({ id, type, x, y, ...rest }) => ({
  //     id, type, params: rest.params || {}, x, y
  //   }));

  //   const layout = {
  //     flowName: flowName,
  //     nodes: nodeData,
  //     edges: connections
  //   };

  //   logDebug('📤 Exported JSON structure to console.');
  //   console.log(JSON.stringify(layout, null, 2));
  // };
  const exportToJSON = () => {
    const workflowObject = {
      id: "unique_workflow_id",
      name: flowName || "My Workflow Name",
      description: "descriptions",
      global_variables: {
        owner: "engineer",
        email: ["engineer@aidentyx.com"],
        retries: 1,
        retry_delay: "5m",
        db1_url: ""
      },
      settings: {
        catchup: false,
        max_active_runs: 1
      }
    };

    // 🔁 Map each node's downstream dependencies
    const dependenciesMap = {};
    connections.forEach(({ from, to }) => {
      if (!dependenciesMap[to]) dependenciesMap[to] = [];
      dependenciesMap[to].push(from);
    });

    const tasks = droppedNodes.map((node) => {
      const {
        id,
        type,
        label,
        input = {},
        settings = {},
        code = "",
        output = { result: "{{ result }}" }
      } = node;

      const upstreams = dependenciesMap[id] || [];
      const finalInput = { ...input };

      // 💡 Auto-inject interpolated input from upstream node's output
      if (upstreams.length > 0) {
        upstreams.forEach((fromId, idx) => {
          const outputKeys = Object.keys(output);
          const key = outputKeys[idx] || "data";
          finalInput[key] = `{{ upstream_output.${fromId}.${key} }}`;
        });
      }

      return {
        id,
        group: "Workflow Automation",
        name: label || id,
        type: type === "function" ? "python" : type,
        input: finalInput,
        output,
        code,
        settings
      };
    });

    const finalJSON = {
      id: workflowObject.id,
      name: workflowObject.name,
      description: workflowObject.description,
      global_variables: workflowObject.global_variables,
      settings: workflowObject.settings,
      tasks,
      dependencies: connections
    };

    logDebug("📤 Exported Workflow JSON with interpolated inputs:");
    console.log(JSON.stringify(finalJSON, null, 2));
  };


  // const exportToJSON = () => {
  //   const workflowObject = {
  //     id: "unique_workflow_id",
  //     name: flowName || "My Workflow Name",
  //     description: "descriptions",
  //     global_variables: {
  //       owner: "engineer",
  //       email: ["engineer@aidentyx.com"],
  //       retries: 1,
  //       retry_delay: "5m",
  //       db1_url: ""
  //     },
  //     settings: {
  //       catchup: false,
  //       max_active_runs: 1
  //     }
  //   };

  //   const tasks = droppedNodes.map(({ id, type, x, y, settings = {}, input = {} }) => ({
  //     id,
  //     type,
  //     x,
  //     y,
  //     settings,
  //     input
  //   }));

  //   const layout = {
  //     workflowObject,
  //     tasks,
  //     dependencies: connections
  //   };

  //   logDebug('📤 Exported JSON structure to console.');
  //   console.log(JSON.stringify(layout, null, 2));
  // };



  const loadFromJSON = (layout) => {
    const toolboxMap = {
      trigger: "#E67E22",
      function: "#16A085",
      action: "#3498DB"
    };

    const formattedNodes = layout.nodes.map((n) => ({
      ...n,
      label: n.id.split("-")[0].replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      color: toolboxMap[n.type] || "#BDC3C7"
    }));

    setDroppedNodes(formattedNodes);
    setConnections(layout.edges);
    logDebug('📥 Loaded layout from JSON.');
  };

  const handleUpdateNode = (id, updatedFields) => {
    setDroppedNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, ...updatedFields } : node
      )
    );
    logDebug(`🔧 Updated node: ${id}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.getAttribute("contenteditable") === "true";

      if ((e.key === "Delete" || e.key === "Backspace") && selectedNode && !isInputFocused) {
        if (selectedNode.type === "edge") {
          setConnections((prev) =>
            prev.filter(
              (conn) =>
                !(
                  conn.from === selectedNode.from &&
                  conn.to === selectedNode.to
                )
            )
          );
          logDebug(`🗑️ Deleted edge: ${selectedNode.from} ➡️ ${selectedNode.to}`);
        } else {
          setDroppedNodes((prev) =>
            prev.filter((node) => node.id !== selectedNode.id)
          );
          setConnections((prev) =>
            prev.filter(
              (conn) =>
                conn.from !== selectedNode.id && conn.to !== selectedNode.id
            )
          );
          logDebug(`🗑️ Deleted node: ${selectedNode.id}`);
        }

        setSelectedNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode]);

  return (
    <>
      <HeaderBar
        onDeploy={exportToJSON}
        flowName={flowName}
        onFlowNameChange={setFlowName}
        setNodeletModalOpen={()=>setNodeletModalOpen(true)}
        onGlobalSettingsClick={() => setIsSettingsModalOpen(true)}
        onSave={handleHeaderSave}
      />

      <GlobalSettingsModal
        open={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={globalSettings}
        setSettings={setGlobalSettings}
      />

      <NodeletsManagementModal
        open={nodeletModalOpen}
        onClose={() => setNodeletModalOpen(false)}
        nodelets={nodelets}
        setNodelets={setNodelets}
      />


      <div className="app-layout">
        <div className="sidebar">
          <SidebarList
            onAddNode={(item) => {
              const newNode = {
                id: `${item.id}-${Date.now()}`,
                label: item.label,
                type: item.type,
                color: item.color,
                x: Math.random() * 400,
                y: Math.random() * 300,
              };
              setDroppedNodes((prev) => [...prev, newNode]);
              logDebug(`➕ Added new node: ${newNode.id}`);
            }}
          />
        </div>
        <div className="main-canvas">
          <DndContext
            onDragEnd={({ over, active }) => {
              if (over?.id === 'canvas') {
                const offsetX = Math.random() * 400;
                const offsetY = Math.random() * 300;
                const item = active.data.current;
                const newNode = {
                  id: `${item.id}-${Date.now()}`,
                  label: item.label,
                  type: item.type,
                  color: item.color,
                  x: offsetX,
                  y: offsetY,
                  inputs: [],
                  outputs: []
                };
                setDroppedNodes((prev) => [...prev, newNode]);
                logDebug(`🎯 Dropped new node: ${newNode.id}`);
              }
            }}
          >
            <MainDragComponent
              nodes={droppedNodes}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
              updateNodePosition={updateNodePosition}
              onStartConnection={handleStartConnection}
              connections={connections}
              tempConnection={tempConnection}
              onUpdateNode={handleUpdateNode}
            />
          </DndContext>
        </div>
        <div className="properties-panel">
          <PropertyPanel ref={panelRef}  node={selectedNode} onUpdateNode={handleUpdateNode} />
        </div>
      </div>

      <DebugPanel logs={debugLogs} />
    </>
  );
}

const MemoizedCustomNodeRed = memo(CustomNodeRed);
export default MemoizedCustomNodeRed;
