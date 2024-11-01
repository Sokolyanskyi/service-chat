import * as yup from "yup";

import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BorderRadius,
  Colors,
  FontSize,
  Gaps,
} from "@/components/shared/tokens";
import { COUNTRIES, REGISTER } from "@/states/routes";
import React, { useEffect, useState } from "react";

import Button from "@/components/shared/button/Button";
import { Country } from "@/states/cities.state";
import InputController from "@/components/shared/input/input";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";

const Registration = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Country[]>([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [optionName, setOptionName] = useState("");

  const registerFormSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormSchema) });
  const getCountry = async () => {
    try {
      const { data } = await axios.get(COUNTRIES);
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const alert = (text: string) => {
    Alert.alert("Error", `${text}`, [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    getCountry();
  }, []);
  const register = async (dataForm: any) => {
    try {
      const { data } = await axios.post(REGISTER, {
        countryId: selectedOption,
        name: dataForm.name,
        phoneNumber: dataForm.phone,
        email: dataForm.email.toLowerCase(),
        password: dataForm.password,
        password_confirmation: dataForm.password_confirmation,
      });
      router.replace("/tabs");
      console.log(data);
    } catch (err: any) {
      alert(JSON.stringify(err.response.data));
      console.log(err.response.data);
    } finally {
      console.log(data);
    }
  };
  const renderOption = ({ item }: any) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setOptionName(item.name);
        setSelectedOption(item.id);
        setModalVisible(false);
      }}
    >
      <Text style={{ color: "black", fontSize: FontSize.fs18 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>Registration Page</Text>

            <View style={styles.form}>
              <View style={styles.input}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={
                      selectedOption ? styles.textList : styles.textListGrey
                    }
                  >
                    {selectedOption ? optionName : "Please choose country"}
                  </Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalView}>
                    <FlatList
                      style={styles.list}
                      data={data}
                      renderItem={renderOption}
                      keyExtractor={(item) => item.id.toLocaleString()}
                    />
                  </View>
                </Modal>
              </View>
              <InputController
                errors={errors}
                placeholder={"Name"}
                control={control}
                name="name"
              />
              <InputController
                errors={errors}
                name="phone"
                placeholder={"Phone"}
                props={{ keyboardType: "phone-pad" }}
                control={control}
              />
              <InputController
                errors={errors}
                name="email"
                placeholder={"Email"}
                props={{ keyboardType: "email-address" }}
                control={control}
              />
              <InputController
                errors={errors}
                name="password"
                placeholder={"Password"}
                control={control}
                //   isPassword={true}
              />
              <InputController
                errors={errors}
                name="password_confirmation"
                placeholder={"PasswordConfirm"}
                control={control}
                //   isPassword={true}
              />
              <InputController
                errors={errors}
                placeholder={"From who bought Company"}
                name="from"
                control={control}
              />
              <InputController
                errors={errors}
                placeholder={"Installation Company Name"}
                name="company"
                control={control}
              />
              <Button text={"Sing Up"} onPress={handleSubmit(register)} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    justifyContent: "center",
  },
  text: {
    fontSize: FontSize.fs30,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: Gaps.g50,
  },
  form: { alignSelf: "stretch", gap: Gaps.g16 },
  input: {
    justifyContent: "center",
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    backgroundColor: Colors.softWhite,
    fontSize: FontSize.fs16,
  },
  button: {
    borderRadius: 5,
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#00b3ac",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 30,
  },
  list: {
    width: "100%",
  },
  textList: {
    fontSize: 18,
    color: "black",
  },
  textListGrey: {
    fontSize: 18,
    color: Colors.placeholder,
  },
});
export default Registration;
