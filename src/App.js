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


/*
  Content du DatasSets
  n = nombre de colonnes dans le datasSet
  data = les datasets 
  (style importé depuis DatasSet)
 */
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
  
  
/* 
  Ici en fonction des jeux données on aura des types de nodes différents 
*/
const nodeTypes = {
  df8: createDfGeneral(8),
  df4: createDfGeneral(4)
};

/* type bouton importé depuis customEdge */
const edgeTypes = {
  buttonedge: ButtonEdge,
}


/*
  FONCTION GENERALE
*/
const OverviewFlow = () => {
  //initialisation des elements
  const [checkedState, setCheckedState] = useState(new Array(initialNodes.length).fill(false));
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // initialisation des df
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // initialisation des relations entre df
  const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true); 
    setTimeout(() => {setIsAlertVisible(false);}, 3000);  
  }

  /*
    creation d'une relation => on va creer un edge entre les 2 jeux de données en précisant les colonnes sur lesquelles les relations sont effectuées
    On va donc logiquement setEdge pour ajouter une relation
    Dans le setEdge on va passer en paramètre dans data deux éléments très important :
      - setEdges qui va permettre de bien effectuer la MAJ lors de la suppression de cette relation sans supprimer les relation créer après celle-ci
      - jointure : inner,left,right (type de jointure entre les 2 datasset)
   */
  const onConnect = (params) =>{ 
    const type_node_source = initialNodes[params.source].data[params.sourceHandle].type;
    const type_node_target = initialNodes[params.target].data[params.targetHandle].type;
    //ici on doit effectuer la verification => condition if classique :
    // if condition verifier on set le noeud sinon on le set pas et on affiche un message d'erreur  
    if ((type_node_source === type_node_target)) {
      setEdges((eds) => addEdge({
         ...params, 
         type: 'buttonedge', 
         data: {"setEdges":setEdges, "jointure":"inner"},
      },eds));
    }
   else {handleButtonClick(); }
  }

  /*
    selection des jeux de données à afficher
   */
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

  // fonction à completer qui doit requeter l'API pour créer les relations
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