import React, {useState} from 'react';
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

const mkFunGeneral = (n) => (
  {
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Left
}: NodeProps) => {
  //console.log("data = ",data);
  //console.log("data[`in0`].label = ",data[`in0`].label)
  return(
    //<div style={{ height: `${(n - 1) * 18 + 44}px`,display: `table` }}>
    <table border={'1px solid black'} >
      <tbody>
      <tr>
        <th>{data.label}</th>
      </tr>
      {[...Array(n).keys()].map((i) => {
        return <tr key={i} value={data[`in${i}`].label}>
          <td>{data[`in${i}`].label}</td>
          <td><Handle
          type="input"
          position={Position.Left}
          isConnectable={isConnectable}
          id={`in${i}`}
          style={{ top: 48 + 22 * i}}
        /></td>
        </tr>
        })
      }

      </tbody>
      
    </table>
  );
}
  
  

const nodeTypes = {
  df8: mkFunGeneral(8),
  df4: mkFunGeneral(4)
};

const OverviewFlow = () => {
  const [checkedState, setCheckedState] = useState(new Array(initialNodes.length).fill(false));
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) =>{
    //ici on doit effectuer la verification => condition if classique : 
    // if condition verifier on set le noeud sinon on le set pas et on affiche un message d'erreur
    console.log("params = ",params);
    console.log("params.source = ",params.source);
    console.log("noeuds source = ",initialNodes[params.source].data[params.sourceHandle].type);//.data[`in${}`]]);
    const type_node_source = initialNodes[params.source].data[params.sourceHandle].type;
    const type_node_target = initialNodes[params.target].data[params.sourceHandle].type;
    if (type_node_source === type_node_target) {
      console.log("EGALITE")
      setEdges((eds) => addEdge(params, eds));
      }
   else {
      console.log("pass");
    }
  }

  const handleOnChange = (position) => {
    //console.log("pos = ",position);
    var pos = parseInt(position);
    //console.log("parseInt(pos) = ",parseInt(pos));
    const updatedCheckedState = checkedState.map((item, index) =>
    //console.log("item = ",!item)
    index === pos ? !item:item
    //index === parseInt(pos) ? !item:item
    );
    //console.log("update = ",updatedCheckedState)
    setCheckedState(updatedCheckedState);

    const new_nodes_array = [];
    updatedCheckedState.map((item, index) =>
    item === true ? new_nodes_array.push(initialNodes[index]):console.log("pass")
    );

    console.log(new_nodes_array)
    

    setNodes(new_nodes_array)
  };

  //console.log("nodes after update = ",nodes)

  return (  
    <div>
      <div className="container">
          {initialNodes.map(({ data, id }) => {
          //console.log("ch.id = ",checkedState[id])
          return (
            <li key={id}>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id={id}
                    name={data.label}
                    value={checkedState[id]}
                    checked={checkedState[id]}
                    onChange={() => handleOnChange(id)}
                  />{data.label}
                </div>
                
                </div>
            </li>
          );
        })}
      </div>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionMode="loose"
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
    </div>
    
  );
};

export default function App() {return <OverviewFlow />;}