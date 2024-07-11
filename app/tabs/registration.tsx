import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Alert} from "react-native";
import {useRouter} from "expo-router";
import {BorderRadius, Colors, FontSize, Gaps} from "@/components/shared/tokens";
import Input from "@/components/shared/input/input";
import Button from "@/components/shared/button/Button";
import {Country} from "@/states/cities.state";
import axios from "axios";
import {COUNTRIES, REGISTER} from "@/states/routes";


const Registration = () => {

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Country[]>([])
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [optionName, setOptionName] = useState('')
    const getCountry = async () => {
        try {
            const {data} = await axios.get(COUNTRIES)
            setData(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const alert = (text: string) => {
        Alert.alert('Error', `${text}`, [{
            text: 'Close',
            style: 'cancel'
        }])
    }
    useEffect(() => {
        const dataInput = {
            countryId: selectedOption,
            name: name,
            phoneNumber: phoneNumber,
            email: email.toLowerCase(),
            password: password,
            password_confirmation: passwordConfirm
        }
        console.log(dataInput)
    }, [optionName, name, email, password, passwordConfirm, phoneNumber]);

    useEffect(() => {
        getCountry()

    }, []);
    const register = async () => {
        try {
            const {data} = await axios.post(REGISTER, {
                countryId: selectedOption,
                name: name,
                phoneNumber: phoneNumber,
                email: email.toLowerCase(),
                password: password,
                password_confirmation: passwordConfirm
            })
            router.replace('/tabs')
            console.log(data)
        } catch (err: any) {
            alert(JSON.stringify(err.response.data))
            console.log(err.response.data)
        } finally {
            console.log(data)
        }

    }
    const renderOption = ({item}: any) => (
        <TouchableOpacity
            style={styles.option}
            onPress={() => {
                setOptionName(item.name)
                setSelectedOption(item.id);
                setModalVisible(false);
            }}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );


    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={styles.text}>
                        Registration Page
                    </Text>

                    <View style={styles.form}>
                        <View style={styles.input}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text
                                    style={selectedOption ? styles.textList :styles.textListGrey}>{selectedOption ? optionName : 'Please choose country'}</Text>
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
                        <Input placeholder={'Name'} onChangeText={setName}/>
                        <Input placeholder={'Phone'} inputMode={'tel'} onChangeText={setPhoneNumber}/>
                        <Input placeholder={'Email'} inputMode={'email'} onChangeText={setEmail}/>
                        <Input placeholder={'Password'} onChangeText={setPassword} isPassword={true}/>
                        <Input placeholder={'PasswordConfirm'} onChangeText={setPasswordConfirm} isPassword={true}/>
                        <Input placeholder={'From who bought Company'}/>
                        <Input placeholder={'Installation Company Name'}/>
                        <Button text={"Sing Up"} onPress={() => register()}/>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    input: {
        justifyContent: 'center',
        height: 58,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.r10,
        backgroundColor: Colors.softWhite,
        fontSize: FontSize.fs16

    },
    button: {
        borderRadius: 5,
        fontSize: 18
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    list: {
        width: "100%",

    },
    textList: {
        fontSize: 16,
        color: 'black'
    },
    textListGrey: {
        fontSize: 16,
        color: Colors.placeholder
    }

})
export default Registration
