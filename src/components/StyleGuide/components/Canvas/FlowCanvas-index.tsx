import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, } from 'reactflow';
import { v4 as uuid } from 'uuid';
import FlowNav from '../FlowNav/FlowNav-index';
import { useStyleguideContext } from '../../context/StyleguideReferenceContext';
import Icon from '@src/components/IconWrapper/Icon';
import 'reactflow/dist/style.css';
import 'reactflow/dist/style.css';
import './styles/overview.css';
import FrameNode from './components/FrameNode';
import './styles/index.css';
import { useGlobalContext } from '@Context/Global/GlobalProvider';


const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: FrameNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = forwardRef((props, ref) => {

  const {
    theme
  } = useGlobalContext()

  const {
    setMode
  } = useStyleguideContext();


  const [initBgColor, setInitBgColor] = useState(theme === 'light' ? '#ffffff' : '#808080');


  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);


  const addNode = () => {
    const id = uuid();
    let maxX = Math.max(...nodes.map(n => n.position.x), 0);

    const nodeWidth = 250;
    // set the new node's position to be next to the rightmost node
    const newNode = {
      id,
      type: 'selectorNode',
      data: { color: initBgColor },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: maxX + nodeWidth, y: 25 },
    };

    setNodes((ns) => ns.concat([newNode]));
  };

  useImperativeHandle(ref, () => ({
    addNode,
  }));

  useEffect(() => {
    setInitBgColor(theme === 'light' ? '#fff' : '#000');
    setBgColor(theme === 'light' ? '#fff' : '#000');
  }, [theme]);

  useEffect(() => {
    const element = document.querySelector(".react-flow__attribution");

    if (element) {
      element.parentNode.removeChild(element);
    }

  }, []);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          // setBgColor(color);

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

        <FlowNav addNode={addNode}  />

        <div style={{ marginBottom: '20px' }}>
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />

        </div>

        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
});

export default CustomNodeFlow;
