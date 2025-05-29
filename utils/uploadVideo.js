import axios from "axios";

export const uploadVideo = async (asset) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      name: asset.fileName || 'video.mp4',
      type: 'video/mp4',
    });

    const response = await axios.post("https://srv694651.hstgr.cloud/storage/upload", formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "x-api-key": "ayzenn09876@", 
        },
        maxContentLength: 50 * 1024 * 1024, // 50MB max
        maxBodyLength: 50 * 1024 * 1024, // 50MB max
      }
    );

    const data = response.data;
    if (data.fileUrl) {
      return data.fileUrl;
    } else {
      throw new Error(data.message || "Video upload failed.");
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    if (error.response?.status === 413) {
      throw new Error("Video is too large. Please try uploading a smaller video.");
    }
    throw error;
  }
}; 