import { View, Modal, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

//Interface
import { Coordinate } from "@/types/interface";
import { Data } from "@/types/interface";

//Components
import MapsComponent from "@/components/Map";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Home = () => {
  const [state, setState] = useState<Data>();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    axios
      .get("https://cityme-services.prepro.site/app_dev.php/api/districts/2")
      .then(({ data }) => {
        setState(data);
      });
  }, []);

  const coordinates: Coordinate[] | undefined = state?.coordinates
    .split(" ")
    .map((coord: String) => {
      const [longitude, latitude, _] = coord.split(",").map(Number);
      return { longitude, latitude };
    });

  return (
    <>
      {coordinates && (
        <>
          <Header
            pois_count={state?.pois_count}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <MapsComponent
            coordinates={coordinates}
            marker={state?.pois}
            event={state?.events}
          />
          <Footer dest={"/list"} text="MOSTRAR EN LISTADO" />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 items-center justify-center bg-opacity-50">
              <View className="'w-4/5 bg-white p-5 rounded-lg shadow-lg'">
                <Text className={"text-xl font-bold mb-2"}>
                  Filtrar Marcadores
                </Text>
                <Text>Populares</Text>
                <Text>Dentro de la zona</Text>
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};

export default Home;
