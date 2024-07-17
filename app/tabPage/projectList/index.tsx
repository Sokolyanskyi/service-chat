import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {BorderRadius, FontSize, Gaps} from "@/components/shared/tokens";
import {Link} from "expo-router";
import {useProjectsStore} from "@/states/projects.state";



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
    const [refreshing, setRefreshing] = useState(false);
    const projects = useProjectsStore(state => state.projects);
    const getProjects = useProjectsStore(state => state.getProjects);
    const isLoading = useProjectsStore(state => state.isLoading);


    useEffect(() => {
        setRefreshing(true);
        getProjects()
        setRefreshing(false);
    }, [getProjects]);

    const onRefresh = useCallback(() => {
        getProjects();
    }, [getProjects]);

    if (isLoading) {
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>)
    }
if(projects.length === 0) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
            <View >
                <Text>
                    No projects found.
                </Text>
            </View>
        </SafeAreaView>
    )
}

    const renderItem = ({item}: { item: Project }) => (
        <Link href={`/tabPage/projectList/${item.id}/`} asChild>
            <TouchableOpacity style={styles.list}>
                <View style={styles.listItem}>
                    <Text style={{color: 'white'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );


    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
            <View style={styles.content}>
                <Text>Project List</Text>
                <FlatList
                    data={projects}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#9Bd35A", "#689F38"]} // Цвета для Android
                            tintColor="#689F38" // Цвет для iOS
                        />
                    }
                    // keyExtractor={(item:Project) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({

    text: {
        fontSize: FontSize.fs30,
    },
    content: {

        alignItems: "center",
        justifyContent: "center",
        gap: Gaps.g50
    },
    form: {alignSelf: "stretch", gap: Gaps.g16},
    listItem: {

        backgroundColor: "#0181E4",
        height: 80,
        borderRadius: BorderRadius.r10,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginBottom: 15,
    },
    list: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        paddingHorizontal: 15,
    },


})
export default ProjectList;
