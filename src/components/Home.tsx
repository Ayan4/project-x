import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import Record from "./Record";
import {
  clearConversationId,
  fetchConversationAudio,
  getTempAudioPath,
} from "../VoiceService";
import { Audio } from "expo-av";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";

export default function Home() {
  const [speechText, setSpeechText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAudio = async (base64AudioData: any) => {
    try {
      const tempFilePath = await getTempAudioPath(base64AudioData);
      // Load the sound file
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: `file://${tempFilePath}` },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      console.log("FETCH_CONVO_SUCCESS_2 ", audioSound);
      await playSound(audioSound);
    } catch (err) {
      console.error("Error loading audio:", err);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    console.log("PLAYBACK_STATUS ", status);
    if (status.didJustFinish) {
      setLoading(false);
      // Audio has finished playing
      // setIsPlaying(false);
      // if (onPlaybackComplete) {
      //   onPlaybackComplete();
      // }
    }
  };

  const playSound = async (resAudio: any) => {
    try {
      const status = await resAudio.getStatusAsync();

      console.log("FINAL_STATUS ", status);

      if (status.isLoaded) {
        if (status.isPlaying) {
          await resAudio.pauseAsync();
        } else {
          await resAudio.playAsync();
        }
      }
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  const processResponseData = async (response: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = async () => {
        const audipFilePath = reader.result; // This will be the base64 data URL
        await loadAudio(audipFilePath);
      };
    } catch (err) {
      setLoading(false);
      console.error("conversation data processing error ", err);
    }
  };

  const handleSpeechEnd = async (humanPrompt: string) => {
    try {
      setLoading(true);
      const responseData = await fetchConversationAudio({ humanPrompt });
      await processResponseData(responseData);
    } catch (err) {
      setLoading(false);
      console.error("Error playing audio:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Speech Text</Text>
        <TextInput
          multiline
          style={styles.textInput}
          numberOfLines={6}
          value={speechText}
          maxLength={500}
          editable={true}
        />
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="Save"
            color={"#007AFF"}
            onPress={async () => {
              console.log("save");
            }}
          />
          <Button
            title="Clear"
            color={"#007AFF"}
            onPress={() => {
              setSpeechText("");
              clearConversationId({});
            }}
          />
        </View>
      </View>
      <View style={styles.voiceContainer}>
        {loading ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Text>Loading...</Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
            <Record
              onSpeechEnd={(value) => {
                handleSpeechEnd(value[0]);
                setSpeechText(value[0]);
              }}
              onSpeechStart={() => {
                setSpeechText("");
              }}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5FCFF",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    height: "50%",
    width: "100%",
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  textInput: {
    padding: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
    height: 200,
    borderRadius: 5,
  },
  saveButton: {
    right: 0,
  },
  voiceContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
