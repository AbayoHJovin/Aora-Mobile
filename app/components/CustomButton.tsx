import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
interface ButtonProps {
  text: string;
  handlePress: ()=>void;
  containerStyle: string;
  textStyles: string;
  isLoading: boolean;
}
const CustomButton = ({
  text,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl h-[62px] justify-center items-center mt-4 ${containerStyle} ${isLoading? "opacity-50":""}`}
    >
      <Text className={`text-white ${textStyles}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
