import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogout = async (router) => {
  // const token = await AsyncStorage.getItem('access_token');
  // console.log(token);
  // if (token) {
  //   try {
  //     const { data } = await axios.post(LOGOUT, {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  await AsyncStorage.removeItem('access_token');
  router.replace('/welcome');
};
