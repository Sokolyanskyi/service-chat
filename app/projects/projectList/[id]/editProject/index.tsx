import * as yup from 'yup';
/* eslint-disable */
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateInput from '@/components/DatePicker';
import InputController from '@/components/shared/input/input';
import { PROJECTS } from '@/states/routes';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import HeaderBar from '@/components/shared/HeaderBar/HeaderBar';
import { useProjectStore } from '@/states/project.state';
import { useProjectsStore } from '@/states/projects.state';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProject = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>();

  const project = useProjectStore((state) => state.project);
  const getProject = useProjectStore((state) => state.getProject);
  const isLoading = useProjectsStore((state) => state.isLoading);

  const { id } = useLocalSearchParams();
  useEffect(() => {
    if (id) getProject(id);
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  console.log(project.name);

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
    defaultValues: {
      projectName: project.name,
      city: project.city,
      address: project.address,
      date: new Date(project.commissioningCompletionDate.toString()),
      qSystem: project.quantityOfSystem.toString(),
      qOutdoor: project.quantityOfOutdoorUnit.toString(),
    },
  });

  interface dataForm {
    projectName: string;
    city: string;
    address: string;
    date: string;
    qSystem: string;
    qOutdoor: string;
  }

  const editProjectForm = async (dataForm: dataForm) => {
    try {
      const { data } = await axios.patch(
        `${PROJECTS}/${id}`,
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
      console.log(dataForm);

      console.log(data);
      router.replace('/projects/projectList');
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
        className="mt-8"
      >
        <View className="flex-1 justify-center items-center mb-28">
          <View className="gap-3 justify-center items-center">
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
                  onPress={handleSubmit(editProjectForm)}
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

export default EditProject;
