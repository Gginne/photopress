import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
import { useEffect, useState } from "react";
  
  export default function CreatePhotoDialog({ imageFile, onClose, onConfirm }: any) {
    
    const [title, setTitle] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [notes, setNotes] = useState("");
    
    const handleSave = () => {
      onConfirm(title, notes, imageFile);
      setTitle("");
      setNotes("");
      setImagePreview("");
      onClose();
    }

    useEffect(() => {
      if(!imageFile) return;
      setTitle(imageFile.name);
      setImagePreview(URL.createObjectURL(imageFile));
    }, [imageFile]);
  
    return (
    
      <Dialog open={imageFile ? true : false} onOpenChange={onClose} >
        <DialogContent className="max-w-full max-h-full">
          <DialogHeader>
            <DialogTitle><input className="input py-1 px-2 border border-gray-300 w-full" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/></DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 w-full gap-2">
                <div className="col-span-1">
                  <textarea className="input py-1 px-2 w-full border border-gray-300" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)}/>
                  <input className="input py-1 px-2 w-full border border-gray-300" type="text" placeholder="Tags" />
                </div>  
                <div className="col-span-1">
                  <img src={imagePreview} />
                </div>
              </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="btn bg-teal-500 py-1 px-2 text-white rounded hover:bg-teal-600" onClick={handleSave}>Save</button>
            <button className="btn bg-red-500 py-1 px-2 text-white rounded hover:bg-red-600" onClick={onClose}>Cancel</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    );
  }
  