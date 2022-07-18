import React from "react";
import PropTypes from "prop-types"

/*
  DatasSet : jeux de données : La représentation des données ici dans la forme d'une colonne avec en titre le nom du jeu de données
  et chaque ligne le nom d'une colonne. Chaque colonne est associé à un point qui va pouvoir permettre à l'utilsateur d'effectuer les relations.
 */


/* 
  style des lignes (colonne du df)
 */ 
export const contentStyle = {
    contentHeader: {
      padding: "8px 0px",
      flexGrow: 1,
      backgroundColor: "#eee"
    },
    io: {
      position: "relative",
      padding: "8px 16px",
      flexGrow: 1
    },
    left: { left: "8px" },
    textLeft: { textAlign: "left" },
    right: { right: "-8px" },
    textRight: { textAlign: "right" },
    handle: {
      widht: "10px", // Does not work
      height: "10px",
      margin: "auto",
      background: "#ddd",
      borderRadius: "15px",
      border: "2px solid #ddd",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px"
    }
  };

  /*
  style du DatasSet
   */
  const style = {
    body: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      border: "0px solid #bbb",
      fontSize: "10pt"
    },
    selected: {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    title: {
      position: "relative",
      padding: "8px 32px",
      flexGrow: 1,
      backgroundColor: "#eee"
    },
    contentWrapper: {
      padding: "8px 0px",
      height: "auto" // ICI la taille va poser problème pour les jeux de données avec enormement de colonne
    }
  };

/*
  label = titre du dataset
  content = colonnes du dataset avec leur point associé (reat-flow) cf app.js pour la création du content
 */
function DatasSet({ 
label, 
selected,
color, 
content,
}){
 
    let customTitle = { ...style.title };
    if (color) customTitle.backgroundColor = color;
    return (
      <div>
        <div style={customTitle}>{label}</div>
        <div style={style.contentWrapper}>{content}</div>
      </div>
    );
}

DatasSet.prototype={
    label: PropTypes.string,
    selected: PropTypes.bool,
    color: PropTypes.string,
    content: PropTypes.any
}

  
  export default DatasSet;