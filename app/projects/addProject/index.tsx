import * as yup from 'yup';
/* eslint-disable */
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateInput from '@/components/DatePicker';
import InputController from '@/components/shared/input/input';
import { PROJECTS } from '@/states/routes';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import HeaderBar from '@/components/shared/HeaderBar/HeaderBar';

const AddProject = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const addProjectFormSchema = yup.object().shape({
    projectName: yup.string().required('Project name is required'),
    city: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
    date: yup.date().required('Commissioning Completion Date is required'),
    qSystem: yup
      .string()
      .matches(/[0-9]/, 'Quantity of System must be a integer')
      .required('Quantity of System is required'),
    qOutdoor: yup
      .string()
      .matches(/[0-9]/, 'Quantity of Outdoor Unit must be a integer')
      .required('Quantity of Outdoor Unit is required'),
  });

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      setToken(token);
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
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
    mode: 'onChange',
  });

  interface dataForm {
    projectName: string;
    city: string;
    address: string;
    commissioningCompletionDate: string;
    quantityOfSystem: string | number;
    quantityOfOutdoorUnit: string | number;
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
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      console.log(data);

      Alert.alert(
        'Project added',
        'If you want to add photos to the project, go to the edit project page',
        [
          {
            text: 'Go to project list',
            style: 'cancel',
            onPress: () => {
              router.replace(`/projects/projectList`);
            },
          },
          {
            text: 'Add photos',
            style: 'default',
            onPress: () => {
              router.replace(`/projects/projectList/${data.id}/editProject`);
            },
          },
        ],
        { cancelable: true },
      );

      console.log(data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <View>
      <HeaderBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center mt-8 mb-52 ">
          <View className="gap-3 justify-center items-center  mb-52 ">
            <View className="w-[300px]">
              <InputController
                errors={errors}
                placeholder={'Project Name'}
                control={control}
                name="projectName"
              />
              <InputController
                errors={errors}
                placeholder={'City'}
                control={control}
                name="city"
              />
              <InputController
                errors={errors}
                placeholder={'Address'}
                control={control}
                name="address"
              />
              <DateInput control={control} name="date" errors={errors} />

              <InputController
                errors={errors}
                placeholder={'Quantity of System'}
                control={control}
                name="qSystem"
              />
              <InputController
                errors={errors}
                placeholder={'Quantity of Outdoor Unit'}
                control={control}
                name="qOutdoor"
              />

              <View className="flex-row gap-6 mt-14 w-full">
                <TouchableOpacity
                  className=" justify-center items-center p-2 bg-red-400 border-2 border-gray-300 w-40 mb-2 rounded-xl"
                  onPress={() => router.replace('/projects/projectList')}
                >
                  <Text className="color-white text-2xl">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="justify-center items-center p-2 bg-[#00b3ac] border-2 border-gray-300 w-40 mb-2 rounded-xl"
                  onPress={handleSubmit(addProjectForm)}
                >
                  <Text className="color-white text-2xl">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProject;
