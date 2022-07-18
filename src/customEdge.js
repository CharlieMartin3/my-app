import React from 'react';
import { getBezierPath,getSmoothStepPath, getEdgeCenter, getMarkerEnd, StraightEdge } from 'react-flow-renderer';
import { nodes } from './initial-element';
import './index.css';


const foreignObjectWidth = 120;
const foreignObjectHeigth = 40;

/*
  customEdge = relation entre 2 dataset
  id = id de la relation
  source, target =  point de départ et point d'arriver de la relation
  sourceX, sourceY, targetX, targetY = coordonnées des points
  style = couleur de la relation (à modifier en fonction de inner,left,right pour apporter plus de clarté)
  data = custom et jointure (cf App.js)

*/
export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { stroke: 'red',},
  markerEnd,
  data,
}) {
    const removeEdge = (edgeID) => {
      data.setEdges(previousEdge => previousEdge.filter(edge =>edge.id !== edgeID)) 
    }

    const changeLeftJointure = (edgeID) => {
      data.jointure = "left"
    }

    const changeRightJointure = (edgeID) => {
      data.jointure = "right"
    }

    //regex pour obtenir le nom des colonnes
    const idSplit = id.match("reactflow__edge-([0-9])(.+)-([0-9])(.+)");
    const keyDict = {};
    keyDict[idSplit[1]] = idSplit[2]
    keyDict[idSplit[3]] = idSplit[4]
    const source_name = nodes[source].data[keyDict[source]].label;
    const target_name = nodes[target].data[keyDict[target]].label;
    const edgePath = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: '20px' }}
          startOffset="50%"
          textAnchor="middle"
        >
        {source_name} ------ {target_name}
        </textPath>
      </text>
      <foreignObject
        width={foreignObjectWidth}
        height={foreignObjectHeigth}
        x={edgeCenterX - foreignObjectWidth / 2} 
        y={edgeCenterY - (foreignObjectHeigth / 2)+30} // Math.abs(sourceY-targetY) + 20 
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div class="flexbox-container">
        <button className="edgebutton" onClick={() =>changeLeftJointure(id)}>
          &lt;
          </button>
          <button className="edgebutton" onClick={() => removeEdge(id)}>
            ×
          </button>
          <button className="edgebutton" onClick={() => changeRightJointure(id)}>
          &gt;
          </button>
          <text name="jointure"/>
        </div>
      </foreignObject>
    </>
  );
}