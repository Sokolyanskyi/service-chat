import { create } from "zustand";
import axios from "axios";
import { PROJECT } from "@/states/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Project {
  id: number;
  name: string;
  city: string;
  address: string;
  chat_ui: string;
  commissioningCompletionDate: string;
  quantityOfSystem: number;
  quantityOfOutdoorUnit: number;
}
type Store = {
  project: Project;
  isLoading: boolean;
  getProject: (id: string | string[]) => Promise<void>;
};
export const useProjectStore = create<Store>()((set) => ({
  project: {
    id: 0,
    name: "",
    city: "",
    address: "",
    chat_ui: "",
    commissioningCompletionDate: "",
    quantityOfSystem: 0,
    quantityOfOutdoorUnit: 0,
  },
  isLoading: false,
  getProject: async (id) => {
    const token = await AsyncStorage.getItem("access_token");
    set({ isLoading: true });
    if (token) {
      try {
        console.log(id);
        const { data } = await axios.get(PROJECT + id, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        console.log(data);
        set({ project: data, isLoading: false });
        await AsyncStorage.setItem("chat_uid", data.id);
      } catch (err) {
        set({ isLoading: false });
        console.error(err);
      } finally {
        set({ isLoading: false });
      }
    }
  },
}));
