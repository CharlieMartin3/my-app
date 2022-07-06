import React, {useState} from 'react';
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
  const [checkedState, setCheckedState] = useState(new Array(initialNodes.length).fill(false));
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  console.log(nodes);

  const handleOnChange = (position) => {
    console.log("pos = ",position);
    const pos = parseInt(position)-1;
    console.log("parseInt(pos) = ",parseInt(pos));
    const updatedCheckedState = checkedState.map((item, index) =>
    //console.log("item = ",!item)
    index === position ? !item:item
    //index === parseInt(pos) ? !item:item
    );
    //console.log("update = ",updatedCheckedState)
    setCheckedState(updatedCheckedState);

    const new_nodes_array = [];
    updatedCheckedState.map((item, index) =>
    item === true ? new_nodes_array.push(initialNodes[index]):console.log("pass")
    );

    console.log(new_nodes_array)
    

    onNodesChange(new_nodes_array)
  };

  console.log("nodes after update = ",nodes)

  return (  
    <div>
      <div className="container">
          {initialNodes.map(({ data, id }) => {
          console.log("ch.id = ",checkedState[id])
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
      {/* <div class="container" >
        <legend>Veuillez sélectionner les dataframes :</legend>
        {[...Array(nodes)][0].map((i) => {
        //console.log("hehehe");
        var position = i.id;
        //console.log(position)
        //console.log(nodes[position-1])
        return (
          <Checkbox label="Value 1" value={checkedOne} onChange={handleChangeOne}/>
          // <tr key={position} value={nodes[position-1].data.label}>
          //   <div><input id={position-1} type={'checkbox'} onClick={setNodes()}/>{nodes[position-1].data.label}</div>
          // </tr>
        )
        })} 
      </div> */}
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