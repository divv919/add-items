import { useEffect, useState } from "react";

interface BufferObject {
  type: string;
  data: number[];
}

interface ImageData {
  data: BufferObject;
  contentType: string;
  fileName: string;
}

interface Item {
  _id: string;
  itemName: string;
  itemType: string;
  itemDescription: string;
  coverImage: ImageData;
  additionalImage: ImageData[];
  createdAt: string;
}

export const View = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [carouselIndexes, setCarouselIndexes] = useState<number[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("http://localhost:3000/get-data");
      const data = await res.json();
      setItems(data);
      setCarouselIndexes(Array(data.length).fill(0));
    }
    fetchItems();
  }, []);

  const bufferToUrl = (data: number[], type: string) => {
    const blob = new Blob([new Uint8Array(data)], { type });
    return URL.createObjectURL(blob);
  };

  const handleNext = (itemIndex: number) => {
    setCarouselIndexes((prev) =>
      prev.map((val, idx) =>
        idx === itemIndex
          ? (val + 1) % items[itemIndex].additionalImage.length
          : val
      )
    );
  };

  const handlePrev = (itemIndex: number) => {
    setCarouselIndexes((prev) =>
      prev.map((val, idx) =>
        idx === itemIndex
          ? (val - 1 + items[itemIndex].additionalImage.length) %
            items[itemIndex].additionalImage.length
          : val
      )
    );
  };

  if (!items.length) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {items.map((item, idx) => (
        <div
          key={item._id}
          className="border rounded-lg shadow bg-white p-6 space-y-4"
        >
          <div className="text-2xl font-semibold text-indigo-700">
            {item.itemName}
          </div>
          <div className="text-sm text-gray-500">{item.itemType}</div>
          <div className="text-md text-gray-700">{item.itemDescription}</div>

          <div>
            <h3 className="font-medium text-gray-600 mb-2">Cover Image</h3>
            <img
              src={bufferToUrl(
                item.coverImage?.data?.data ?? [],
                item.coverImage?.contentType ?? "image/jpeg"
              )}
              alt="Cover"
              className="w-full max-h-[300px] object-contain rounded-md shadow"
            />
          </div>

          {item.additionalImage.length > 0 &&
            carouselIndexes[idx] < item.additionalImage.length && (
              <div>
                <h3 className="font-medium text-gray-600 mb-2">
                  Additional Images
                </h3>
                <div className="relative flex items-center justify-center">
                  <button
                    onClick={() => handlePrev(idx)}
                    className="absolute left-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
                  >
                    ◀
                  </button>

                  <img
                    src={bufferToUrl(
                      item.additionalImage[carouselIndexes[idx]]?.data?.data ??
                        [],
                      item.additionalImage[carouselIndexes[idx]]?.contentType ??
                        "image/jpeg"
                    )}
                    alt="Additional"
                    className="max-h-[250px] object-contain rounded-md shadow"
                  />

                  <button
                    onClick={() => handleNext(idx)}
                    className="absolute right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
                  >
                    ▶
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-2">
                  {carouselIndexes[idx] + 1} / {item.additionalImage.length}
                </p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
