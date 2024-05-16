/* eslint-disable @typescript-eslint/no-explicit-any*/
import * as React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IconButton } from "office-ui-fabric-react";

const CustomToolbar = (props: any): JSX.Element => {
  const viewState = "month";

  function addMonths(date: Date, months: number): Date {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    console.log(date);
    return date;
  }

  function addWeeks(date: Date, weeks: number): Date {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  }

  function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);

    return date;
  }
  /*
  const goToDayView = () => {
    props.onView("day");
    setViewState("day");
  };
  const goToWeekView = () => {
    props.onView("week");
    setViewState("week");
  };
  const goToMonthView = () => {
    props.onView("month");
    setViewState("month");
  };
*/
  const goToBack = (): void => {
    if (viewState === "month") {
      props.onNavigate("prev", addMonths(props.date, -1));
    } else if (viewState === "week") {
      props.onNavigate("prev", addWeeks(props.date, -1));
    } else {
      props.onNavigate("prev", addDays(props.date, -1));
    }
  };

  const goToNext = (): void => {
    if (viewState === "month") {
      props.onNavigate("next", addMonths(props.date, +1));
    } else if (viewState === "week") {
      props.onNavigate("next", addWeeks(props.date, +1));
    } else {
      props.onNavigate("next", addDays(props.date, +1));
    }
  };
  /*
  const goToToday = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    props.onNavigate("current");
  };

  useEffect(() => {
    console.log(props);
  }, []);

 function viewNamesGroup(messages: any) {
    const viewNames = props.views;
    const view = props.view;

    if (viewNames.length > 1) {
      return viewNames.map((name: any) => (
        <button
          type="button"
          key={name}
          className={clsx({ "rbc-active": view === name })}
          onClick={props.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ));
    } else return <></>;
  }*/

  return (
    <div className="rbc-toolbar">
      <div
        className="rbc-btn-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton
          iconProps={{ iconName: "ChevronLeft" }}
          title={"Anterior"}
          ariaLabel={"Anterior"}
          onClick={goToBack}
        />
        <span
          className="rbc-toolbar-label"
          style={{
            textTransform: "capitalize",
            fontSize: "14px",
            lineHeight: "32px",
            fontWeight: "600",
          }}
        >
          {props.label}
        </span>

        <IconButton
          iconProps={{ iconName: "ChevronRight" }}
          title={"Siguiente"}
          ariaLabel={"Siguiente"}
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default CustomToolbar;
/* eslint-enable */
