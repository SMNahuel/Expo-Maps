import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";

// Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalPois from "@/components/ModalPois";
import { LikeIcon } from "@/components/Icon";

type Item = {
  id: number;
  name: string;
  image: {
    url: string;
  };
  likes_count: number;
};
const Item = ({ item, onPress, onSelect }: any) => (
  <Pressable onPress={() => onPress(item)}>
    <View className="flex-row bg-white border-b-2 border-b-slate-50 justify-between items-center">
      <View className="flex-row justify-center items-center">
        <Image
          className="w-20 h-20"
          source={{
            uri: item.image.url,
          }}
        />
        <Text className={`ml-1 text-center text-[#3a3a3a] font-bold`}>
          {item.name}
        </Text>
      </View>

      <View className="flex-row justify-center items-center mr-3">
        <Text className={`text-center text-[#c1c1c1] font-bold`}>
          {item.likes_count}
        </Text>
        <LikeIcon />
      </View>
    </View>
  </Pressable>
);

export default function HomeScreen() {
  const [pois, setPois] = useState({
    name: "",
    pois_count: null,
    pois: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(
        "https://cityme-services.prepro.site/app_dev.php/api/districts/2"
      );

      setPois(data);
    };
    init();
  }, []);

  const onPress = (item: any) => {
    setSelectedSite(item);
    setModalVisible(true);
  };

  return (
    <>
      {pois && (
        <>
          <Header pois_count={pois.pois_count} />
          <View style={styles.container}>
            <FlatList
              data={pois.pois}
              renderItem={({ item }: any) => {
                return (
                  <Item
                    item={item}
                    onPress={onPress}
                    onSelect={setSelectedSite}
                    key={item.id}
                  />
                );
              }}
              keyExtractor={(item: any) => item.id}
            />
          </View>
          <Footer dest="/" text="MOSTRAR EN EL MAPA" />
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedSite && (
          <ModalPois
            onRequestClose={() => setModalVisible(false)}
            selectedSite={selectedSite}
          />
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    backgroundColor: "white",
  },
  text: {
    letterSpacing: 0.69,
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageItem: {
    width: 100,
    height: 100,
  },
  containerFooter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
