import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function DetailNft({ item, onBack }) {
  return (
    <View style={styles.detailContainer}>
      <Image
        source={
          item.image_url !== null && item.image_url !== ""
            ? { uri: item.image_url }
            : require("../assets/no-image-available.png")
        }
        style={styles.image}
      />

      <Text style={styles.nameText}>{item.name || "Unknown Name"}</Text>
      <Text style={styles.descriptionText}>{item.description || "Unknown Description"}</Text>
      <View style={styles.buttonOuterContainer}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) =>
            pressed ? [styles.buttonInnerContainer, styles.buttonPressed] : styles.buttonInnerContainer
          }
          onPress={onBack}
        >
          <Text style={styles.buttonText}>Back to all NFTs</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  image: { width: "100%", resizeMode: "contain", height: 260 },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 14,
  },
  descriptionText: {
    textAlign: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 16,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  buttonOuterContainer: {
    borderRadius: 14,
    margin: 4,
    marginTop: 30,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    elevation: 2,
    color: "#ffffff",
  },
});

export default DetailNft;
