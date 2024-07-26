import { Text, View, Button, Image, Pressable, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import { Audio as ExpoAudio } from "expo-av";

// Icon
import { CloseIcon, DinamicIcon, LikeIcon, PauseIcon, PlayIcon } from "./Icon";

//Types
import { Site, ImageInterface } from "@/types/interface";
import { Colors } from "@/constants/Colors";
interface ModalPoisProps {
  onRequestClose: () => void;
  selectedSite: Site;
}

const ModalPois: React.FC<ModalPoisProps> = ({
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
    <View style={styles.modalBackground}>
      <View className="w-11/12 h-5/6 bg-white shadow-lg">
        <View className="flex-row justify-between items-center p-2 h-2/2">
          <View className="flex-row items-center justify-center mt-2">
            <DinamicIcon url={selectedSite.category.icon.url} />
            <Text className={`font-bold text-lg ml-1 text-[#999999]`}>
              {selectedSite.name.toUpperCase()}
            </Text>
          </View>

          <Pressable
            onPress={handleClose}
            className="justify-center items-center text-center "
          >
            <CloseIcon />
          </Pressable>
        </View>

        <PagerView className="h-2/6" initialPage={0}>
          {selectedSite.gallery_images.map(
            (item: ImageInterface, index: number) => {
              return (
                <View className="justify-center items-center" key={index}>
                  <Image className="w-full h-full" source={{ uri: item.url }} />
                </View>
              );
            }
          )}
        </PagerView>
        <View className={`flex-row m-4 bg-[#c1c1c1] p-4`}>
          <View
            className={`flex-row bg-[#999999] rounded-full w-14 h-14 justify-center items-center`}
          >
            {isPlaying ? (
              <Pressable onPress={pauseSound}>
                <PauseIcon />
              </Pressable>
            ) : (
              <Pressable onPress={playSound}>
                <PlayIcon />
              </Pressable>
            )}
          </View>
          <View className="w-60 justify-center">
            <Slider
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={onSliderValueChange}
            />
            <View className="flex-row justify-between pl-2 pr-4">
              <Text className={`text-[#999999] font-bold`}>
                {`${Math.floor(position / 60000)}:${Math.floor(
                  (position % 60000) / 1000
                )
                  .toFixed(0)
                  .padStart(2, "0")}`}
              </Text>
              <Text className={`text-[#3a3a3a] font-bold`}>
                {`${Math.floor(duration / 60000)}:${Math.floor(
                  (duration % 60000) / 1000
                )
                  .toFixed(0)
                  .padStart(2, "0")}`}
              </Text>
            </View>
          </View>
        </View>
        <View className="border-t-2 border-gray-100 pl-4 pr-4">
          <View className="flex-row justify-between pb-2 pt-4">
            <Text className={`text-[${Colors.light.grayDark}] font-bold`}>
              Acerca de este local
            </Text>
            <View className="flex-row justify-center">
              <Text className={`text-[#c1c1c1] font-bold`}>
                {selectedSite.likes_count}
              </Text>
              <LikeIcon />
            </View>
          </View>
          <Text className={`text-[#c1c1c1] font-bold`}>
            {selectedSite.description}
          </Text>
        </View>
        <View className="p-4">
          <MapView
            className="w-full h-3/6"
            initialRegion={{
              latitude: selectedSite.latitude,
              longitude: selectedSite.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedSite.latitude,
                longitude: selectedSite.longitude,
              }}
              image={selectedSite.category.marker.url}
            >
              <Callout tooltip={true}>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "black",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ marginTop: 5, color: "white" }}>
                    {selectedSite.name}
                  </Text>
                  <Text style={{ marginTop: 5, color: "white" }}>
                    {selectedSite.description}
                  </Text>
                </View>
              </Callout>
            </Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

export default ModalPois;
