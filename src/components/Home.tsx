import { useState, useEffect, useRef, useContext } from "react";
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
import LottieOrb from "./LottieOrb";
import LottieView from "lottie-react-native";
import { ConversationDataContext } from "@/conversationData.context";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BLUE_10,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR,
} from "../Constants";
import { FontAwesome } from "@expo/vector-icons";

export default function Home() {
  const { conversationData, setConversationData } = useContext(
    ConversationDataContext
  );
  const [speechText, setSpeechText] = useState("");
  const [loading, setLoading] = useState(false);
  const [playBackOn, setPlayBackOn] = useState(false);
  const [sound, setSound] = useState<any>(null);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    setPlayBackOn(true);
    handleSpeechEnd("Hello", conversationData?.conversation_id);

    // Cleanup function to unload sound when component unmounts
    // return () => {
    //   if (sound) {
    //     sound.unloadAsync();
    //   }
    // };
  }, [conversationData]);

  const loadAudio = async (base64AudioData: any) => {
    try {
      const tempFilePath = await getTempAudioPath(base64AudioData);
      // Load the sound file
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: `file://${tempFilePath}` },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      setSound(audioSound);
      await playSound(audioSound);
    } catch (err) {
      console.error("Error loading audio:", err);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      setPlayBackOn(false);
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
          setLoading(false);
          setPlayBackOn(true);
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

  const handleSpeechEnd = async (
    humanPrompt: string,
    conversationId: string
  ) => {
    try {
      setLoading(true);
      const responseData = await fetchConversationAudio({
        humanPrompt,
        conversationId,
      });
      await processResponseData(responseData);
    } catch (err) {
      setLoading(false);
      console.error("Error playing audio:", err);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable
          style={styles.label}
          onPress={async () => {
            await sound.pauseAsync();
            setSpeechText("");
            setConversationData({});
            clearConversationId({
              conversationId: conversationData?.conversation_id,
            });
          }}
        >
          {/* <View style={styles.label}> */}
          <FontAwesome name="plus" size={24} color={BLUE_10} />
          {/* </View> */}
        </Pressable>
      </View>
      <View style={styles.voiceContainer}>
        {playBackOn ? (
          <LottieOrb animationRef={animationRef} />
        ) : (
          <Record
            onSpeechEnd={(value) => {
              handleSpeechEnd(value[0], conversationData?.conversation_id);
              setSpeechText(value[0]);
            }}
            onSpeechStart={() => {
              setSpeechText("");
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: PRIMARY_COLOR,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
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
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#0b3131",
    paddingBottom: 100,
  },
});
