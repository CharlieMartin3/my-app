import React from 'react';
import ReactFlow, {
  Controls,
  Background,
} from 'react-flow-renderer';

/* 
  DatasViz = Reactflow => espace de visualisation des relations. C'est ici que l'utilisateur va observer et créer ses relations.
*/

//style
const graphStyles = { width: "100%", height: "800px"};
const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

/* 
  nodes = datasSets
  edges = relations
  nodeTypes = b

*/

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