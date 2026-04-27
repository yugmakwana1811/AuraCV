import React, { useState, useRef } from 'react';
import { UploadCloud, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from './ToastProvider';

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Only accept PDF/DOC files for simulation
    if (!selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
      addToast('Invalid file format. Please upload PDF or DOCX.', 'error');
      return;
    }
    setFile(selectedFile);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            addToast('Resume analyzed successfully', 'success');
            onClose();
            // Reset state
            setTimeout(() => {
              setFile(null);
              setProgress(0);
            }, 500);
          }, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 20);
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-card w-full max-w-lg rounded-[2rem] p-8 relative bg-white/95 shadow-2xl"
        >
          <button
            onClick={onClose}
            disabled={isUploading}
            aria-label="Close modal"
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={24} />
          </button>

          <h2 id="upload-modal-title" className="text-2xl font-bold font-h3 mb-2 text-on-surface">Analyze Resume</h2>
          <p className="text-slate-500 mb-8 font-medium">
            Upload your resume to generate a solar profile.
          </p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-slate-300 hover:border-primary/50'
            }`}
          >
            {isUploading ? (
              <div className="w-full max-w-xs flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                  <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-blue-100" />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="226"
                      strokeDashoffset={226 - (226 * progress) / 100}
                      strokeLinecap="round"
                      className="text-primary transition-all duration-300"
                    />
                  </svg>
                  <span className="text-sm font-bold text-primary">
                    {Math.min(100, Math.round(progress))}%
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-700 mb-3 animate-pulse">
                  Analyzing Data Streams...
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : file ? (
              <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="font-bold text-slate-700">{file.name}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 shadow-sm border border-slate-100">
                  <UploadCloud size={32} />
                </div>
                <p className="font-bold text-slate-700 mb-2">Drag & Drop your resume here</p>
                <p className="text-xs text-slate-500 mb-6 font-medium">
                  Supports PDF, DOCX (Max 10MB)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                  Browse Files
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
