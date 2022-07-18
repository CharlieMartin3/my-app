import React, {useState} from 'react';

/*
  DatasList : liste des jeux de données importés par l'utilisateur. Cette liste est accessible en haut de la page dans un container. 
  Chaque jeux de données est associé un checkbox qui, quand il est coché, va faire apparaitre le jeux de données dans le DatasViz.
  En résumé, l'utilisateur va selectionner dans la DatasList les datasets avec lesquels il souhaite réaliser ses relations.
 */
const DatasList = ({
    initialNodes,
    checkedState,
    selectDataToFlowView,
}) => {

    return (
        <div className="container">
        {initialNodes.map(({ data, id }) => {
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