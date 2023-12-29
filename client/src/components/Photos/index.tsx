import { useMemo, useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { getPhotos, savePhoto } from "../../services/photoService";
import PhotoCard from "./PhotoCard";
import PhotoDialog from "./PhotoDialog";
import CreatePhotoDialog from "./CreatePhotoDialog";
import { MdAddAPhoto } from "react-icons/md";

const Photos = () => {
  const getPhotoRequest = useRequest(getPhotos());
  const savePhotoRequest = useRequest(savePhoto());
  const [showMore, setShowMore] = useState(null);
  const [newPhoto, setNewPhoto] = useState<File>();
  
  const handlePhotosChange = () => {
    getPhotoRequest.clear();
    getPhotoRequest.trigger();

  };

  const handlePhotoSave = async (title: string, notes: string, image: File) => {

    const formData = new FormData();

    formData.append('image',  image);
    formData.append('title', title);
    formData.append('notes', notes);
    formData.append('tags', "");

    await savePhotoRequest.trigger(formData);

    getPhotoRequest.trigger();
    

  }
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const photo = e.target.files[0];
    
    setNewPhoto(photo);
  } 
  
  const photos = useMemo(
    () => getPhotoRequest.data ?? [],
    [getPhotoRequest.data]
  );
  
  useEffect(() => {
    getPhotoRequest.trigger();
  }, []);

  return (
    <>
    <PhotoDialog data={showMore} onClose={() => setShowMore(null)} onPhotosChange={handlePhotosChange}/>

        <div className="p-2 flex justify-between">
          <input className="w-2/5 border border-gray-300 p-2 rounded" placeholder="Search Photos" />
          <label className="bg-emerald-500 text-white p-2 rounded cursor-pointer">
            <MdAddAPhoto size={20}/>
            <input type="file"  accept="image/*" style={{ opacity: 0, position: "absolute", left: "-9999px"}} onChange={handleSelectPhoto} />
        
          </label>
          <CreatePhotoDialog imageFile={newPhoto} onClose={() => setNewPhoto(undefined)} onConfirm={handlePhotoSave}/>
        </div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-12 gap-4">
            {photos.map((photo: any, index: number) => (
              <PhotoCard key={index} data={photo} onShowMore={(photo) => setShowMore(photo)}/>
            ))}
          </div>
        </div>
 
    </>
  );
};

export default Photos;
