import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  StyleProp,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  placeholder?: string;
}

const SearchInput: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...others
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-gray-800 w-full h-16 px-4 bg-black-100 rounded-2xl space-x-4 focus:border-secondary-200 items-center flex-row">
      <TextInput
        className="text-base mt-0.5  text-white flex-1 font-poppinsRegular"
        value={value}
         placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !ShowPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
