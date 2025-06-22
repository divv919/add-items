import { useEffect, useRef, useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { IconPlus } from "@tabler/icons-react";
import { UploadImages } from "../components/UploadCover";
import { TextArea } from "../components/TextArea";
import { Button } from "../components/Button";
import axios from "axios";
export const AddItem = () => {
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [additionalImage, setAdditionalImage] = useState<File[]>([]);

  const NameRef = useRef<HTMLInputElement | null>(null);
  const DescriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    nameError: string | null;
    selectedError: string | null;
    descriptionError: string | null;
  }>({
    nameError: null,
    selectedError: null,
    descriptionError: null,
  });

  useEffect(() => {
    let itrv: number;
    if (isModalOpen) {
      itrv = setTimeout(() => {
        setIsModalOpen(false);
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(itrv);
  }, [isModalOpen]);

  useEffect(() => {
    console.log("is modal open : ", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    console.log("errors : ", errors);
  });

  async function handleSubmit() {
    const name = NameRef.current?.value.trim();
    const description = DescriptionRef.current?.value.trim();

    const newErrors = {
      nameError: !name ? "Item Name cannot be empty" : null,
      descriptionError: !description
        ? "Item Description cannot be empty"
        : null,
      selectedError: !selected ? "Item type must be selected" : null,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== null);
    if (hasErrors) return;

    const formData = new FormData();
    if (NameRef.current && DescriptionRef.current && selected) {
      formData.append("itemName", NameRef.current.value);
      formData.append("itemDescription", DescriptionRef.current.value);
      formData.append("itemType", selected);
      formData.append("coverImage", coverImage[0]);
    }

    additionalImage.forEach((file) => {
      formData.append("additionalImage", file);
    });
    const response = await axios.post(
      "http://localhost:3000/add-data",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      setIsModalOpen(true);
    }
  }

  return (
    <div className="w-full py-[24px] h-fit min-h-screen flex flex-col justify-center items-center gap-[16px] bg-neutral-50">
      <div className="flex flex-col gap-[24px] w-[456px] h-fit border border-neutral-300 bg-white rounded-md p-[36px]">
        <div className="flex gap-[4px] items-center font-bold tracking-tighter text-[20px] text-indigo-600">
          <IconPlus /> Add New Item
        </div>
        <Input
          ref={NameRef}
          placeholder="Enter Item Name"
          label="Item Name"
          error={errors.nameError}
        />
        <Select
          selected={selected}
          setSelected={setSelected}
          label="Item Type"
          options={["Shirt", "Pant", "Shoes", "Sports Gear"]}
          placeholder="Select Item Type"
          error={errors.selectedError}
        />
        <TextArea
          ref={DescriptionRef}
          placeholder="Enter Description"
          label="Item Description"
          error={errors.descriptionError}
        />
        <UploadImages
          images={coverImage}
          setImages={setCoverImage}
          id="1"
          label="Upload Cover Image"
          maxFileLength={1}
        />
        <UploadImages
          images={additionalImage}
          setImages={setAdditionalImage}
          id="2"
          label="Upload Additional Images"
        />
        {/* <label>Hi</label> */}
        {/* <input type="file"></input> */}
        {/* <UploadImages label="Upload Additional Images" maxFileLength={2} /> */}
        {/* 
      <input type="file" onChange={handleFileChange}></input>
      {file && <img src={URL.createObjectURL(file)}></img>} */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} text="Add Item" />
        </div>
      </div>
      <div
        className={`${
          isModalOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 pointer-events-none"
        } absolute h-screen w-screen top-0 left-0 bg-neutral-50 text-indigo-600 text-[36px] font-bold flex justify-center items-center transition-all duration-200 ease-in-out`}
      >
        Item Added Successfully
      </div>
    </div>
  );
};
