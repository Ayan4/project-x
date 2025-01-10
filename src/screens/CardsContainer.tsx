import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Card } from "../components/Card";

export const CardsContainer = () => {
  const shuffleBack = useSharedValue(false);

  const cards = [
    {
      source:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
    },
    {
      source:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
    },
    {
      source:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
    },
    {
      source:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
    },
    {
      source:
        "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
