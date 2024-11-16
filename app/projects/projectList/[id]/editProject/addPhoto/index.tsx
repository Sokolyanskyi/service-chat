import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/shared/button/Button';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImageGroupStore } from '@/states/imagesAddToProject.state';
import { Octicons } from '@expo/vector-icons'; // Импорт хранилища Zustand
// Импорт хранилища Zustand

type FormValues = {
  group: string;
};

const imageGroups = [
  'Группа 1',
  'Группа 2',
  'Группа 3',
  'Группа 4',
  'Группа 5',
];

const AddImagePage = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const {
    selectedGroup,
    images,
    setSelectedGroup,
    addImage,
    removeImage,
    resetState,
  } = useImageGroupStore(); // Используем Zustand

  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width,
  );

  const pickImage = async (source: 'camera' | 'gallery') => {
    const result = await (source === 'camera'
      ? ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
      : ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        }));
    console.log(result);
    if (!result.canceled && result.assets[0].uri) {
      addImage(result.assets[0].uri); // Используем Zustand
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={[styles.imageWrapper, { width: containerWidth }]}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(item)} // Используем Zustand
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const onSubmit = async () => {
    if (!selectedGroup) {
      Alert.alert('Ошибка', 'Выберите группу изображений.');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Ошибка', 'Добавьте хотя бы одно изображение.');
      return;
    }

    const formData = new FormData();
    formData.append('group', selectedGroup);
    images.forEach((uri, index) => {
      formData.append(`images[${index}]`, {
        uri,
        name: `image${index}.jpg`,
        type: 'image/jpeg',
      } as any);
    });

    try {
      const response = await axios.post(
        'https://your-server-endpoint.com/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      Alert.alert('Успех', 'Данные успешно отправлены на сервер!');
      resetState(); // Очищаем состояние после отправки
    } catch (error) {
      console.error(error);
      Alert.alert('Ошибка', 'Произошла ошибка при отправке данных.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Селектор групп */}
      <Controller
        name="group"
        control={control}
        render={({ field: { onChange } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedGroup}
              onValueChange={(value) => {
                onChange(value);
                setSelectedGroup(value); // Используем Zustand
              }}
              style={styles.picker}
              mode="dialog"
            >
              <Picker.Item
                label="Выберите группу"
                value=""
                style={styles.text}
              />
              {imageGroups.map((group) => (
                <Picker.Item
                  key={group}
                  label={group}
                  value={group}
                  style={styles.text}
                />
              ))}
            </Picker>
          </View>
        )}
      />

      {/* Карточка для изображений */}
      <View
        style={styles.card}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
        {images.length === 0 ? (
          <TouchableOpacity
            className="flex-1 items-center justify-center gap-3"
            onPress={() => pickImage('gallery')}
          >
            <Octicons
              name={'diff-added'}
              size={80}
              color={'rgba(0, 0, 0, 0.4)'}
            />
            <Text style={styles.placeholderText}>Добавьте изображения</Text>
          </TouchableOpacity>
        ) : (
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      {/* Кнопки добавления изображений */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => pickImage('camera')}
          className="flex-row gap-3 items-center justify-center"
        >
          <Octicons
            name={'device-camera'}
            size={30}
            color={'rgba(0, 0, 0, 0.4)'}
            className=""
          />
          <Text className="text-gray-500 text-md font-normal">
            Add photo from camera
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка отправки */}
      <Button text="Save" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50, // Отступ сверху
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#e8e7e7',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
  },
  picker: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize: 16,
    color: 'gray',
  },
  pickerWrapper: {
    borderWidth: 1, // Толщина границы
    borderColor: '#ccc', // Цвет границы
    borderRadius: 15, // Закругленные углы
    overflow: 'hidden', // Обрезка содержимого
    backgroundColor: '#fff',
    marginBottom: 20, // Белый фон
  },
  card: {
    height: 300, // Высота контейнера
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Полупрозрачный черный фон
    borderRadius: 50,
    padding: 5,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center', // Полупрозрач
  },
  removeButtonText: {
    color: '#e16969',
    fontWeight: 'bold',
    fontSize: 18,
  },
  placeholderText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 60,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default AddImagePage;
