import { defineStore } from "pinia";

interface CountryState {
  listCountries: string[];
}

const initialState: CountryState = {
  listCountries: [],
};

export const useCountryStore = defineStore("country", {
  state: (): CountryState => initialState,
  getters: {
    getListCountries: (state) => state.listCountries,
  },
  actions: {
    addCountry(country: string) {
      this.listCountries.push(country);
    },
    reset() {
      this.listCountries = [];
    }
  },
  persist: true,
});

