import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
interface SelectProps {
  options: string[];
  placeholder: string;
  label: string;
  selected: string | null;
  setSelected: (x: string) => void;
  error: string | null;
}
export const Select = ({
  options,
  placeholder,
  label,
  selected,
  error,
  setSelected,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[8px] relative">
      <div className="font-medium text-[16px] text-indigo-700 tracking-tight">
        {label}
      </div>
      {!selected ? (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`${
            error ? "outline outline-red-600 " : ""
          } text-neutral-500 border cursor-pointer border-neutral-300 rounded-md px-[8px] py-[6px] text-[14px] `}
        >
          {placeholder}
        </div>
      ) : (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className=" text-neutral-800 border cursor-pointer border-neutral-300 rounded-md px-[8px] py-[6px] text-[14px]"
        >
          {selected}
        </div>
      )}

      {isOpen && (
        <div className="border border-neutral-300 absolute top-17 bg-white py-[8px] px-[6px]  flex flex-col gap-[12px] rounded-md shadow w-full">
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`${
                  selected === option ? "bg-green-100 " : ""
                } relative rounded-md  px-[8px] py-[2px] text-neutral-700 tracking-tight text-[16px] cursor-pointer hover:bg-neutral-200`}
              >
                {option}
                {selected === option && (
                  <span className="absolute translate-y-1/4 right-4">
                    <IconCheck size={16} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      <span
        className={`${
          isOpen ? "rotate-180 -translate-y-1.5" : "-translate-y-0.5"
        } text-neutral-500 text-lg  absolute top-10 right-4 transition-all duration-200 ease-in-out`}
      >
        ^
      </span>
    </div>
  );
};
