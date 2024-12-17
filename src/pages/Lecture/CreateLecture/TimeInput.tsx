import React, { useState } from 'react';

import { type Day, dayMap, minToTime } from '@/entities/time';

const weekdays = Object.keys(dayMap).filter(
  (day) => day !== 'Sat' && day !== 'Sun',
);

export const TimeInput = ({
  onChange,
}: {
  onChange: (time: {
    day: Day;
    startMinute: number;
    endMinute: number;
  }) => void;
}) => {
  const [day, setDay] = useState<Day>(0);
  const [startMinute, setStartMinute] = useState<number>(540);
  const [endMinute, setEndMinute] = useState<number>(600);

  const timeOptions = Array.from(
    { length: 13 * 4 + 1 },
    (_, i) => 540 + i * 15,
  );

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = Number(e.target.value) as Day;
    setDay(selectedDay);
    onChange({ day: selectedDay, startMinute, endMinute });
  };

  const handleStartMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStartMinute = Number(e.target.value);
    setStartMinute(selectedStartMinute);
    if (selectedStartMinute >= endMinute) {
      const newEndMinute = selectedStartMinute + 15;
      setEndMinute(newEndMinute <= 1320 ? newEndMinute : selectedStartMinute);
      onChange({
        day,
        startMinute: selectedStartMinute,
        endMinute: newEndMinute,
      });
    } else {
      onChange({ day, startMinute: selectedStartMinute, endMinute });
    }
  };

  const handleEndMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEndMinute = Number(e.target.value);
    setEndMinute(selectedEndMinute);
    onChange({ day, startMinute, endMinute: selectedEndMinute });
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center pb-2">
      <label className="col-span-3 text-gray-600 text-sm">시간</label>
      <div className="col-span-9 flex gap-2">
        <select
          value={day}
          onChange={handleDayChange}
          className="border p-1 rounded focus:outline-none w-20 text-sm"
        >
          {weekdays.map((dayName) => (
            <option key={dayMap[dayName]} value={dayMap[dayName]}>
              {dayName}
            </option>
          ))}
        </select>

        <select
          value={startMinute}
          onChange={handleStartMinuteChange}
          className="border p-1 rounded focus:outline-none w-28 text-sm"
        >
          {timeOptions
            .filter((minutes) => minutes < 1320)
            .map((minutes) => (
              <option key={minutes} value={minutes}>
                {minToTime(minutes)}
              </option>
            ))}
        </select>

        <select
          value={endMinute}
          onChange={handleEndMinuteChange}
          className="border p-1 rounded focus:outline-none w-28 text-sm"
        >
          {timeOptions
            .filter((minutes) => minutes > startMinute)
            .map((minutes) => (
              <option key={minutes} value={minutes}>
                {minToTime(minutes)}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
