import { View, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//Components
import {
  BackIcon,
  CalendarIcon,
  FilterIcon,
  MarkerIcon,
  NavigationIcon,
} from "./Icon";

//Store
import useStore from "../store/index";

const Header = () => {
  const { pois } = useStore();

  return (
    <GestureHandlerRootView style={{ height: "15%" }}>
      <View className="flex-1 flex-row justify-between items-end bg-[#cccccc] pt-1 pb-1 pl-2 pr-2">
        <View className="flex-row justify-between items-center w-30">
          <BackIcon />
          <Text className="font-['TradeGothic'] text-[#666666] text-xl ml-5">
            MADRID
          </Text>
        </View>
        <View className="flex-row justify-end items-center w-30">
          <CalendarIcon />
          <NavigationIcon />
        </View>
      </View>
      <View className="flex-row justify-between items-center bg-[#676767] pl-2 pr-1 pt-2 pb-2">
        <Text className="font-['TradeGothic'] text-xl text-white">LATINA - OPERA</Text>
        <View className="flex-row justify-center items-center">
          <View className="flex-row mr-3 justify-center items-center">
            <MarkerIcon color={"white"} />
            <Text className="font-['TradeGothic'] text-center text-white  text-lg">
              {pois.pois_count}
            </Text>
          </View>
          <View>
            <Pressable onPress={() => console.log("")}>
              <FilterIcon />
            </Pressable>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Header;
