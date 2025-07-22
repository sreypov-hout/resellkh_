'use client';

import { useState, useEffect } from 'react';
import { fileStore } from '@/lib/fileStore';

const processFile = (file, index) => {
  if (file instanceof File) {
    return {
      id: `${file.name}-${file.lastModified}-${index}`,
      name: file.name,
      type: file.type.startsWith('video') ? 'video' : 'image',
      previewUrl: URL.createObjectURL(file),
      fileObject: file,
    };
  }
  if (file && file.url) {
    const isVideo = file.url.match(/\.(mp4|webm|ogg)$/i) || 
                   (file.type && file.type.startsWith('video'));
    return {
      id: file.id || `loaded-media-${index}`,
      name: file.name || `Loaded ${isVideo ? 'Video' : 'Image'} ${index + 1}`,
      type: isVideo ? 'video' : 'image',
      previewUrl: file.url,
      fileObject: file,
    };
  }
  return null;
};

export default function PhotoUploader({ initialFiles = [], onFilesChange }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let filesToProcess = [];

    if (initialFiles.length > 0) {
      filesToProcess = initialFiles;
    } 
    else if (fileStore.files.length > 0) {
      filesToProcess = fileStore.files;
      fileStore.files = [];
    }

    if (filesToProcess.length > 0) {
      const processed = filesToProcess.map(processFile).filter(Boolean);
      setFiles(processed);
    }
  }, []);

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files.map(f => f.fileObject));
    }
  }, [files, onFilesChange]);

  const addFiles = (newFileObjects) => {
    const newProcessedFiles = Array.from(newFileObjects).map(processFile).filter(Boolean);
    setFiles(prevFiles => {
      const combined = [...prevFiles, ...newProcessedFiles];
      const unique = combined.filter((file, index, self) => 
        index === self.findIndex(f => f.id === file.id)
      );
      return unique.slice(0, 5);
    });
  };

  const handleRemove = (idToRemove) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== idToRemove));
  };

  const moveToFirst = (id) => {
    setFiles(prevFiles => {
      const fileToMove = prevFiles.find(f => f.id === id);
      if (!fileToMove) return prevFiles;
      
      const filtered = prevFiles.filter(f => f.id !== id);
      return [fileToMove, ...filtered];
    });
  };

  return (
    <>
      {/* Upload Drop Zone */}
      {files.length < 5 && (
        <div
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`bg-orange-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group transition ${
            isDragging ? 'border-orange-500 bg-orange-100' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-100'
          }`}
        >
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <input 
              type="file" 
              multiple 
              accept="image/*,video/*" 
              onChange={(e) => addFiles(e.target.files)} 
              className="hidden"
            />
            <div className="mb-4">
              <img src="/images/story set/image.jpg" alt="Upload Icon" className='w-[40px]'/>
            </div>
            <div className="mb-4">
              <span className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                {files.length === 0 ? 'Select photos/videos' : 'Add more'}
              </span>
            </div>
            <p className="text-gray-700 text-[15px]">
              or drag media here<br/>(up to 5 photos/videos)
            </p>
          </label>
        </div>
      )}

      {/* Media Previews */}
      {files.length > 0 && (
        <>
          <p className="text-[13px] text-gray-400 mt-2">
            Tip: Click "Make Cover" to set as first image or re-arrange photos to change cover.
          </p>
          <div className={`grid ${files.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-3 gap-4 mt-4`}>
            {files.map((file, index) => (
              <div key={file.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm relative group">
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <span className="text-sm font-medium text-black">
                    {index === 0 ? 'Cover' : `Media ${index + 1}`}
                  </span>
                  <div className="flex gap-2">
                    {index !== 0 && (
                      <button 
                        onClick={() => moveToFirst(file.id)}
                        className="text-gray-500 hover:text-orange-500 transition"
                        title="Make Cover"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => handleRemove(file.id)} 
                      className="text-gray-500 hover:text-red-500 transition"
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6L18.4 19.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9L5 6m1 0L6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l0 2" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 relative">
                  {file.type === 'video' ? (
                    <video 
                      src={file.previewUrl} 
                      className="w-full h-full object-cover" 
                      controls 
                      playsInline
                    />
                  ) : (
                    <img 
                      src={file.previewUrl} 
                      alt={file.name} 
                      className="w-full h-48 object-cover" 
                    />
                  )}
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {file.type === 'video' ? 'VIDEO' : 'IMAGE'}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-right mt-1">
            {files.length}/5 {files.length === 5 && '(Maximum reached)'}
          </p>
        </>
      )}
    </>
  );
}