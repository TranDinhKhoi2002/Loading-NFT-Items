import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import Card from "./Card";

const deviceWidth = Dimensions.get("window").width;

function NftItem({ item, onPress }) {
  return (
    <Card>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => onPress(item)}
      >
        <Image
          style={styles.cardImage}
          source={
            item.image_url !== null && item.image_url !== ""
              ? { uri: item["image_url"] }
              : require("../assets/no-image-available.png")
          }
        />
        <Text style={styles.cardText}>{item.name || "Unknown Name"}</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: deviceWidth * 0.8,
    height: 260,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
    paddingTop: 6,
    paddingBottom: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default NftItem;
