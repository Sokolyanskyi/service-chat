import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FontSize, Gaps} from "@/components/shared/tokens";
import {Link, useLocalSearchParams, useRouter} from "expo-router";

const ProjectPage = () => {
    const { id } = useLocalSearchParams();

    console.log(id)
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <View style={styles.content}>
                <Text style={styles.text}>
                    View {id}
                </Text>
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
export default ProjectPage;
