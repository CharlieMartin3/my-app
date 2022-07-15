import React from 'react';
import { getBezierPath, getEdgeCenter, getMarkerEnd, StraightEdge } from 'react-flow-renderer';
import { nodes } from './initial-element';
import './index.css';

const foreignObjectSize = 40;


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
  style = { stroke: 'red'},
  markerEnd,
  data,
}) {

    const removeEdge = (edgeID) => {
      data.setEdges(previousEdge => previousEdge.filter(edge =>edge.id !== edgeID)) 
    }

    const idSplit = id.match("reactflow__edge-([0-9])(.+)-([0-9])(.+)");
    const keyDict = {};
    keyDict[idSplit[1]] = idSplit[2]
    keyDict[idSplit[3]] = idSplit[4]
    //console.log("keyDict = ",keyDict);
    const source_name = nodes[source].data[keyDict[source]].label;
    const target_name = nodes[target].data[keyDict[target]].label;
    const edgePath = getBezierPath({
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
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button className="edgebutton" onClick={() => removeEdge(id)}>
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
}