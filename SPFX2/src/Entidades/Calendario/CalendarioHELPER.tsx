import { ReactNode } from "react";
import { EventosItem } from "../Eventos/EventosItem";

export interface EventosCalendario {
  Description: ReactNode;
  Game: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  fondo?: string;
  id?: number;
  Ver?: (callback: () => void) => JSX.Element;
  item: EventosItem
}
