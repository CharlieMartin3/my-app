import React from 'react';
import { MarkerType } from 'react-flow-renderer';

export const nodes = [
    {
        id: "1",
        style: {
          background: "#454052",
          width: 200,
          color: "#fff",
          fontSize: "20px",
          fontFamily: "Helvetica",
        },
        type:"input",
        data: {label:"DF 1"},
        position: { x: 500, y: 250 }
      },
      {
        id: "2",
        style: {
          background: "#454052",
          width: 200,
          color: "#fff",
          fontSize: "25px",
          fontFamily: "Helvetica",
        },
        data: { label: "DF 2" },
        position: { x: 550, y: 300 }
      },
      {
        id: "plunger10",
        type: "fun101",
        data: {
          label: "DataFrame 1",
          in0: "column1",
          in1: "column2",
          in2: "column3",
          in3: "column4",
          in4: "column5",
          in5: "column6",
          in6: "column7",
          in7: "column8"
        },
        position: { x: 300, y: 150 }
      }
];

export const edges = [];