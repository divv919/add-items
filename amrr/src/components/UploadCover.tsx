import { IconPhoto, IconPlus, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { fileSizeFormat } from "../util/fileSizeFormat";

interface UploadImagesProps {
  label: string;
  maxFileLength?: number;
  id: string;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}
export const UploadImages = ({
  label,
  maxFileLength = 4,
  id,
  images,
  setImages,
}: UploadImagesProps) => {
  const [disabled, setDisabled] = useState(false);
  console.log("disabed : ", disabled);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setImages((prev) => [...prev, file]);
      }
    }
  }
  useEffect(() => {
    if (images.length >= maxFileLength) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [images, maxFileLength]);

  const handleClose = (idx: number) => {
    const newimages = images.filter((_, i) => {
      return i !== idx;
    });
    setImages(newimages);
  };
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-medium text-[16px] text-indigo-700 tracking-tight">
        {label}
      </label>
      <div className="  relative">
        <input
          className="opacity-0 cursor-pointer  w-[80px] border bg-red-400"
          type="file"
          id={id}
          onChange={handleChange}
          disabled={disabled}
        ></input>
        <label htmlFor={id} className="absolute left-0 top-0 ">
          <button
            className={`${
              disabled
                ? "bg-neutral-200 cursor-not-allowed"
                : "pointer-events-none"
            } p-[4px]   text-[14px] text-neutral-600 flex gap-[4px] border items-center border-neutral-300 rounded-md`}
          >
            <IconPlus size={18} /> Upload
          </button>
        </label>
      </div>
      {!!images.length && (
        <div className="mt-[8px] flex flex-col gap-[6px] text-[14px] text-neutral-800 ">
          {images.map((file, idx) => (
            <div className="hover:bg-neutral-200 flex items-center justify-between px-[8px] py-[6px] border border-neutral-300 rounded-md">
              <div className="tracking-tight flex gap-[8px] items-center">
                <IconPhoto size={16} />
                <div className="flex flex-col ">
                  <div> {file.name}</div>
                  <div className="font-light text-[12px] tracking-wide">
                    {fileSizeFormat(file.size)}
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleClose(idx)}
                className="hover:bg-red-200 rounded-md hover:text-red-400 transition duration-300 ease-in-out p-[4px] cursor-pointer"
              >
                <IconX size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
