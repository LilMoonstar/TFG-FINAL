import { Tag } from "antd";
import { ColumnFilterItem } from "antd/lib/table/interface";
import * as React from "react";

export interface juegoParaTablaProps {
  juego: string;
}

export const JuegoFiltro = (): ColumnFilterItem[] => {
  return [
    { text: 'LEAGUE OF LEGENDS', value: 'LEAGUE OF LEGENDS' },
    { text: 'FORTNITE', value: 'FORTNITE' }
  ];
};


export default function EventosJuego(Props: juegoParaTablaProps): JSX.Element {
  let color = 'black';
  let txtcolor = 'white';
  switch (Props.juego) {
    case "LEAGUE OF LEGENDS":
      color = '#091428';
      txtcolor = '#C4A15B';
      break;
    case "FORTNITE":
      color = '#5FCEEA';
      txtcolor = 'White';
      break;
    default:
      color = 'White';
      txtcolor = 'White';
      break;
  }

  return (
    <>
      <Tag style={{ color: txtcolor, backgroundColor: color, fontWeight: 'bold' }} key={Props.juego}>
        {Props.juego?.toUpperCase()}
      </Tag>
    </>
  );
}