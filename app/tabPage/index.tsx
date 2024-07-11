import {View, Text, StyleSheet, GestureResponderEvent} from "react-native";
import {FontSize} from "@/components/shared/tokens";
import Button from "@/components/shared/button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from 'expo-router';
import Celebration from "@/hooks/animations/Celebration";


const Index = () => {

    const router = useRouter()
    const handleLogout = async () => {
        await AsyncStorage.removeItem('access_token');
        router.replace('/tabs');
    }
    const replaceFunc = (link: string): any => {
        router.push(link);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You have successfully logged in</Text>
            <Celebration/>
            <Button text='Project list/ask' onPress={() => replaceFunc('/tabPage/projectList')} style={{width: 300}}></Button>
            <Button text='Add project' onPress={() => replaceFunc('/tabPage/addProject')} style={{width: 300}}></Button>
            <Button text='LogOut' onPress={handleLogout} style={{width: 300}}></Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30
    },
    text: {
        fontSize: FontSize.fs30,
        alignItems: 'center',
        textAlign: 'center'
    },

})
export default Index;