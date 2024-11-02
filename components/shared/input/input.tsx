import { BorderRadius, Colors, FontSize } from "@/components/shared/tokens";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

interface ControllerInputProps {
  control: any;
  errors?: FieldErrors<FieldValues>;
  name: string;
  placeholder: string;
  isPassword?: boolean;
  props?: TextInputProps;
}

const InputController: React.FC<ControllerInputProps> = ({
  control,
  name,
  errors,
  isPassword,
  placeholder,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <>
      {errors && errors[name] && (
        <Text style={styles.textError}>{errors[name]?.message}</Text>
      )}
      <View>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <TextInput
              {...props}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              style={errors && errors[name] ? styles.inputError : styles.input}
              placeholderTextColor={Colors.placeholder}
              secureTextEntry={isPassword && !isPasswordVisible}
            />
          )}
        />
        {isPassword && (
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible((state) => !state)}
          >
            {isPasswordVisible ? (
              <FontAwesome5 name="eye" size={24} color={Colors.placeholder} />
            ) : (
              <FontAwesome5
                name="eye-slash"
                size={24}
                color={Colors.placeholder}
              />
            )}
          </Pressable>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    backgroundColor: Colors.softWhite,
    fontSize: FontSize.fs16,
  },
  inputError: {
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    borderColor: "#ec4e4e",
    borderWidth: 1,
    fontSize: FontSize.fs16,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  textError: {
    color: "#f15050",
    fontSize: 12,
    fontWeight: "500",
  },
});
export default InputController;
