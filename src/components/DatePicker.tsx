import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  onEpochTimeChange,
  id,
  required,
}: {
  onEpochTimeChange: any;
  id: string;
  required: boolean;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [epochTime, setEpochTime] = useState<any>("");
  const [maxTime, setMaxTime] = useState<Date>(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    const epochTime = date ? Math.floor(date.getTime() / 1000) : "";
    setEpochTime(epochTime);
    onEpochTimeChange(epochTime);

    if (date) {
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      setMaxTime(isToday ? now : new Date(0, 0, 0, 23, 59));
    }
  };

  useEffect(() => {
    const now = new Date();
    setMaxTime(now);
  }, []);

  return (
    <>
      <td>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
          maxDate={new Date()}
          minTime={new Date(0, 0, 0, 0, 0)}
          maxTime={maxTime}
          id={id}
          required={required}
          placeholderText="Select"
          className={"search-input"}
        />
      </td>
      <td>
        {/* <input
          type="text"
          value={epochTime}
          readOnly
          placeholder="Epoch Time"
        /> */}
        <input
          type="text"
          value={epochTime}
          readOnly
          placeholder="Epoch Time"
          className={"search-input"}
        />
      </td>
    </>
  );
};

export default CustomDatePicker;
