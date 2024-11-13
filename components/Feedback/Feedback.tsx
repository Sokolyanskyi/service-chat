import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SURVAY } from '@/states/routes';
import { useLocalSearchParams } from 'expo-router';

const FeedbackModal = ({ hashedMessageId }: { hashedMessageId: string }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]); // Рейтинги для 5 вопросов
  const { control, handleSubmit, reset } = useForm();
  const { id } = useLocalSearchParams();

  // Функция для обработки отправки формы
  const onSubmit = async (data: any) => {
    const token = await AsyncStorage.getItem('access_token');
    Alert.prompt(
      'Additional Feedback',
      'Are you sure?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('Submit Pressed'),
        },
      ],
      'plain-text',
    );
    if (token) {
      try {
        await axios.post(
          `${SURVAY}/${id}/messages/${hashedMessageId}/rate`,
          {
            ratings,
            additionalFeedback: data.additionalFeedback,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        Alert.alert('Success', 'Feedback submitted successfully');
        reset();
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to submit feedback');
        console.log(error);
      }
    }
  };

  // Функция для установки рейтинга
  const handleRating = (questionIndex: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[questionIndex] = rating;
    setRatings(newRatings);
  };

  return (
    <View className="">
      <TouchableOpacity
        className="bg-[#00b3ac] p-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Open Feedback</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          intensity={120}
          tint="dark"
          className="flex-1 justify-center items-center"
        >
          <ScrollView
            className="flex-1   bg-blure bg-opacity-100 "
            showsVerticalScrollIndicator={false}
          >
            <View className="  bg-white p-4 rounded-lg w-fit my-20 ">
              <Text className="text-lg font-bold text-center mb-4">
                After Sales Service Satisfaction Survey
              </Text>

              {/* Вопросы с оценкой от 1 до 5 */}
              {[
                'Service Attribute',
                'Service Response Speed',
                'Satisfaction with service results',
                'Quality of service personnel',
                'Professionalism of service personel',
              ].map((question, index) => (
                <View key={index} className="mb-4">
                  <Text className="text-lg mb-2">{question}</Text>
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <TouchableOpacity
                        key={rating}
                        onPress={() => handleRating(index, rating)}
                        className="p-2"
                      >
                        <FontAwesome
                          name={ratings[index] >= rating ? 'star' : 'star-o'}
                          size={24}
                          color={ratings[index] >= rating ? 'gold' : 'gray'}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}

              {/* Вопрос с текстовым ответом */}
              <Text className="text-lg mb-2">
                Your suggestion for this service is
              </Text>
              <Controller
                control={control}
                name="additionalFeedback"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-gray-300 rounded p-2 mb-4"
                    placeholder="Your feedback"
                    value={value}
                    onChangeText={onChange}
                    multiline
                  />
                )}
              />

              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  className="bg-gray-400 p-3 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 p-3 rounded-lg"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-center">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </BlurView>
      </Modal>
    </View>
  );
};

export default FeedbackModal;
