import AlbumList from "../AlbumList";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TiThMenu } from "react-icons/ti";

const Layout = () => {
  const { currentUser, logout} = useAuth();
  return currentUser !== null ? (

    
      <div className="grid grid-cols-12 h-full overflow-hidden">

        <div className="bg-black text-white col-span-12 xl:col-span-3 lg:col-span-2 h-2/5 lg:h-full overflow-y-auto">
          
          <div className="p-4 font-bold flex justify-between">
            <h2>Photopress</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-gray-700 rounded-full px-1 focus:outline-none"><TiThMenu/></DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-gray-700">
                <DropdownMenuItem className="text-white hover:bg-gray-700" onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <hr />
          
          <AlbumList />

        </div>

        <div className="col-span-12 xl:col-span-9 lg:col-span-10  h-3/5 lg:h-full max-w-full overflow-hidden">
          <Outlet />
        </div>
        
      </div>
  
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default Layout;
