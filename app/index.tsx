import React, { useEffect, useState } from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

// Interface
import { Coordinate, Data } from "@/types/interface";

// Components
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
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filtrar Marcadores</Text>
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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Home;