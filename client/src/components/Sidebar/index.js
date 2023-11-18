import React from "react";
import { FaImage, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const {logout} = useAuth()
  return (
    <div className="bg-black flex flex-col justify-between h-full py-24 shadow-sm">
      <ul>
        <li className="mb-8 flex flex-col items-center text-center text-xs cursor-pointer">
          <FaImage className="text-2xl mb-1" />
          <span className="font-semibold">Photos</span>
        </li>
        <li className="mb-8 flex flex-col items-center text-center text-xs cursor-pointer">
          <FaPlus className="text-2xl mb-1" />
          <span className="font-semibold">Add</span>
        </li>
        {/* Add more similar list items for additional links */}
      </ul>

      <ul>
        <li className="mb-8 flex flex-col items-center text-center text-xs cursor-pointer">
          <FaSignOutAlt className="text-2xl mb-1" />
          <span className="font-semibold" onClick={logout}>Logout</span>
        </li>
        {/* Add more similar list items for additional links */}
      </ul>
    </div>
  );
}
