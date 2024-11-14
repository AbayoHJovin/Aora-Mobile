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

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...others
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-poppinsMedium">
        {title}
      </Text>
      <View className="border-2 border-gray-800 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-200 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-poppinsSemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !ShowPassword}
        />
        {title == "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!ShowPassword);
            }}
          >
            <Image source={!ShowPassword ? icons.eye:icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
