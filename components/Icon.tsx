import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { DinamicIconProps, MarkerIconProps } from "@/types/interface";
import { Image } from "react-native";

export const MenuIcon = () => {
  return <Image source={require("@/assets/drawable-mdpi/menu.png")} />;
};

export const BackIcon = () => {
  return <Image source={require("@/assets/drawable-mdpi/back.png")} />;
};

export const NavigationIcon = () => {
  return <Image source={require("@/assets/drawable-mdpi/navigation.png")} />;
};

export const CalendarIcon = () => {
  return (
    <Image source={require("@/assets/drawable-mdpi/navigation_copy_2.png")} />
  );
};

export const FilterIcon = () => {
  return (
    <Image source={require("@/assets/drawable-mdpi/navigation_copy_3.png")} />
  );
};

export const DinamicIcon = ({ url }: DinamicIconProps) => {
  return <Image source={{ uri: url }} style={{ width: 40, height: 40 }} />;
};

export const CloseIcon = () => {
  return (
    <EvilIcons
      name="close"
      size={40}
      color="#d8d8d8"
      style={{ justifyContent: "center", alignItems: "center" }}
    />
  );
};

export const PlayIcon = () => {
  return <AntDesign name="caretright" size={24} color="white" />;
};

export const PauseIcon = () => {
  return <FontAwesome6 name="pause" size={24} color="white" />;
};

export const LikeIcon = () => {
  return (
    <Entypo name="heart" size={18} color="#c1c1c1" style={{ marginLeft: 3 }} />
  );
};

export const MarkerIcon = ({ color }: MarkerIconProps) => {
  return <Entypo name="location-pin" size={24} color={color} />;
};

export const MapIcon = () => {
  return <FontAwesome name="map" size={24} color="#cccccc" />;
};

export const DotIcon = () => {
  return <Entypo name="dots-three-horizontal" size={24} color="white" />;
};
