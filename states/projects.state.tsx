import {create} from 'zustand'
import axios from "axios";
import {PROJECTS} from "@/states/routes";
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

type Store = {
    projects: Project[],
    isLoading: boolean,
    getProjects: () => Promise<void>

}
export const useProjectsStore = create<Store>()((set) => ({
    projects: [],
    isLoading: false,
    getProjects: async () => {
        const token = await AsyncStorage.getItem('access_token');
        set({isLoading: true});
        if (token) {
            try {
                const {data} = await axios.get(PROJECTS,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                set({projects: data, isLoading: false});

            } catch (err) {
                set({isLoading: false});
                console.log(err)
            }
        }
    }

}))