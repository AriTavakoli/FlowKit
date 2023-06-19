import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, } from 'reactflow';
import { v4 as uuid } from 'uuid';
import 'reactflow/dist/style.css';
import 'reactflow/dist/style.css';
import './overview.css';

import ColorSelectorNode from './ColorSelectorNode';

import './index.css';

const initBgColor = '#fff';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = forwardRef((props, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);


  const addNode = () => {
    const id = uuid(); // generating a unique id for the new node
    // calculate the maximum X position from the current nodes
    let maxX = Math.max(...nodes.map(n => n.position.x), 0);

    const nodeWidth = 2000; // replace this with the actual width of your nodes

    // set the new node's position to be next to the rightmost node
    const newNode = {
      id,
      type: 'selectorNode',
      data: { color: initBgColor },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: maxX + nodeWidth, y: 50 }, // adjust nodeWidth based on your actual node size
    };

    setNodes((ns) => ns.concat([newNode]));
  };

  useImperativeHandle(ref, () => ({
    addNode,
  }));



  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([

      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },


    ]);


  }, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );

  const minimapStyle = {
    height: 120,
  };

  return (
    <>


      <ReactFlow
        minZoom={0.2}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </>
  );
});

export default CustomNodeFlow;
