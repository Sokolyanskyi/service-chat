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
import { PHONECODE, REGISTER } from '@/states/routes';
import React, { useEffect, useState } from 'react';

import Button from '@/components/shared/button/Button';
import { Country } from '@/states/cities.state';
import InputController from '@/components/shared/input/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryPicker, {
  Country as CountryType,
} from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-number-input';

// Типы данных формы
interface RegisterFormData extends FieldValues {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  from?: string;
  company?: string;
}

// Типы ошибок, если есть несколько
interface ApiError {
  errors: {
    email?: string;
    phoneNumber?: string;
  };
}

// Компонент регистрации
const Index: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Country[]>([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [codeCountry, setCodeCountry] = useState<string>('US'); // по умолчанию 'UA'
  const [optionName, setOptionName] = useState<string>('');

  const registerFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Lastname is required'),
    phone: yup
      .string()
      .matches(
        /^\+?[0-9]{10,15}$/,
        'Enter a valid number containing 10 to 15 digits.',
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
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
    mode: 'onChange',
  });

  const getCountry = async () => {
    try {
      const response = await axios.get(PHONECODE);
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const alert = (text: string) => {
    const textError: ApiError = JSON.parse(text);
    Alert.alert(
      'Error',
      `      ${textError.errors.email || ''}
      ${textError.errors.phoneNumber || ''}`,
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  useEffect(() => {
    getCountry();
  }, []);

  const register = async (dataForm: RegisterFormData) => {
    const formattedPhoneNumber = dataForm.phone.replace(/^\+/, '');
    try {
      const response = await axios.post(REGISTER, {
        country: selectedOption,
        lastname: dataForm.lastname,
        name: dataForm.name,
        phoneNumber: formattedPhoneNumber,
        email: dataForm.email.toLowerCase(),
        password: dataForm.password,
        password_confirmation: dataForm.password_confirmation,
      });
      router.replace('/auth/login');
    } catch (err: any) {
      alert(JSON.stringify(err.response.data));
      console.log(err.response.data);
    }
  };

  const onSelectCountry = (country: CountryType) => {
    setCodeCountry(country.cca2);
  };

  const renderOption = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setCodeCountry(item.iso);
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
          <View className="justify-center items-center">
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
                  transparent
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalView}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      className="w-full"
                      data={data}
                      renderItem={renderOption}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                </Modal>
              </View>
              <InputController
                errors={errors}
                placeholder="Name"
                control={control}
                name="name"
              />
              <InputController
                errors={errors}
                placeholder="Last Name"
                control={control}
                name="lastname"
              />
              <View>
                {errors.phone && (
                  <Text className="text-[#ec4e4e] font-normal text-sm">
                    {errors.phone.message}
                  </Text>
                )}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      defaultValue={value}
                      defaultCode={codeCountry}
                      layout="first"
                      onChangeFormattedText={onChange}
                      renderDropdownImage={() => (
                        <CountryPicker
                          countryCode={codeCountry}
                          withFilter
                          withFlag
                          withCallingCode
                          withCallingCodeButton
                          onSelect={onSelectCountry}
                        />
                      )}
                      containerStyle={styles.phoneContainer}
                      textContainerStyle={styles.textInput}
                      countryPickerButtonStyle={styles.picker}
                    />
                  )}
                />
              </View>
              <InputController
                errors={errors}
                name="email"
                placeholder="Email"
                props={{ keyboardType: 'email-address' }}
                control={control}
              />
              <InputController
                errors={errors}
                name="password"
                placeholder="Password"
                control={control}
              />
              <InputController
                errors={errors}
                name="password_confirmation"
                placeholder="Confirm password"
                control={control}
              />
              <InputController
                errors={errors}
                placeholder="From who bought Company"
                name="from"
                control={control}
              />
              <InputController
                errors={errors}
                placeholder="Installation Company Name"
                name="company"
                control={control}
              />
              <Button text="Sign Up" onPress={handleSubmit(register)} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Стили
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
  phoneContainer: {
    width: '100%',
    height: 58,
    backgroundColor: '#e1eeea',
    borderRadius: 5,
    marginBottom: 20,
  },
  textInput: {
    margin: 0,
    paddingVertical: 0,
    backgroundColor: '#e1eeea',
    borderRadius: 5,
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
  picker: {
    width: 80,
    backgroundColor: '#e1eeea',
    borderRadius: 5,
  },
});

export default Index;
