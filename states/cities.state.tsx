import { create } from 'zustand';
import axios from 'axios';
import { COUNTRIES } from '@/states/routes';

export type Country = {
  id: number;
  name: string;
};
type Store = {
  countries: Country[];
  getCountries: () => void;
};
export const useCountries = create<Store>()((set, get) => ({
  countries: [],
  getCountries: async () => {
    try {
      const res = await axios.get(COUNTRIES);
      set(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  },
}));
