import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
import { useEffect, useState } from "react";
  
  export default function CreatePhotoDialog({ file, onClose }: any) {
    
    const [title, setTitle] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      if(!file) return;
      setTitle(file.name);
      setImagePreview(URL.createObjectURL(file));
    }, [file]);
  
    return (
    
      <Dialog open={file ? true : false} onOpenChange={onClose} >
        <DialogContent style={{ maxWidth: "800px" }}>
          <DialogHeader>
            <DialogTitle><input className="input py-1 px-2 border border-gray-300" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/></DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 w-full gap-2">
                <div className="col-span-1">
                  <textarea className="input py-1 px-2 w-full border border-gray-300" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                  <input className="input py-1 px-2 w-full border border-gray-300" type="text" placeholder="Tags" />
                </div>  
                <div className="col-span-1">
                  <img src={imagePreview} />
                </div>
              </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="btn bg-teal-500 py-1 px-2 text-white rounded hover:bg-teal-600">Save</button>
            <button className="btn bg-red-500 py-1 px-2 text-white rounded hover:bg-red-600">Cancel</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    );
  }
  