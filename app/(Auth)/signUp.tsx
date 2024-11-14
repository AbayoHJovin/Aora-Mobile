import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

function SignUp() {
  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  async function submit() {
    if (!Form.username || !Form.password || !Form.email) {
      Alert.alert("error", "Please fill all the fields");
      return ;
    }
    if(Form.password.length <8){
      Alert.alert("error", "password should be of 8 characters and above");
      return ;
    }
    setLoading(true);
    try {
      const result = createUser(Form.email, Form.username, Form.password);
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
            Sign up
          </Text>
          <FormField
            title="Username"
            value={Form.username}
            handleChangeText={(e: any) => setForm({ ...Form, username: e })}
            otherStyles="mt-7"
            keyboardType="ascii-capable"
            placeholder="input usernames"
          />
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
          <CustomButton
            text="Sign up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={loading}
            textStyles="text-black text-3xl font-poppinsSemibold"
          />
          <View className="justify-center pt-10  gap-2 flex-row">
            <Text className=" text-gray-100 text-lg font-poppinsSemibold">
              Already have an account?
            </Text>
            <Link
              href="/(Auth)/signIn"
              className="text-lg font-poppinsSemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
