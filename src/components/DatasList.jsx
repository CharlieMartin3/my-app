import React, {useState} from 'react';

const DatasList = ({
    initialNodes,
    checkedState,
    selectDataToFlowView,
}) => {

    return (
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
                  onChange={() => selectDataToFlowView(id)}
                />{data.label}
              </div>
              
              </div>
          </li>
        );
      })}
    </div>
    )
      
}


export default DatasList