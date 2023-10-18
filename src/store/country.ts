import { defineStore } from "pinia";

interface CountryState {
  listCountry: string[];
}

const initialState: CountryState = {
  listCountry: [],
};

export const useCountryStore = defineStore("country", {
  state: (): CountryState => initialState,
  getters: {
    getListCountries: (state) => state.listCountry,
  },
  actions: {
    addCountry(country: string) {
      this.listCountry.push(country);
    },
    reset() {
      this.listCountry = [];
    }
  },
});

