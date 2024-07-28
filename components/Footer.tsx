import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link, router, usePathname } from "expo-router";
import { styled } from "nativewind";

//Components
import { MapIcon, MenuIcon } from "./Icon";

const StyledPressable = styled(Pressable);
const Footer = () => {
  const link = usePathname();

  const toggleModal = () => {
    if (link === "/") {
      router.replace("/list");
    } else {
      router.replace("/");
    }
  };

  return (
    <View className="flex-row justify-between pt-2 pl-2 pr-4 items-center h-12 bg-[#676767]">
      <Text className=" text-xl font-['TradeGothic'] text-[#cccccc]">
        {link === "/" ? "MOSTRAR EN LISTA" : "MOSTRAR EN EL MAPA"}
      </Text>
      <Link href={link !== "/" ? "/" : "/list"} asChild>
        <StyledPressable
          onPress={toggleModal}
          className="active:bg-gray active:border-white/50"
        >
          {link !== "/" ? <MapIcon /> : <MenuIcon />}
        </StyledPressable>
      </Link>
    </View>
  );
};

export default Footer;
