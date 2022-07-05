import React from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  NodeProps,
  Position,
  StraightEdge
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
  
  //<div style={{ height: `${(n - 1) * 18 + 44}px`,display: `table` }}>
    <table border={'1px solid black'} >
      <tr>
        <th>{data.label}</th>
      </tr>
      {[...Array(n).keys()].map((i) => {
        return <tr key={i} value={data[`in${i}`]}>
          <td>{data[`in${i}`]}</td>
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
    </table>);
      {/* {[...Array(n).keys()].map((i) => (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          id={`in${i}`}
          style={{ top: 54 + 18 * i}}
        />
      ))} */}
    {/* <header className="fun-name"><h5>{data.label}</h5></header>
    <body>
    {[...Array(n).keys()].map((i) => (
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id={`in${i}`}
        style={{ top: 54 + 18 * i}}
      />
    ))}

    <ul position={Position.Bottom} className="ports">
      {[...Array(n).keys()].map((i) => (
        <li position={Position.Bottom} className="port-name">{data[`in${i}`]}</li>
      ))}
    </ul>

    </body> */}
    
    
  //</div>
//);

const nodeTypes = {
  df8: mkFunGeneral(8),
  df4: mkFunGeneral(4)
};

const MouseFct = (data) =>{
  console.log(data.target.id)
  return (null);
}

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  console.log(nodes);

  return (  
    <div>
      <div class="container" >
        <legend>Veuillez sélectionner les dataframes :</legend>
        {[...Array(nodes)][0].map((i) => {
        //console.log("hehehe");
        var position = i.id;
        //console.log(position)
        //console.log(nodes[position-1])
        return (
          <tr key={position} value={nodes[position-1].data.label}>
            <div><input id={position-1} type={'checkbox'} onClick={MouseFct}/>{nodes[position-1].data.label}</div>
          </tr>
        )
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
      {/* <fieldset>
        <legend>Choose the Dataframes:</legend>
        <div>
          <input type="checkbox" id="scales" name="scales"
             checked/>
          <label for="scales">Scales</label>
        </div>
        <div>
          <input type="checkbox" id="horns" name="horns"/>
          <label for="horns">Horns</label>
        </div>
      </fieldset> */}
      <Controls />
      <Background/>
    </ReactFlow>
    </div>
    
  );
};

export default function App() {return <OverviewFlow />;}