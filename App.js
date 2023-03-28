import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import DetailNft from "./components/DetailNft";
import NftItem from "./components/NftItem";

function renderNftItem(item, onPress) {
  return <NftItem item={item} onPress={onPress} />;
}

export default function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleLoadAssets = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://testnets-api.opensea.io/api/v1/assets");
      const data = await response.json();

      setAssets(data.assets);
      setLoading(false);
    } catch (error) {
      Alert.alert("Load products failed!!", "Something went wrong when loading nft products", [
        { text: "Okey", style: "cancel" },
      ]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBackToAll = () => {
    setSelectedItem();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (selectedItem) {
    return <DetailNft item={selectedItem} onBack={handleBackToAll} />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.rootScreen}>
          <SafeAreaView style={styles.rootScreen}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.buttonOuterContainer}>
                <Pressable
                  style={({ pressed }) =>
                    pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
                  }
                  android_ripple={{ color: "#640233" }}
                  onPress={handleLoadAssets}
                >
                  <Text style={styles.buttonText}>Load NFT Assets</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.rootScreen}>
              <FlatList
                data={assets}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => renderNftItem(item, handleSelectItem)}
              />
            </View>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    elevation: 2,
    color: "#ffffff",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  pressed: {
    opacity: 0.75,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
