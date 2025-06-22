import type { Ref } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  ref: Ref<HTMLInputElement>;
  error: string | null;
}
export const Input = ({ label, placeholder, ref, error }: InputProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-medium text-[16px] text-indigo-700 tracking-tight">
        {label}
      </label>
      <input
        ref={ref}
        className={`${
          error ? "outline outline-red-600" : "focus:outline-1"
        }  border border-neutral-300 rounded-md px-[8px] py-[6px] text-[14px]`}
        placeholder={placeholder}
      ></input>
    </div>
  );
};
