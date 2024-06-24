import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity} from "react-native";
import ErrorNotification from "@/components/shared/ErrorNotification/ErrorNotification";
import Input from "@/components/shared/input/input";
import {FontSize, Gaps} from "@/components/shared/tokens";
import Button from "@/components/shared/button/Button";
import {useRouter} from "expo-router";
import axios from "axios";
import {LOGIN} from "@/states/routes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [error, setError] = useState<string | undefined>()
    const [loginForm, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handlePress = () => {
        router.push('/tabs/registration');
    };


    const alert = (text: string) => {
        Alert.alert('Error', `${text}`, [{
            text: 'Close',
            style: 'cancel'
        }])
    }

    const login = async () => {
        try {
            const res = await axios.post(LOGIN, {
                email: loginForm,
                password: password
            })
            await AsyncStorage.setItem('access_token', res.data.Bearer.accessToken);
            router.replace('/next');
            console.log(res.data.data)
        } catch (err: any) {
            alert(JSON.stringify(err.response.data))
        }
    }
    return (

        <View style={styles.container}>
            <ErrorNotification error={error}/>
            <View style={styles.content}>
                <Text style={styles.text}>
                    Login Page
                </Text>
                <View style={styles.form}>
                    <Input placeholder={'Login'} inputMode={'email'} onChangeText={setLogin}/>
                    <Input placeholder={'Password'} isPassword={true} onChangeText={setPassword}/>
                    <Button text={"Login"} onPress={() => login()}/>
                </View>

                <Text >If you dont have account please <TouchableOpacity   onPress={handlePress}><Text  style={{color: 'blue', fontSize:14, padding:0}}>Sing
                    Up</Text></TouchableOpacity></Text>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 45,
        justifyContent: 'center'
    },
    text: {
        fontSize: FontSize.fs30,


    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        gap: Gaps.g50
    },
    form: {alignSelf: "stretch", gap: Gaps.g16},
    singup: {
        alignItems:'center',
        justifyContent:'center',
        padding:10
    }

})
export default Login;