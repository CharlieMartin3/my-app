export const nodes = [
    {
        id: "0",
        type: "df4",
        data: {
          label: "DataFrame 1",
          in0: {label:"column1",type:"int"},
          in1: {label:"column2",type:"float"},
          in2: {label:"column3",type:"int"},
          in3: {label:"column4",type:"int"},
        },
        position: { x: 600, y: 600 }
      },
      {
        id: "1",
        type: "df4",
        data: {
          label: "DataFrame 2",
          in0: {label:"column1",type:"int"},
          in1: {label:"column2",type:"string"},
          in2: {label:"column3",type:"int"},
          in3: {label:"column4",type:"int"},
        },
        position: { x: 50, y: 400 }
      },
      {
        id: "2",
        type: "df8",
        data: {
          label: "DataFrame 3",
          in0: {label:"column1",type:"int"},
          in1: {label:"column2",type:"int"},
          in2: {label:"column3",type:"int"},
          in3: {label:"column4",type:"int"},
          in4: {label:"column5",type:"int"},
          in5: {label:"column6",type:"int"},
          in6: {label:"column7",type:"int"},
          in7: {label:"column8",type:"int"},
        },
        position: { x: 300, y: 150 }
      }
];

export const edges = [];