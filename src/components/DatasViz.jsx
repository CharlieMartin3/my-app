import React from 'react';
import ReactFlow, {
  Controls,
  Background,
} from 'react-flow-renderer';

const graphStyles = { width: "100%", height: "800px"};
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const DatasViz = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    edgeTypes,
}) => {

    return (
        <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionMode="loose"
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={onInit}
      style={graphStyles}>
      <Controls />
      <Background/>
    </ReactFlow>
    )
      
}


export default DatasViz