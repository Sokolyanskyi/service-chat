import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Alert} from "react-native";
import {useRouter} from "expo-router";
import {BorderRadius, Colors, FontSize, Gaps} from "@/components/shared/tokens";
import Input from "@/components/shared/input/input";
import Button from "@/components/shared/button/Button";


const AddProject = () => {

    const [projectName, setProjectName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [qSystem, setQSystem] = useState('')
    const [qOutdoor, setQOutdoor] = useState('')

    const router = useRouter();


    const alert = (text: string) => {
        if (text=== '') {
            Alert.alert('Warning', `please enter some information`, [{
                text: 'I am going to',
                style: 'cancel'
            }])
        } else {
            Alert.alert('Added project', `${text}`, [{
                text: 'Good!',
                style: 'cancel'
            }])
        }

    }
    const dataInput = {
        projectName: projectName,
        city: city,
        address: address,
        date: date,
        qSystem: qSystem,
        qOutdoor: qOutdoor
    }
    useEffect(() => {

        console.log(dataInput)
    }, [qOutdoor, projectName, city, address, date, qSystem]);


    const addProject = async () => {
        alert(dataInput.projectName)
        console.log(dataInput)
    }


    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={styles.text}>
                        Add Project
                    </Text>
                    <View style={styles.form}>
                        <Input placeholder={'Project Name'} onChangeText={setProjectName}/>
                        <Input placeholder={'City'}  onChangeText={setCity}/>
                        <Input placeholder={'Address'}  onChangeText={setAddress}/>
                        <Input placeholder={'Commissioning Completion Date'} onChangeText={setDate}/>
                        <Input placeholder={'Quantity of System'} onChangeText={setQSystem}/>
                        <Input placeholder={'Quantity of Outdoor Unit'} onChangeText={setQOutdoor}/>
                        <Button text={'Add Photos'}/>
                        <Button text={"Add Project"} onPress={() => addProject()}/>
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
export default AddProject
