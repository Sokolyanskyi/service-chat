import {create} from 'zustand'
import axios from "axios";
import {PROJECT, PROJECTS} from "@/states/routes";
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
type Store ={
    project: Project,
    isLoading: boolean,
    getProject: (id:string | string[]) => Promise<void>

}
export const useProjectStore = create<Store>()((set) =>({
    project: {
        id:0,
        name: '',
        city: '',
        address:'',
        commissioningCompletionDate:'',
        quantityOfSystem:0,
        quantityOfOutdoorUnit:0,
    },
    isLoading: false,
    getProject: async (id) => {
        const token = await AsyncStorage.getItem('access_token');
        set({ isLoading: true });
        if (token) {
            try {
                console.log(id)
                const {data} = await axios.get(PROJECT+id,
                    {
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                set({ project:data, isLoading: false });

            } catch (err) {
                set({ isLoading: false });
                console.error(err)
            }finally {
                set({ isLoading: false });
            }
        }}

}) )