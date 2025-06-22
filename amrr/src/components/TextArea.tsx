import type { Ref } from "react";

interface TextAreaProps {
  label: string;
  placeholder: string;
  ref: Ref<HTMLTextAreaElement>;
  error: string | null;
}
export const TextArea = ({ label, placeholder, ref, error }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-medium text-[16px] text-indigo-700 tracking-tight">
        {label}
      </label>
      <textarea
        ref={ref}
        className={`${
          error ? "outline outline-red-600" : ""
        } min-h-[76px] max-h-[76px] focus:outline-1 border border-neutral-300 rounded-md px-[8px] py-[6px] text-[14px]`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
