// ====== src/components/sell/PhotoUploader.js ======
'use client';

import { useState, useEffect } from 'react';

export default function PhotoUploader({ files, setFiles, onFilesReady }) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Clean up object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    addFiles(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => 
      file instanceof File && 
      (file.type.startsWith('image/') || file.type.startsWith('video/'))
    );

    if (validFiles.length === 0) return;

    const currentFiles = files.filter(f => f instanceof File);
    const updatedFiles = [...currentFiles, ...validFiles].slice(0, 5);
    
    setFiles(updatedFiles);
    prepareFilesForUpload(updatedFiles);
  };

  const prepareFilesForUpload = (filesToPrepare) => {
    const newPreviewUrls = [];
    const filesData = filesToPrepare.map(file => {
      if (file instanceof File) {
        const previewUrl = URL.createObjectURL(file);
        newPreviewUrls.push(previewUrl);
        return {
          file, // The actual File object
          previewUrl,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name,
          size: file.size
        };
      }
      return file; // Return existing file objects as-is
    });

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    if (onFilesReady) {
      onFilesReady(filesData);
    }
  };

  const handleRemove = (index) => {
    const updated = [...files];
    const removed = updated.splice(index, 1);
    
    // Revoke the object URL for the removed file
    if (removed[0] instanceof File) {
      URL.revokeObjectURL(removed[0].previewUrl);
    }
    
    setFiles(updated);
    if (onFilesReady) {
      onFilesReady(updated);
    }
  };

  const getMediaProps = (file, index) => {
    if (file instanceof File) {
      return {
        src: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        name: file.name
      };
    } else if (typeof file === 'object' && file !== null && file.url) {
      return {
        src: file.url,
        type: file.type || (file.url.match(/\.(mp4|mov|avi|webm)$/i) ? 'video' : 'image'),
        name: file.name || `Uploaded file ${index + 1}`
      };
    }
    return {
      src: '/placeholder.png',
      type: 'image',
      name: 'Placeholder'
    };
  };

  return (
    <>
      {/* Upload Drop Zone - Only show if we have less than 5 files */}
      {files.length < 5 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`bg-orange-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group transition
            ${isDragging ? 'border-orange-500 bg-orange-100' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-100'}`}
        >
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={files.length >= 5}
            />
            <div className="mb-4">
              <img src="/images/story set/image.jpg" alt="Upload Icon" className='w-[40px]' />
            </div>
            <div className="mb-4">
              <span className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                {files.length === 0 ? 'Select photos/videos' : 'Add more'}
              </span>
            </div>
            <p className="text-gray-700 text-[15px]">
              or drag media here<br />(up to 5 photos/videos)
            </p>
          </label>
        </div>
      )}

      {files.length > 0 && (
        <>
          <p className="text-[13px] text-gray-400 mt-2">Tip: Re-arrange photos to change cover.</p>

          {/* Media Previews */}
          <div className={`grid ${files.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-3 gap-4 mt-4`}>
            {files.map((file, index) => {
              const { src, type, name } = getMediaProps(file, index);
              return (
                <div
                  key={file.id || file.name || index}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm relative group"
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <span className="text-sm font-medium text-black">
                      {index === 0 ? 'Cover' : `Media ${index + 1}`}
                    </span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-gray-500 hover:text-red-500 transition"
                      aria-label={`Remove ${name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6L18.4 19.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9L5 6m1 0L6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l0 2" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 relative">
                    {type === 'video' ? (
                      <>
                        <video 
                          src={src} 
                          className="w-full h-full object-cover"
                          controls
                          aria-label={`Video preview: ${name}`}
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          Video
                        </div>
                      </>
                    ) : (
                      <img
                        src={src}
                        alt={`Preview: ${name}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-500 text-right mt-1">
            {files.length}/5 {files.length === 5 && '(Maximum reached)'}
          </p>
        </>
      )}
    </>
  );
}