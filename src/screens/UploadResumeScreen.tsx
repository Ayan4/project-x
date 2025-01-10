import React, { useContext } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { uploadPDF } from "../UploadResumeService";
import { ConversationDataContext } from "@/conversationData.context";
import {
  BLUE_10,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR,
} from "../Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

const UploadResumeScreen: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const { setConversationData } = useContext(ConversationDataContext);
  const handlePress = async () => {
    try {
      setIsUploading(true);
      const conversationData = await uploadPDF();
      setIsUploading(false);
      setConversationData(conversationData);
    } catch (err) {
      setIsUploading(false);
      console.error("Error getting conversation data:", err);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Pressable
        disabled={isUploading}
        onPress={handlePress}
        style={styles.uploadContainer}
      >
        <FontAwesome5 name={"paperclip"} size={26} color={THIRD_COLOR} />
        <Text style={styles.containerText}>
          {isUploading ? "Uploading..." : "Upload Your Resume"}
        </Text>
      </Pressable>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnStyle}
        onPress={handlePress}
        disabled={isUploading}
      >
        {isUploading ? (
          <ActivityIndicator color={PRIMARY_COLOR} />
        ) : (
          <Text style={styles.btnText}>Get Started</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: PRIMARY_COLOR,
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BLUE_10,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    marginVertical: 20,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: SECONDARY_COLOR,
    width: "90%",
    margin: 40,
    borderRadius: 20,
    borderStyle: "dashed",
  },
  containerText: {
    color: THIRD_COLOR,
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 8,
  },
  btnText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UploadResumeScreen;
