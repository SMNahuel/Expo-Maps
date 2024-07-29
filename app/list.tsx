import { useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
// Components
import ModalPois from "@/components/ModalPois";
import { DotIcon, LikeIcon } from "@/components/Icon";
import Modal from "react-native-modal";

//Store
import useStore from "../store/index";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

type Item = {
  id: number;
  name: string;
  image: {
    url: string;
  };
  likes_count: number;
};
const Item = ({ item, onPress }: any) => {
  return (
    <StyledPressable
      onPress={() => onPress(item)}
      className={`active:opacity-80 active:bg-black`}
    >
      <View className="flex-row bg-white border-b-2 border-b-slate-50 justify-between items-center">
        <View className="flex-row justify-center items-center">
          <Image
            className="w-20 h-20"
            source={{ uri: item.image.url }}
            onError={(error) => alert("eror", error)}
            onLoad={() => alert("cargado")}
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
    </StyledPressable>
  );
};

export default function HomeScreen() {
  const { pois } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const onPress = (item: any) => {
    setSelectedSite(item);
    setModalVisible(true);
  };

  return (
    <>
      <View className="h-10 w-full bg-black flex-row justify-between pl-2 pr-2">
        <View className="flex-row justify-center items-center">
          <Text className="text-[#cccccc]">
            Ordenar:{" "}
            <Text className="text-[#cccccc] font-bold ">Popularidad</Text>
          </Text>
        </View>
        <Pressable className="flex-row justify-center items-center">
          <DotIcon />
        </Pressable>
      </View>
      {pois && (
        <>
          <View className="flex-1 w-full bg-white">
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
        </>
      )}
      <Modal isVisible={modalVisible}>
        {selectedSite ? (
          <ModalPois
            onRequestClose={() => setModalVisible(false)}
            selectedSite={selectedSite}
          />
        ) : (
          <Text>Cargando</Text>
        )}
      </Modal>
    </>
  );
}
