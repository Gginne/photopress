import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import  useRequest from "@/hooks/useRequest";
import { deletePhotos } from "@/services/photoService";

const formatDateTime = (ds: string) => new Date(ds).toLocaleString();

export default function PhotoDialog({ data, onClose, onPhotosChange }: any) {

  const deletePhotoRequest = useRequest(deletePhotos(data?._id));

  const handleDelete = async () => {
    await deletePhotoRequest.trigger();
    onPhotosChange();
    onClose()
  }

  return (
    <Dialog open={data ? true : false} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.title}</DialogTitle>
          <DialogDescription>
            {
              <div>
                <p>{data?.notes}</p>
                <p>Uploaded: {formatDateTime(data?.created_at)} </p>
              </div>
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="btn bg-teal-500 py-1 px-2 text-white rounded hover:bg-teal-600">Edit</button>
          <button className="btn bg-red-500 py-1 px-2 text-white rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
