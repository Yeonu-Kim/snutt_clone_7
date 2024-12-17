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
        className="flex items-center justify-between w-32 px-2 py-1 border rounded cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div
          className={`h-4 w-4 ${validColorClass} rounded`}
          style={{ display: 'inline-block' }}
        />
        <span className="text-sm text-gray-600 ml-2">▼</span>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-32 bg-white border rounded shadow-lg z-10">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 ${
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
