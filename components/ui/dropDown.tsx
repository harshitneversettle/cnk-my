'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder = 'Select', onChange }) => {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAnimating(false), 200);
  }, []);

  const openDropdown = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimating(false);
    setOpen(true);
    setAnimating(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closeDropdown]);

  const handleToggle = () => (open ? closeDropdown() : openDropdown());

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange?.(option);
    closeDropdown();
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={handleToggle}
        className="hover:border-blue/70 border-roundness flex w-full cursor-pointer items-center justify-between border border-black/10 bg-white px-3 py-2 text-sm text-black/80 transition-colors focus:outline-none"
      >
        <span className={selected ? 'text-black/80' : 'text-gray'}>{selected ?? placeholder}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className={`text-gray transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {(open || animating) && (
        <ul
          className={`border-white-secondary border-roundness absolute z-50 mt-1 w-full overflow-hidden border bg-white shadow-md transition-all duration-200 ease-out ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`hover:bg-blue/5 hover:text-blue cursor-pointer px-3 py-2 text-sm transition-colors ${
                selected === option ? 'bg-blue/5 text-blue' : 'text-black/80'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
