import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
// import { ResizeMode, Video} from "expo-av";
type AnimationType = {
  [key: number]: {
    scale: number;
  };
};
interface TrendingItemProps {
  activeItem: any;
  item: any;
}
const zoomIn: AnimationType = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut: AnimationType = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};
interface contentInset {
  x: number;
}
const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? (zoomIn as any) : (zoomOut as any)}
      duration={500}
    >
      {play ? (
        // <Video
        //   source={{ uri: item.video }}
        //   className="w-52 h-72 rounded-[35px] mt-3 bg-white/0"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        // />
        <Text></Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [active, setActive] = useState(posts[1]);
  const viewableItemChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  };
  const contentInset: contentInset = { x: 170 };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={active} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentInset={contentInset}
    />
  );
};

export default Trending;
