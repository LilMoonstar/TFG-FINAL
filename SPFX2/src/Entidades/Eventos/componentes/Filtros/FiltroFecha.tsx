/* eslint-disable @typescript-eslint/no-explicit-any*/
import * as React from "react";
import { DatePicker, Button } from 'antd';
import { Moment } from 'moment';

interface FiltroFechaProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const FiltroFecha: React.FC<FiltroFechaProps> = ({ onFilter }) => {
  const [selectedDates, setSelectedDates] = React.useState<[Moment | null, Moment | null]>([null, null]);

  const handleDateChange = (dates: [Moment | null, Moment | null]) => {
    setSelectedDates(dates);
  };

  const handleFilter = () => {
    if (selectedDates[0] && selectedDates[1]) {
      const startDate = selectedDates[0]?.format('YYYY-MM-DD') || '';
      const endDate = selectedDates[1]?.format('YYYY-MM-DD') || '';
      onFilter(startDate, endDate); 
    } else {
      onFilter('', ''); 
    }
  };

  const handleReset = () => {
    setSelectedDates([null, null]);
    onFilter('', ''); 
  };

  return (
    <div style={{ padding: 8 }}>
      <DatePicker.RangePicker
        value={selectedDates}
        onChange={handleDateChange}
        style={{ marginRight: 8 }}
      />
      <Button type="primary" onClick={handleFilter} style={{ marginRight: 8, backgroundColor: "#1B3DB0" , color: "#FFFFFF" }}>
        Filtrar
      </Button>
      <Button onClick={handleReset} style={{ backgroundColor: "#1B3DB0" , color: "#FFFFFF" }}>
        Reiniciar
      </Button>
    </div>
  );
};

export default FiltroFecha;
/*eslint-enable*/