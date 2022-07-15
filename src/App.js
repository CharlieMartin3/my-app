import React, {useState} from 'react';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  NodeProps,
  Position,
} from 'react-flow-renderer';

// COMPONENTS
import DatasList from "./components/DatasList"
import DatasViz from './components/DatasViz';
import DatasSet, {contentStyle as style} from './components/DatasSet';

import ButtonEdge from './customEdge';

import { nodes as initialNodes, edges as initialEdges } from './initial-element';

//const flowKey = 'example-flow';


const createDfGeneral = (n) => (
  {
  data,
  isConnectable,
}: NodeProps) => {
  return(
    <DatasSet
    label={data.label}
    selected={false}
    color={"lavender"}
    content={
      <>
      {[...Array(n).keys()].map((i) => {
        return (<div
            key={i}
            style={{ ...style.io, ...style.textLeft }}>
              {data[`in${i}`].label}
            <Handle
            type="default"
            isConnectable={isConnectable}
            id={`in${i}`}
            style={{ ...style.handle, ...style.left }}
            position={Position.left}
            />
            </div>
        )}
    )}
      </>
    
        }/>
    );
}
  
  

const nodeTypes = {
  df8: createDfGeneral(8),
  df4: createDfGeneral(4)
};

const edgeTypes = {
  buttonedge: ButtonEdge,
}

const OverviewFlow = () => {
  const [checkedState, setCheckedState] = useState(new Array(initialNodes.length).fill(false));
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // initialisation des df
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // initialisation des relations entre df
  const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true); 
    setTimeout(() => {setIsAlertVisible(false);}, 3000);  
  }

  console.log("edges = ",edges)

  const removeEdge = edgeId => {
    const newListEdges = [...edges]
    //console.log("newListEdges = ",newListEdges)
    newListEdges.filter(edge => edge.id !== edgeId)
    //console.log("newListEdges after filter = ",newListEdges)
    setEdges(newListEdges)
  }


  const onConnect = (params) =>{
    //ici on doit effectuer la verification => condition if classique : 
    // if condition verifier on set le noeud sinon on le set pas et on affiche un message d'erreur  
    //console.log("params.source = ",params.source);
    console.log("edges onConnect = ",edges)
    const type_node_source = initialNodes[params.source].data[params.sourceHandle].type;
    //console.log("type_node_source = ",type_node_source)
    const type_node_target = initialNodes[params.target].data[params.targetHandle].type;
    //console.log("type_node_target = ",type_node_target)
    if ((type_node_source === type_node_target)) {
      //console.log("params = ",params);
      setEdges((eds) => addEdge({
         ...params, 
         type: 'buttonedge', 
         data: {
          onClickBtnToRemove: (id) => removeEdge(id),
         }
      },eds));
    }
   else {handleButtonClick(); }
  }

  const selectDataToFlowView = (position) => {
    var pos = parseInt(position);
    const updatedCheckedState = checkedState.map((item, index) =>index === pos ? !item:item);
    setCheckedState(updatedCheckedState);

    const new_nodes_array = [];
    updatedCheckedState.map((item, index) =>
    item === true ? new_nodes_array.push(initialNodes[index]):console.log("pass")
    );

    setNodes(new_nodes_array)
  };

  const onClickValidate = () => {}
  
  //const updateNodeInternals = useUpdateNodeInternals();


  return (  
    <div>
     <DatasList
     initialNodes={initialNodes}
     checkedState={checkedState}
     selectDataToFlowView={selectDataToFlowView}
     />
      {isAlertVisible && <div className='alert-container'>
        <div className='alert-inner'>
          Pas le même type !
        </div>
      </div>}
      <DatasViz
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      />      
    <button onClick={onClickValidate} className="button-validate">VALIDER</button>
    
    
    </div>
    
  );
};

export default function App() {return <OverviewFlow />;}

//<button onClick={useUpdateNodeInternals('2')}>MAJ</button>