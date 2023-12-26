import { MdAddPhotoAlternate } from "react-icons/md";
export default function AlbumList() {
  return (
    <>
      <div className="p-4 flex gap-2">
        <button className="w-full bg-emerald-500 mb-2 py-2 px-4 rounded-sm font-size-lg flex-1">
          <MdAddPhotoAlternate />
        </button>

        <input
          type="text"
          placeholder="Search Albums"
          className="w-full bg-gray-700 mb-2 py-2 px-4 rounded-sm flex-2"
        />
      </div>

      <ul className="flex flex-col gap-2"></ul>
    </>
  );
}
