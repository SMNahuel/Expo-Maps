import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Audio as ExpoAudio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Site, ImageInterface } from "@/types/interface";
import PagerView from "react-native-pager-view";
import { DinamicIcon } from "./Icon";

interface ModalPoisProps {
  site?: Site;
  onRequestClose: () => void;
  selectedSite: Site;
}

const ModalPois: React.FC<ModalPoisProps> = ({
  site,
  onRequestClose,
  selectedSite,
}) => {
  const [sound, setSound] = useState<ExpoAudio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await ExpoAudio.Sound.createAsync({
        uri: selectedSite.audio.url,
      });
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(newSound);
      const status = await newSound.getStatusAsync();
      //@ts-ignore
      setDuration(status.durationMillis ?? 0);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const onSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const handleClose = () => {
    pauseSound();
    setSound(null);
    onRequestClose();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeader}>
            <DinamicIcon url={selectedSite.category.icon.url} />
            <Text style={styles.modalTitle}>{selectedSite.name}</Text>
          </View>
          <Button title="X" onPress={handleClose} />
        </View>
        <PagerView style={styles.container} initialPage={0}>
          {selectedSite.gallery_images.map(
            (item: ImageInterface, index: number) => {
              console.log(item.url);
              return (
                <View style={styles.page} key={index}>
                  <Image style={styles.image} source={{ uri: item.url }} />
                </View>
              );
            }
          )}
        </PagerView>
        {isPlaying ? (
          <Button title="Pausar Sonido" onPress={pauseSound} />
        ) : (
          <Button title="Reproducir Sonido" onPress={playSound} />
        )}

        <Text>Likes: {selectedSite.likes_count}</Text>
        <Text>Acerca de este local</Text>
        <Text>{selectedSite.description}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSliderValueChange}
        />
        <Text>
          {`${Math.floor(position / 60000)}:${Math.floor(
            (position % 60000) / 1000
          )
            .toFixed(0)
            .padStart(2, "0")} / ${Math.floor(duration / 60000)}:${Math.floor(
            (duration % 60000) / 1000
          )
            .toFixed(0)
            .padStart(2, "0")}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "40%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: "90%",
    height: "85%",
    backgroundColor: "white",

    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default ModalPois;
