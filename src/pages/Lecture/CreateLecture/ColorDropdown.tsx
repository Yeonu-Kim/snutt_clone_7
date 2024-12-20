import React, { useState } from 'react';

import { colorList } from '@/entities/color';

export const ColorDropdown = ({
  selectedColorIndex,
  onSelectColor,
}: {
  selectedColorIndex: number;
  onSelectColor: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectColor = (index: number) => {
    onSelectColor(index);
    setIsOpen(false);
  };

  const validColorClass = colorList(selectedColorIndex);

  return (
    <div className="relative inline-block">
      <div
        className="flex w-32 cursor-pointer items-center justify-between rounded border px-2 py-1"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div
          className={`h-4 w-4 ${validColorClass} rounded`}
          style={{ display: 'inline-block' }}
        />
        <span className="ml-2 text-sm text-gray-600">▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-32 rounded border bg-white shadow-lg">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-center px-2 py-1 hover:bg-gray-100 ${
                index === selectedColorIndex ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                handleSelectColor(index);
              }}
            >
              <div
                className={`h-4 w-4 ${colorList(index)} rounded`}
                style={{ display: 'inline-block' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
