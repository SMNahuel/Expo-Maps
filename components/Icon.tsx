import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { DinamicIconProps } from "@/types/interface";
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
  return <Entypo name="heart" size={18} color="#c1c1c1" style={{marginLeft: 3}}/>;
};
