import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import { useContext } from "react";
import ConversationDataProvider, {
  ConversationDataContext,
} from "@/conversationData.context";
import { createStackNavigator } from "@react-navigation/stack";
import UploadResumeScreen from "./screens/UploadResumeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ConversationDataProvider>
      <RootNavigation />
    </ConversationDataProvider>
  );
}

function RootNavigation() {
  const { conversationData } = useContext(ConversationDataContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
      >
        {conversationData?.conversation_id ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen
            name="UploadResumeScreen"
            component={UploadResumeScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
