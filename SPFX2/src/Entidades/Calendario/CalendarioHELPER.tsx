export interface EventosCalendario {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    fondo: string; 
    id?: number;
    Ver?: (callback: () => void) => JSX.Element;
  }
  