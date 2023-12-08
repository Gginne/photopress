import { useMemo, useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { getPhotos } from "../../services/photoService";
import PhotoCard from "./PhotoCard";
import PhotoDialog from "./PhotoDialog";


const Photos = () => {
  const getPhotoRequest = useRequest(getPhotos());
  const [showMore, setShowMore] = useState(null);

  useEffect(() => {
    getPhotoRequest.trigger();
  }, []);

  

  const handlePhotosChange = () => {
    getPhotoRequest.clear();
    getPhotoRequest.trigger();

  };

  const photos = useMemo(
    () => getPhotoRequest.data ?? [],
    [getPhotoRequest.data]
  );


  return (
    <>
    <PhotoDialog data={showMore} onClose={() => setShowMore(null)} onPhotosChange={handlePhotosChange}/>
    <div className="flex">
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {photos.map((photo: any, index: number) => (
              <PhotoCard key={index} data={photo} onShowMore={(photo) => setShowMore(photo)}/>
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
