import axios, { AxiosError } from "axios";

export const uploadImage = async (asset, fileName) => {
  try {
    
    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      name: asset.fileName || fileName,
      type: asset.mimeType,
    });

    // const formData = new FormData();
    // formData.append("file", file);

    // console.log("Uploading Image:", asset.fileName); // Debugging

    const response = await axios.post("https://srv694651.hstgr.cloud/storage/upload", formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "x-api-key": "ayzenn09876@", 
        },
      }
    );

    const data = response.data;
    // console.log("Upload Response:", data); // Debugging

    // ✅ Fix: Return the correct field (fileUrl)
    if (data.fileUrl) {
      return data.fileUrl; 
    } else {
      throw new Error(data.message || "Image upload failed.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};