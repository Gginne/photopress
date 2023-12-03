import React, { useMemo, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";
import useRequest from "../../hooks/useRequest";
import { getPhotos } from "../../services/photoService";
import PhotoCard from "./PhotoCard";
import PhotoDialog from "./PhotoDialog";

const Photos = (props) => {
  const { accessToken } = useAuth();
  const getPhotoRequest = useRequest(getPhotos());

  useEffect(() => {
    getPhotoRequest.trigger();
  }, []);

  const photos = useMemo(
    () => getPhotoRequest.data ?? [],
    [getPhotoRequest.data]
  );

  const handlePhotoDelete = async (id: string) => {
    try {
      await axios.delete(`/api/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(accessToken),
        },
      });

      getPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoView = (photo) => {
    console.log(photo);
  };

  return (
    <>
    <PhotoDialog />
    <div className="flex">
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {photos.map((photo, index) => (
              <PhotoCard key={index} data={photo} onView={() => handlePhotoView(photo)}/>
            ))}
          </div>
        </div>
      </div>

      {/* <AlbumList /> */}
    </div>
    </>
  );
};

export default Photos;
