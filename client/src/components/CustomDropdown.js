import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useOutsideAlerter } from '../hooks/useOutsideAlert'

const CustomDropdown = ({ className, title, items}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeText, setActiveText] = useState(title)

  const dropdownRef = useRef(null);

  useOutsideAlerter(dropdownRef, () => setIsOpen(false));

  return (
    <div 
      className={classNames(
        className,
        'relative inline-block'
      )}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full py-2'
      >
        {activeText}
      </button>
      
      {isOpen && (
        <div className={classNames(
          'absolute mt-2 transform -translate-x-1/2 left-1/2',
          'flex flex-col text-center shadow-lg py-1.5',
          'min-w-full whitespace-nowrap rounded-lg bg-white'
        )}>
          {items.map((item, index) => (
            <button
              key={index}
              className="transition-colors w-full py-2 hover:bg-blue-300/50"
              onClick={() => {
                setIsOpen(false)
                setActiveText(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;