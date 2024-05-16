/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation*/
import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useMemo, useRef, useState } from "react";
import * as moment from 'moment';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import CustomToolbar from "./CalendarioToolBar";
import { EventosCalendario } from "./CalendarioHELPER";


const mLocalizer = momentLocalizer(moment); 

const ColoredDateCellWrapper = ({ children = null }): any =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });


export interface MiCalendarioProps {
  Context: WebPartContext;
  eventos: EventosCalendario[];
}

export default function MiCalendarioWP(props: MiCalendarioProps): JSX.Element {
  const [itemVer, setItemVer] = useState<EventosCalendario>(null);
  const UICultureName = useRef<string>(
    props.Context.pageContext.cultureInfo.currentUICultureName
  );

  const { components, defaultDate } = useMemo(
    (): any => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
        toolbar: CustomToolbar,
      },
      defaultDate: new Date(),
    }),
    []
  );
  const handleSelectEvent = async (event: EventosCalendario): Promise<void> => {
    setItemVer(event);
  };

  return (
    <>
      <Calendar
        components={components}
        defaultDate={defaultDate}
        events={props.eventos}
        localizer={mLocalizer} 
        culture={UICultureName.current}
        showMultiDayTimes
        step={60}
        style={{ height: "480px" }}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        popup
        showAllEvents={false}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event: EventosCalendario, start: any, end: any, isSelected: any) => ({
          event,
          start,
          end,
          isSelected,
          style: {
            backgroundColor: event.fondo || 'lightblue', 
          },
        })}        
      />

      {null !== itemVer &&
        null !== itemVer.Ver &&
        itemVer.Ver(() => setItemVer(null))}
    </>
  );
}
/*eslint-enable */
