import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
interface propsInt {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: propsInt) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-white text-center font-poppinsSemibold text-xl ">
        {title}
      </Text>
      <Text className=" font-poppinsMedium text-center text-sm text-gray-100">
        {subtitle}
      </Text>
      <CustomButton
        text="Create a video"
        handlePress={() => router.push("/(tabs)/create")}
        containerStyle="w-full my-5"
        textStyles=""
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
