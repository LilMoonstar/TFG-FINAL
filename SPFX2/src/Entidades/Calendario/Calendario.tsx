/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation */
import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useMemo, useRef } from "react";
import * as moment from 'moment';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import CustomToolbar from "./CalendarioToolBar";
import { EventosCalendario } from "./CalendarioHELPER";

const mLocalizer = momentLocalizer(moment);

export interface MiCalendarioProps {
  Context: WebPartContext;
  eventos: EventosCalendario[];
  onSelectEvent: (event: EventosCalendario) => void;
}

export default function MiCalendarioWP(props: MiCalendarioProps): JSX.Element {
  const UICultureName = useRef<string>(
    props.Context.pageContext.cultureInfo.currentUICultureName
  );

  const { components, defaultDate } = useMemo(
    (): any => ({
      components: {
        timeSlotWrapper: CustomToolbar,
        toolbar: CustomToolbar,
        event: ({ event }: { event: EventosCalendario }) => (
          <span>{event.title}</span>
        ),
      },
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <Calendar
      components={components}
      defaultDate={defaultDate}
      events={props.eventos}
      localizer={mLocalizer}
      culture={UICultureName.current}
      showMultiDayTimes
      step={60}
      style={{ height: "450px", width: "700px" }}
      views={["month"]}
      startAccessor="start"
      endAccessor="end"
      popup
      showAllEvents={false}
      onSelectEvent={props.onSelectEvent}
      eventPropGetter={(event: EventosCalendario) => ({
        style: {
          backgroundColor: event.fondo || '#1b4586',
        },
      })}
    />
  );
}
/* eslint-enable */
