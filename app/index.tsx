import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/app/components/CustomButton";
import { useGlobalContext } from "@/context/globalProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/(tabs)/Home"/>;
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-[85vh] justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5 w-96">
            <Text className="text-4xl text-white font-bold text-center">
              Discover Endless Possibilities With{" "}
              <Text className="text-secondary-200 relative">
                Aora
                <Image
                  source={images.path}
                  className="w-[136px] h-[15px] absolute"
                  resizeMode="contain"
                />
              </Text>
            </Text>

            <Text className="text-xl font-poppinsRegular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a journey of
              limitless exploration with Aora
            </Text>
            <CustomButton
              text="Continue with Email"
              handlePress={() => router.push("/(Auth)/signIn")}
              containerStyle={`w-full mt-7`}
              textStyles={`text-2xl`}
              isLoading={false}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style={"light"} />
    </SafeAreaView>
  );
};

export default App;
