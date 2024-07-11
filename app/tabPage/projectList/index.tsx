import React, {useEffect, useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontSize, Gaps} from "@/components/shared/tokens";
import {Link} from "expo-router";
import axios from "axios";
import { PROJECTS} from "@/states/routes";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Project {
    id: number;
    name: string;
    city: string;
    address: string;
    commissioningCompletionDate: string;
    quantityOfSystem: number;
    quantityOfOutdoorUnit: number;
}



const ProjectList = () => {
    const [data, setData] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<any>()
    useEffect(() => {
        checkToken()
    }, []);
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            setToken(token)


        } catch (error) {
            console.error('Ошибка при проверке токена:', error);
            alert(`${error}`)
        }
    };

    const getProjects = async () => {
        try {
            const {data} = await axios.get(PROJECTS,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                )
            setData(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            console.log(data)
        }
    }
    useEffect(() => {
        getProjects()
        console.log(token)
    }, []);


    const alert = (text: string) => {
        Alert.alert('Error', `${text}`, [{
            text: 'Close',
            style: 'cancel'
        }])
    }


    const renderItem = ({item}: { item: Project }) => (
        <Link href={`/tabPage/projectList/${item.id}/`} asChild>
            <TouchableOpacity>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </Link>
    );


    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>Project List</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        // keyExtractor={(item:Project) => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
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

})
export default ProjectList;
