import { create } from 'zustand';
import axios from 'axios';
import { PHONECODE } from '@/states/routes';

export type Country = {
  id: number;
  name: string;
  phoneCode: string;
  iso: string;
};
type Store = {
  countries: Country[];
  getCountries: () => void;
};
export const useCountries = create<Store>()((set, get) => ({
  countries: [],
  getCountries: async () => {
    try {
      const res = await axios.get(PHONECODE);
      set(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  },
}));
