import { BorderRadius, Colors, FontSize } from "@/components/shared/tokens";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({ control, name, errors }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      return selectedDate;
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View className="mb-6">
      <View>
        {errors && errors[name] && (
          <Text className="text-[#ec4e4e] font-normal text-sm">
            {errors[name]?.message}
          </Text>
        )}
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            onPress={showDatePicker}
            style={errors && errors[name] ? styles.inputError : styles.input}
          >
            <Text className="text-gray-500 text-lg">
              {value ? value.toLocaleDateString() : "Select Date"}
            </Text>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShow(Platform.OS === "ios");
                  setDate(currentDate);
                  onChange(currentDate); // Устанавливаем выбранное значение
                }}
              />
            )}
          </TouchableOpacity>
        )}
        name={name}
        defaultValue=""
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    backgroundColor: "#e1eeea",

    fontSize: FontSize.fs16,
    justifyContent: "center",
  },
  inputError: {
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    borderColor: "#ec4e4e",
    borderWidth: 1,
    fontSize: FontSize.fs16,
    backgroundColor: "#e1eeea",
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  eyeIconError: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  textError: {
    color: "#f15050",
    fontSize: 12,
    fontWeight: "500",
  },
});
export default DateInput;
