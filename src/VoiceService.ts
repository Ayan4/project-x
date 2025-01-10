import RNFS from "react-native-fs";

export const BASE_URL = "http://20.204.170.132:8057/";

type fetchConversationAudioType = {
  conversationId?: string;
  humanPrompt?: string;
};

type clearConversationIdType = {
  conversationId?: string;
};

export const fetchConversationAudio = async ({
  conversationId,
  humanPrompt,
}: fetchConversationAudioType) => {
  const endpoint = `${BASE_URL}conversations/${conversationId}/messages`;
  const transcription = humanPrompt || "Hello";
  try {
    console.log("FETCH_CONVO ", endpoint);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ transcription }),
    });
    const blob = await response.blob();
    return blob;
  } catch (err) {
    console.error("FETCH_CONVO_ERR ", err);
  }
};

export const clearConversationId = async ({
  conversationId,
}: clearConversationIdType) => {
  try {
    const endpoint = `${BASE_URL}conversations/${conversationId}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("conversation_deleted ", result);
    return result;
  } catch (err) {
    console.error("Error clearing conversation ID: ", err);
  }
};

export const getTempAudioPath = async (base64AudioData: string) => {
  try {
    const tempFilePath = `${RNFS.CachesDirectoryPath}/temp_audio.mp3`;

    // Write base64 data to temporary file
    await RNFS.writeFile(tempFilePath, base64AudioData, "base64");

    return tempFilePath;
  } catch (err) {
    console.error("Error fetching temp audio path: ", err);
  }
};
