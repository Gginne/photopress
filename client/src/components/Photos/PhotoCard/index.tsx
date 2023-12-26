import { useState } from "react";
import { IoMdDownload, IoMdEye } from "react-icons/io";

interface PhotoCardProps {
  data: any; // Replace any with the appropriate type for your photo data
  onShowMore: (data: any) => void;
}
const PhotoCard = ({ data, onShowMore }: PhotoCardProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const handleDownload = (url: string) => {
    console.log("downloaded", url);
  };
  const handleShowMore = () => {
    onShowMore(data);
  };
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-sm"
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img
        src={data.src}
        alt={`image-${data.title}`}
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 flex sm:${
          showOptions ? "flex" : "hidden"
        } flex-row justify-end`}
      >
        <button
          className=" mr-2 bg-white rounded-full p-2 cursor-pointer"
          onClick={() => handleDownload(data.src)} // Replace with your download function
        >
          <IoMdDownload size={20} />
        </button>

        <button
          className="bg-white rounded-full p-2 cursor-pointer"
          onClick={() => handleShowMore()} // Replace with your download function
        >
          <IoMdEye size={20} />
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
