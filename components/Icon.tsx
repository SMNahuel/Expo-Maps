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
  return <Image source={{ uri: url }} />;
};
