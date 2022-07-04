import React from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  NodeProps,
  Position
} from 'react-flow-renderer';

import { nodes as initialNodes, edges as initialEdges } from './initial-element';

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const graphStyles = { width: "100%", height: "800px" };

const mkFunGeneral = (n) => ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Left
}: NodeProps) => (
  
  <div class="container" style={{ height: `${(n - 1) * 18 + 6}px` }}>
    <header className="fun-name"><h5>{data.label}</h5></header>
    <body>
    {[...Array(n).keys()].map((i) => (
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id={`in${i}`}
        style={{ top: 13 + 18 * i }}
      />
    ))}
    {/* {[...Array(n).keys()].map((i) => (
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id={`in${i}`}
        style={{ top: 13 + 18 * i }}
      />
    ))} */}
    {/* </ul> */}

    <ul className="ports">
      {[...Array(n).keys()].map((i) => (
        <li position={Position.Top} className="port-name">{data[`in${i}`]}</li>
      ))}
    </ul>

    </body>
    
    
  </div>
);

const nodeTypes = {
  fun101: mkFunGeneral(8)
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  console.log(nodes);

  return (  
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onInit={onInit}
      style={graphStyles}
    >
      <Controls />
      <Background/>
    </ReactFlow>
  );
};

export default function App() {return <OverviewFlow />;}