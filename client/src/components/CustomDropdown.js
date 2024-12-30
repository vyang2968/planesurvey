import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useOutsideAlerter } from '../hooks/useOutsideAlert'
import { text } from '@fortawesome/fontawesome-svg-core';

const CustomDropdown = ({ className, placeholder, items, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(placeholder)

    const dropdownRef = useRef(null);

    useOutsideAlerter(dropdownRef, () => setIsOpen(false));

    function processText(text) {
      text = text.replace(/([A-Z])/g, " $1")
      return text.charAt(0).toUpperCase() + text.slice(1);  
    }

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
          {processText(activeItem)}
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
                className="transition-colors w-full py-2 hover:bg-blue-300/50 text-xs"
                onClick={() => {
                  setIsOpen(false)
                  onChange(item)
                  setActiveItem(item)
                }}
              >
                {processText(item)}
              </button>
            ))}
          </div>
        )}
      </div>
    );
};

export default CustomDropdown;