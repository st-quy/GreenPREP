import { useState, useCallback } from "react";

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

export const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadToCloudinary = useCallback(
    async (audioBlob, options = {}, format = "mp3") => {
      if (!audioBlob) {
        const err = new Error("No audio provided for upload");
        setError(err);
        throw err;
      }
      if (!cloudName) {
        const err = new Error("Cloudinary cloud name is required");
        setError(err);
        throw err;
      }
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();

        const mimeType =
          format === "mp3"
            ? "audio/mpeg"
            : format === "mp4"
              ? "audio/mp4"
              : "audio/webm";

        const fileName = `recording_${Date.now()}.${format}`;
        const file = new File([audioBlob], fileName, { type: mimeType });
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("resource_type", "raw");
        if (options.folder) {
          formData.append("folder", options.folder);
        }
        if (options.tags && Array.isArray(options.tags)) {
          formData.append("tags", options.tags.join(","));
        }

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

        const xhr = new XMLHttpRequest();

        const uploadPromise = new Promise((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              let errorMessage = `Upload failed with status ${xhr.status}`;
              try {
                const errorResponse = JSON.parse(xhr.responseText);
                if (errorResponse.error && errorResponse.error.message) {
                  errorMessage = `Cloudinary error: ${errorResponse.error.message}`;
                }
              } catch (e) {
                console.error("Failed to parse error response:", e);
              }
              reject(new Error(errorMessage));
            }
          };

          xhr.onerror = () => reject(new Error("Network error during upload"));
        });

        xhr.open("POST", url);
        xhr.send(formData);

        const response = await uploadPromise;

        setUploadedUrl(response.secure_url);

        return response.secure_url;
      } catch (err) {
        setError(err);
        console.error("Error uploading to Cloudinary:", err);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [cloudName, uploadPreset]
  );

  const resetUpload = useCallback(() => {
    setUploadedUrl(null);
    setError(null);
  }, []);

  return {
    uploadToCloudinary,
    resetUpload,
    isUploading,
    uploadedUrl,
    error,
  };
};
