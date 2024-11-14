import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "../components/searchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";

interface Item {
  id: number;
}

const Home = () => {
  const { user } = useGlobalContext();
  const data: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const posts: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-poppinsMedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-white font-poppinsSemibold text-2xl ">
                  Jovin
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-poppinsRegular mb-3">
                Latest videos
              </Text>
              <Trending posts={posts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload the video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
