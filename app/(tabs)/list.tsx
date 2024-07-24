import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

// Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalPois from "@/components/ModalPois";

type ItemProps = {
  id: number;
  name: string;
  image: {
    url: string;
  };
  likes_count: number;
};

type Item = {
  id: number;
  name: string;
  image: {
    url: string;
  };
  likes_count: number;
};
const Item = ({ item, onPress, onSelect }: any) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.containerItem}>
      <Image
        style={styles.imageItem}
        source={{
          uri: item.image.url,
        }}
      />
      <Text style={styles.textItem}>{item.name}</Text>
      <Text style={styles.textItem}>{item.likes_count}</Text>
    </View>
  </TouchableOpacity>
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

  const onPress = (item : any) => {
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
        <ModalPois onRequestClose={() => setModalVisible(false)} selectedSite={selectedSite}/>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    width: 110,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.26,
    color: "#3a3a3a",
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
