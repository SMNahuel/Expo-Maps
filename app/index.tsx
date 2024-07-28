import React, { useState } from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";

// Components
import MapsComponent from "@/components/Map";

//Store
import useStore from "../store/index";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { pois, loading, coordinates } = useStore();


  return (
    <>
      {!loading ? (
        <>
          <MapsComponent
            coordinates={coordinates}
            marker={pois?.pois}
            event={pois?.events}
          />

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
      )
        : <Text>Cargando</Text>
    }
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
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
