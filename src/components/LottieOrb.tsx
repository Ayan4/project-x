import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface LottieOrbProps {
  animationRef: React.RefObject<LottieView>;
  // Define your component props here
}

const LottieOrb: React.FC<LottieOrbProps> = ({ animationRef }) => {
  return (
    <Animated.View
      style={styles.animationContainer}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <LottieView
        autoPlay
        ref={animationRef}
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../../assets/images/aiorb.json")}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
});

export default LottieOrb;
