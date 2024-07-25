import { View, StyleSheet, Modal, Text, Button } from 'react-native';
import { useEffect, useState } from "react";

import axios from "axios";

//Interface
import { Data } from "@/types/interface";
import { Coordinate } from "@/types/interface";
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
          <Header pois_count={state?.pois_count} onPress={()=> setModalVisible(!modalVisible)}/>
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
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
