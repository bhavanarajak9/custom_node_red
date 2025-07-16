// main-drag-componet.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import './main-drag-component.css';

const MainDragComponent = ({
    nodes,
    selectedNode, // ✅ receive selected node
    onNodeSelect,
    updateNodePosition,
    onStartConnection,
    connections,
    tempConnection
}) => {
    const { setNodeRef } = useDroppable({ id: 'canvas' });

    const handleMouseDown = (e, node) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            updateNodePosition(node.id, node.x + dx, node.y + dy);
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    // const renderConnections = () => {
    //     return connections.map((conn, i) => {
    //         const from = nodes.find((n) => n.id === conn.from);
    //         const to = nodes.find((n) => n.id === conn.to);
    //         if (!from || !to) return null;

    //         const outputOffsetX = 120 + 6;
    //         const inputOffsetX = -6;

    //         const startX = from.x + outputOffsetX;
    //         const startY = from.y + 15;

    //         const endX = to.x + inputOffsetX;
    //         const endY = to.y + 15;

    //         const path = `M${startX},${startY} C${startX + 50},${startY} ${endX - 50},${endY} ${endX},${endY}`;

    //         return (
    //             <path
    //                 key={i}
    //                 d={path}
    //                 stroke="orange"
    //                 fill="none"
    //                 markerEnd="url(#arrow)"
    //                 style={{ cursor: 'pointer' }}
    //                 onClick={(e) => {
    //                     e.stopPropagation(); // prevent canvas click
    //                     onNodeSelect({ type: 'edge', from: conn.from, to: conn.to });
    //                 }}
    //             />
    //         );
    //     });
    // };
    const renderConnections = () => {
        return connections.map((conn, i) => {
            const from = nodes.find((n) => n.id === conn.from);
            const to = nodes.find((n) => n.id === conn.to);

            // ❌ Don't render connection if target node is a trigger
            if (!from || !to || to.type === 'trigger') return null;

            const outputOffsetX = 120 + 6;
            const inputOffsetX = -6;

            const startX = from.x + outputOffsetX;
            const startY = from.y + 15;

            const endX = to.x + inputOffsetX;
            const endY = to.y + 15;

            const path = `M${startX},${startY} C${startX + 50},${startY} ${endX - 50},${endY} ${endX},${endY}`;

            return (
                <path
                    key={i}
                    d={path}
                    stroke="orange"
                    fill="none"
                    markerEnd="url(#arrow)"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onNodeSelect({ type: 'edge', from: conn.from, to: conn.to });
                    }}
                />
            );
        });
    };
    
    
    return (
        <div ref={setNodeRef} onClick={() => onNodeSelect(null)} id="canvas" className="canvas">
            <svg className="connection-layer">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
                    </marker>
                </defs>
                {renderConnections()}
                {tempConnection && (
                    <path
                        d={`M${tempConnection.startX},${tempConnection.startY} C${tempConnection.startX + 50},${tempConnection.startY} ${tempConnection.endX - 50},${tempConnection.endY} ${tempConnection.endX},${tempConnection.endY}`}
                        stroke="#999"
                        fill="none"
                        strokeDasharray="5,5"
                    />

                )}
            </svg>
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className={`node ${selectedNode?.id === node.id ? 'selected' : ''}`}
                    style={{ top: node.y, left: node.x, backgroundColor: node.color }}
                    onMouseDown={(e) => handleMouseDown(e, node)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onNodeSelect(node);
                    }}
                >
                    {/* ✅ Only show input dot if not a trigger */}
                    {node.type !== 'trigger' && (
                        <div
                            className="node-input"
                            onMouseDown={(e) => onStartConnection(e, node, 'input')}
                        ></div>
                    )}

                    <span className="node-label">{node.label}</span>

                    {/* ✅ Always show output dot (all nodes can connect to next) */}
                    <div
                        className="node-output"
                        onMouseDown={(e) => onStartConnection(e, node, 'output')}
                    ></div>
                </div>
            ))}
         </div>
    );
};

export default MainDragComponent;
