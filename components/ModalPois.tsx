import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Audio as ExpoAudio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Site } from "@/types/interface";

interface ModalPoisProps {
  site: Site;
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
            <Image
              source={{ uri: selectedSite.category.icon.url }}
              style={styles.icon}
            />
            <Text style={styles.modalTitle}>{selectedSite.name}</Text>
          </View>
          <Button title="X" onPress={handleClose} />
        </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height : '90%',
    backgroundColor: "white",
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
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
