
import { IoMdDownload, IoMdEye } from "react-icons/io";

interface PhotoCardProps {
  data: any; // Replace any with the appropriate type for your photo data
  onView: (data: any) => void;
}
const PhotoCard = ({ data }: PhotoCardProps) => {
  const handleDownload = (url: string) => {
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
        <IoMdDownload size={20} />
      </button>

      <button
        className="display-none absolute bottom-2 right-14 bg-white rounded-full p-2 shadow-md sm:display-block"
        onClick={() => handleDownload(data.src)} // Replace with your download function
      >
        <IoMdEye size={20} />
      </button>
    </div>
  );
};

export default PhotoCard;
