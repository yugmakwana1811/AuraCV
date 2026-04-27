import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Check } from 'lucide-react';
import { useToast } from './ToastProvider';

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpdate: (url: string) => void;
}

export default function ProfileImageModal({ isOpen, onClose, onImageUpdate }: ProfileImageModalProps) {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSave = () => {
    if (!completedCrop || !imgRef.current) {
      addToast('Please select a valid crop area', 'error');
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    onImageUpdate(base64Image);
    addToast('Profile picture updated successfully', 'success');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       const reader = new FileReader();
       reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
       reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-white/50 relative p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 disabled:opacity-50"
            >
              <X size={24} />
            </button>

            <h2 id="image-modal-title" className="text-2xl font-bold font-h3 mb-2 text-on-surface">Update Profile Picture</h2>
            <p className="text-slate-500 mb-8 font-medium">
              Upload a new photo and select the cropping area.
            </p>

            {!imgSrc ? (
              <div 
                className="w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                 <Upload size={48} className="mb-4 text-blue-500/50" />
                 <p className="font-bold mb-2">Click or drag image here</p>
                 <p className="text-xs">Supports JPG, PNG up to 5MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="bg-slate-50 rounded-xl overflow-hidden mb-6 max-h-[300px] flex items-center justify-center border border-slate-200">
                  <ReactCrop 
                    crop={crop} 
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    circularCrop
                  >
                    <img 
                      ref={imgRef} 
                      src={imgSrc} 
                      alt="Crop preview" 
                      className="max-h-[300px] w-auto object-contain"
                    />
                  </ReactCrop>
                </div>

                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => setImgSrc('')}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                     Reset
                  </button>
                  <button 
                    onClick={onSave}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                     <Check size={18} /> Apply Change
                  </button>
                </div>
              </div>
            )}

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={onSelectFile} 
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
