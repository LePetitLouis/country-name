import { defineStore } from "pinia";

interface countries {
  code: string;
  name: string;
  continent: string;
}

interface capitales {
  code: string;
  capitale: string;
  nameCountry: string;
}

interface RestCountriesState {
  listCountries: countries[];
  countriesFound: string[];
  listCapitales: capitales[];
  capitalesFound: string[];
}

const initialState: RestCountriesState = {
  listCountries: [],
  countriesFound: [],
  listCapitales: [],
  capitalesFound: [],
};

export const useRestCountries = defineStore("restcountries", {
  state: (): RestCountriesState => initialState,

  getters: {
    getAllCountries: (state: RestCountriesState) => state.listCountries,
    getAllCapitales: (state: RestCountriesState) => state.listCapitales,
    getCountriesFound: (state: RestCountriesState) => state.countriesFound,
    getCapitalesFound: (state: RestCountriesState) => state.capitalesFound,
  },

  actions: {
    async fetchRestCountries() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const body = await response.json();

      const retrieveAllCountries = body.map((country: any) => {
        return {
          code: country.cca2,
          name: country.name.common,
          continent: country.continents,
        };
      });
      this.listCountries = retrieveAllCountries;

      const retrieveAllCapitales = body
        .filter((country: any) => country.hasOwnProperty("capital"))
        .map((country: any) => ({
          code: country.cca2,
          capitale: country.capital[0],
          nameCountry: country.name.common,
        }));
      this.listCapitales = retrieveAllCapitales;
    },

    setNewCountryFound(country: string) {
      this.countriesFound.unshift(country);
    },

    setNewCapitaleFound(capitale: string) {
      this.capitalesFound.unshift(capitale);
    },

    resetStore() {
      this.$state = initialState;
    },
  },

  persist: true,
});
