import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import { BASE_URL } from "./VoiceService";

const uploadPDF = async () => {
  try {
    // Pick a PDF document
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf", // Only allow PDF files
    });

    // Check if user canceled the picker
    if (result.type === "cancel") {
      console.log("User cancelled document picker");
      return;
    }

    // Get the file details
    const { uri, name } = result?.assets?.[0];

    console.log("RESUME_FILE_PATH ", name);

    // Convert content URI to real path (especially important for Android)
    const filePath =
      Platform.OS === "android" ? uri.replace("file://", "") : uri;

    // Read the file
    await RNFS.readFile(filePath, "base64");

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", {
      uri: filePath,
      name: name,
      type: "application/pdf",
    });

    console.log("RESUME_FILE_PATH_1 ", formData);

    // Make the API call
    const response = await fetch(`${BASE_URL}upload-resume`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    console.log("resume_Upload successful: ", data);

    await RNFS.unlink(filePath);

    return data;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
};

export { uploadPDF };
