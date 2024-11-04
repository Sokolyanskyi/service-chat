import * as yup from "yup";

import { Alert, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/shared/button/Button";
import DateInput from "@/components/DatePicker";
import InputController from "@/components/shared/input/input";
import { PROJECTS } from "@/states/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";

const AddProject = () => {
  const router = useRouter();
  const [token, setToken] = useState<any>();

  const addProjectFormSchema = yup.object().shape({
    projectName: yup.string().required("Project name is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
    date: yup.date().required("Commissioning Completion Date is required"),
    qSystem: yup
      .string()
      .matches(/[0-9]/, "Quantity of System must be a integer")
      .required("Quantity of System is required"),
    qOutdoor: yup
      .string()
      .matches(/[0-9]/, "Quantity of Outdoor Unit must be a integer")
      .required("Quantity of Outdoor Unit is required"),
  });

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setToken(token);
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      alert(`${error}`);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProjectFormSchema),
    mode: "onChange",
  });

  //   const alert = (text: string) => {
  //     if (text === "") {
  //       Alert.alert("Warning", `please enter some information`, [
  //         {
  //           text: "I am going to",
  //           style: "cancel",
  //         },
  //       ]);
  //     } else {
  //       Alert.alert("Added project", `${text}`, [
  //         {
  //           text: "Good!",
  //           style: "cancel",
  //         },
  //       ]);
  //     }
  //   };
  interface dataForm {
    projectName: string;
    city: string;
    address: string;
    date: string;
    qSystem: string;
    qOutdoor: string;
  }

  const addProjectForm = async (dataForm: any) => {
    try {
      const { data } = await axios.post(
        PROJECTS,
        {
          name: dataForm.projectName,
          city: dataForm.city,
          address: dataForm.address,
          commissioningCompletionDate: dataForm.date,
          quantityOfSystem: dataForm.qSystem,
          quantityOfOutdoorUnit: dataForm.qOutdoor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(dataForm);

      console.log(data);
      router.replace("/tabPage");
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 justify-center items-center">
          <View className="gap-3 justify-center items-center">
            <Text className="text-4xl mt-4">Add Project</Text>
            <View className="w-[300px]">
              <InputController
                errors={errors}
                placeholder={"Project Name"}
                control={control}
                name="projectName"
              />
              <InputController
                errors={errors}
                placeholder={"City"}
                control={control}
                name="city"
              />
              <InputController
                errors={errors}
                placeholder={"Address"}
                control={control}
                name="address"
              />
              <DateInput control={control} name="date" errors={errors} />

              <InputController
                errors={errors}
                placeholder={"Quantity of System"}
                control={control}
                name="qSystem"
              />
              <InputController
                errors={errors}
                placeholder={"Quantity of Outdoor Unit"}
                control={control}
                name="qOutdoor"
              />

              <Button
                text={"Add Photos"}
                onPress={() => console.log("Add Photos")}
              />
              <Button
                text={"Add Project"}
                onPress={handleSubmit(addProjectForm)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProject;
