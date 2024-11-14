import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

function SignIn() {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  async function submit() {
    if (!Form.password || !Form.email) {
      Alert.alert("error", "Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      await signIn(Form.email, Form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success","You've successfully logged in!");
      router.replace("/Home");
    } catch (error: any) {
      Alert.alert("error", error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full justify-center">
      <ScrollView>
        <View className="w-full justify-center h-[83vh] px-7 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl mt-10 text-white font-poppinsSemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={Form.email}
            handleChangeText={(e: any) => setForm({ ...Form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="input email"
          />
          <FormField
            title="Password"
            value={Form.password}
            handleChangeText={(e: any) => setForm({ ...Form, password: e })}
            otherStyles="mt-7"
            placeholder="input password"
          />
          <View className="flex justify-end flex-row p-7">
            <Text className="text-white text-lg ">Forgot password</Text>
          </View>
          <CustomButton
            text="Login"
            handlePress={submit}
            containerStyle=""
            isLoading={loading}
            textStyles="text-black text-3xl font-poppinsSemibold"
          />
          <View className="justify-center pt-10  gap-2 flex-row">
            <Text className=" text-gray-100 text-lg font-poppinsSemibold">
              Don't have an account?
            </Text>
            <Link
              href="/(Auth)/signUp"
              className="text-lg font-poppinsSemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
