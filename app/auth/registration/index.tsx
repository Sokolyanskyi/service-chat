import * as yup from 'yup';

import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BorderRadius, Colors, FontSize } from '@/components/shared/tokens';
import { COUNTRIES, REGISTER } from '@/states/routes';
import React, { useEffect, useState } from 'react';

import Button from '@/components/shared/button/Button';
import { Country } from '@/states/cities.state';
import InputController from '@/components/shared/input/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Country[]>([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [optionName, setOptionName] = useState('');
  console.log(optionName);

  const registerFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Lastname is required'),
    phone: yup
      .string()
      .matches(
        /^[0-9]{10,15}$/,
        'Enter a valid number, starting with + and containing 10 to 15 digits.',
      )
      .required('Phone is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[a-z]/,
        'Пароль должен содержать хотя бы одну букву в нижнем регистре',
      )
      .matches(
        /[A-Z]/,
        'Пароль должен содержать хотя бы одну букву в верхнем регистре',
      )
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[a-z]/,
        'Пароль должен содержать хотя бы одну букву в нижнем регистре',
      )
      .matches(
        /[A-Z]/,
        'Пароль должен содержать хотя бы одну букву в верхнем регистре',
      )
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormSchema), mode: 'onChange' });
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
    const textError = JSON.parse(text);

    Alert.alert(
      'Error',
      `      ${textError.errors.email}
      ${textError.errors.phoneNumber}`,
      [
        {
          text: 'Close',
          style: 'cancel',
        },
      ],
    );
  };
  /* eslint-disable */

  useEffect(() => {
    getCountry();
  }, []);
  const register = async (dataForm: any) => {
    try {
      const { data } = await axios.post(REGISTER, {
        country: selectedOption,
        lastname: dataForm.lastname,
        name: dataForm.name,
        phoneNumber: dataForm.phone,
        email: dataForm.email.toLowerCase(),
        password: dataForm.password,
        password_confirmation: dataForm.password_confirmation,
      });
      router.replace('/auth/login');
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
      <Text style={{ color: 'black', fontSize: FontSize.fs18 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-1 justify-center mt-2 mb-28">
          <View className="justify-center items-center  ">
            <Text className="text-4xl mb-10 mt-5 font-bold color-teal-700">
              Registration
            </Text>

            <View className="w-[300px] mb-20">
              <View style={styles.input}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text
                    style={
                      selectedOption ? styles.textList : styles.textListGrey
                    }
                  >
                    {selectedOption ? optionName : 'Please choose country'}
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
                      className="w-full"
                      data={data}
                      renderItem={renderOption}
                      keyExtractor={(item) => item.id.toLocaleString()}
                    />
                  </View>
                </Modal>
              </View>
              <InputController
                errors={errors}
                placeholder={'Name'}
                control={control}
                name="name"
              />
              <InputController
                errors={errors}
                placeholder={'Last Name'}
                control={control}
                name="lastname"
              />
              <InputController
                errors={errors}
                name="phone"
                placeholder={'Phone'}
                props={{ keyboardType: 'phone-pad' }}
                control={control}
              />
              <InputController
                errors={errors}
                name="email"
                placeholder={'Email'}
                props={{ keyboardType: 'email-address' }}
                control={control}
              />
              <InputController
                errors={errors}
                name="password"
                placeholder={'Password'}
                control={control}
                //   isPassword={true}
              />
              <InputController
                errors={errors}
                name="password_confirmation"
                placeholder={'PasswordConfirm'}
                control={control}
                //   isPassword={true}
              />
              <InputController
                errors={errors}
                placeholder={'From who bought Company'}
                name="from"
                control={control}
              />
              <InputController
                errors={errors}
                placeholder={'Installation Company Name'}
                name="company"
                control={control}
              />
              <Button text={'Sing Up'} onPress={handleSubmit(register)} />
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
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSize.fs30,
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { alignSelf: 'stretch' },
  input: {
    justifyContent: 'center',
    height: 58,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.r10,
    backgroundColor: '#e1eeea',
    bottom: 20,
    fontSize: FontSize.fs16,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#00b3ac',
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
    borderBottomColor: '#ccc',
    fontSize: 30,
  },
  textList: {
    fontSize: 18,
    color: 'black',
  },
  textListGrey: {
    fontSize: 18,
    color: Colors.placeholder,
  },
});
export default Index;
