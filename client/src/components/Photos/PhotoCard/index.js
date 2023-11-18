import React from "react";
import { IoMdDownload } from "react-icons/io";

const PhotoCard = ({ data }) => {
  const handleDownload = (url) => {
    console.log("downloaded", url);
  };
  return (
    <div className="relative overflow-hidden rounded-lg shadow-sm">
      <img
        src={data.src}
        alt={`image-${data.title}`}
        className="w-full h-full object-cover"
      />
      <button
        className="display-none absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md sm:display-block"
        onClick={() => handleDownload(data.src)} // Replace with your download function
      >
        <IoMdDownload size={24} />
      </button>
    </div>
  );
};

export default PhotoCard;
