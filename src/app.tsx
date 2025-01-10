import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import Notes from "./components/Notes";
import UploadResumeScreen from "./screens/UploadResumeScreen";
import { useContext } from "react";
import ConversationDataProvider, {
  ConversationDataContext,
} from "@/conversationData.context";
import { createStackNavigator } from "@react-navigation/stack";

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

// import { Text, View } from "react-native";
// import { CardsContainer } from "./screens/CardsContainer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function Index() {
//   return (
//     <GestureHandlerRootView>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CardsContainer />
//         {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
//       </View>
//     </GestureHandlerRootView>
//   );
// }
