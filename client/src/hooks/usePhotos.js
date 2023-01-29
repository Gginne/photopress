import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export default function usePhotos(albumId = null) {
  const [photos, setPhotos] = useState([]);
  const { user } = useContext(UserContext);

  const getPhotos = async () => {
    const { token } = user;
    const url = albumId ? `/api/albums/${albumId}` : "/api/photos";

    try {
      const album = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });
      //Fix for general album use
      setPhotos(album.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = async (id) => {
    const { token } = user;
    console.log(id)
    try {
      await axios.delete(`/api/photos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": String(token),
        },
      });
      getPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhotos();

    const interval = setInterval(() => {
      getPhotos();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [albumId]);

  return { photos, deletePhoto };
}
