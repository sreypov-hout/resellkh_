'use client';

import { useState, useEffect, useRef } from 'react';

// Utility to detect file type by URL
async function getMediaTypeFromUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');
    return contentType || null;
  } catch (err) {
    console.error('Error fetching content type:', err);
    return null;
  }
}

const processFile = async (file, index) => {
  if (file instanceof File) {
    return {
      id: `${file.name}-${file.size}-${file.lastModified}`, // consistent ID
      name: file.name,
      type: file.type.startsWith('video') ? 'video' : 'image',
      previewUrl: URL.createObjectURL(file),
      fileObject: file,
    };
  }

  if (file?.url) {
    const contentType = await getMediaTypeFromUrl(file.url);
    const mediaType = contentType?.startsWith('video') ? 'video' : 'image';

    return {
      id: file.id || `loaded-${index}`,
      name: file.name || `Media ${index}`,
      type: mediaType,
      previewUrl: file.url,
      fileObject: file,
    };
  }

  return null;
};

export default function PhotoUploader({ initialFiles = [], onFilesChange }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const initialLoadedRef = useRef(false); // 👈 only load initial files ONCE

  useEffect(() => {
    const loadInitial = async () => {
      if (!initialLoadedRef.current && initialFiles.length > 0) {
        const processed = await Promise.all(initialFiles.map((f, i) => processFile(f, i)));
        setMediaItems((prev) => {
          const combined = [...prev, ...processed];
          return deduplicateFiles(combined).slice(0, 5);
        });
        initialLoadedRef.current = true;
      }
    };
    loadInitial();
  }, [initialFiles]);

  useEffect(() => {
    onFilesChange?.(mediaItems.map((m) => m.fileObject));
  }, [mediaItems, onFilesChange]);

  const deduplicateFiles = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      const key = item.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const addFiles = async (fileList) => {
    const files = Array.from(fileList);
    const processed = await Promise.all(files.map((f, i) => processFile(f, i)));
    setMediaItems((prev) => {
      const combined = [...prev, ...processed];
      return deduplicateFiles(combined).slice(0, 5);
    });
  };

  const handleRemove = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToFirst = (id) => {
    setMediaItems((prev) => {
      const item = prev.find((f) => f.id === id);
      const rest = prev.filter((f) => f.id !== id);
      return [item, ...rest];
    });
  };

  return (
    <>
      {mediaItems.length < 5 && (
        <div
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`bg-orange-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group transition ${
            isDragging
              ? 'border-orange-500 bg-orange-100'
              : 'border-gray-300 hover:border-orange-400 hover:bg-orange-100'
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
            <img src="/images/story set/image.jpg" alt="Upload" className="w-[40px] mb-4" />
            <span className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition mb-4">
              {mediaItems.length === 0 ? 'Select photos/videos' : 'Add more'}
            </span>
            <p className="text-gray-700 text-[15px]">
              or drag media here<br />(up to 5 photos/videos)
            </p>
          </label>
        </div>
      )}

      {mediaItems.length > 0 && (
        <>
          <p className="text-[13px] text-gray-400 mt-2">
            Tip: Click "Make Cover" to set as first image or re-arrange photos to change cover.
          </p>
          <div
            className={`grid ${
              mediaItems.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            } sm:grid-cols-3 gap-4 mt-4`}
          >
            {mediaItems.map((file, index) => (
              <div
                key={file.id}
                className="rounded-2xl overflow-hidden border bg-white shadow-sm relative group"
              >
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
                        ▲
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(file.id)}
                      className="text-gray-500 hover:text-red-500 transition"
                      title="Remove"
                    >
                      ✕
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
                  {file.type.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-right mt-1">
            {mediaItems.length}/5 {mediaItems.length === 5 && '(Maximum reached)'}
          </p>
        </>
      )}
    </>
  );
}
