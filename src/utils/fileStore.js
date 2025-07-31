// This is a simple in-memory store to hold files during navigation.
let tempFiles = [];

/**
 * Stores an array of files temporarily.
 * @param {File[]} files - The array of files selected by the user.
 */
export const setUploadedFiles = (files) => {
  tempFiles = files;
};

/**
 * Retrieves the stored files and clears the store.
 * @returns {File[]} The array of stored files.
 */
export const getUploadedFiles = () => {
  const files = [...tempFiles]; // Get the files
  tempFiles = []; // Clear the store to prevent reuse
  return files;
};