import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "../components/searchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Models } from "react-native-appwrite";
import VideoCard from "../components/VideoCard";

interface Item {
  id: number;
}
interface Argument {
  getAllPosts: () => Promise<Models.Document[]>;
}
const Home = () => {
  const { videos, refetch, isLoading } = useAppwrite({ fn: getAllPosts });
  const { videos:latestVideos } = useAppwrite({ fn: getLatestPosts });
  const { user } = useGlobalContext();
  const data: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const posts: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard item={item} />}
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
            <SearchInput title={""} value={""} handleChangeText={function (text: string): void {
              throw new Error("Function not implemented.");
            } } />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-poppinsRegular mb-3">
                Latest videos
              </Text>
              <Trending posts={latestVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload the video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
