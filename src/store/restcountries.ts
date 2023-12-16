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
  countrySelected: string;

  pinContinent: string;
  pinTimer: number;
  listPinCountries: countries[];
  pinCountriesFound: string[];
}

const initialState: RestCountriesState = {
  listCountries: [],
  countriesFound: [],
  listCapitales: [],
  capitalesFound: [],
  countrySelected: "",
  pinContinent: "",
  pinTimer: 0,
  listPinCountries: [],
  pinCountriesFound: [],
};

export const useRestCountries = defineStore("restcountries", {
  state: (): RestCountriesState => initialState,

  getters: {
    getAllCountries: (state: RestCountriesState) => state.listCountries,
    getAllCapitales: (state: RestCountriesState) => state.listCapitales,
    getCountriesFound: (state: RestCountriesState) => state.countriesFound,
    getCapitalesFound: (state: RestCountriesState) => state.capitalesFound,
    getCountrySelected: (state: RestCountriesState) => state.countrySelected,
    getContinents: (state) => [
      ...new Set(state.listCountries.map((country) => country.continent)),
    ],
    getCountriesByContinent: (state) => {
      return state.listCountries.reduce((acc: any, country) => {
        if (!acc[country.continent]) {
          acc[country.continent] = [];
        }
        acc[country.continent].push(country.code);
        return acc;
      }, {});
    },
    getPinCountriesFound: (state: RestCountriesState) => state.pinCountriesFound,
    getListPinCountries: (state: RestCountriesState) => state.listPinCountries,
    getPinTimer: (state: RestCountriesState) => state.pinTimer,
  },

  actions: {
    async fetchRestCountries() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const body = await response.json();

      const retrieveAllCountries = body.map((country: any) => {
        return {
          code: country.cca2,
          name: country.name.common,
          continent: country.continents[0],
        };
      });
      this.listCountries = retrieveAllCountries;

      const retrieveAllCapitales = body
        .filter((country: any) => country.hasOwnProperty("capital"))
        .filter((country: any) => country.capital[0] !== "Washington DC")
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

    setCountrySelected(country: string) {
      this.countrySelected = country;
    },

    setPinContient(continent: string) {
      this.pinContinent = continent;
      if (continent === 'all') this.listPinCountries = shuffleArray(this.listCountries);
      else {
        const filterListCountries = this.listCountries.filter(country => country.continent === continent);
        this.listPinCountries = shuffleArray(filterListCountries);
      }
    },

    setListPinCountries(code: string) {
      this.listPinCountries = this.listPinCountries.filter(country => country.code !== code);
    },

    setNextPinCountry() {
      if (!this.listPinCountries.length) return;

      const cloneListPinCountries = [...this.listPinCountries];
      cloneListPinCountries.shift();
      this.listPinCountries = cloneListPinCountries;
    },

    setPinTimer(timer: number) {
      this.pinTimer = timer;
    },

    setPinCountryFound(country: string) {
      this.pinCountriesFound.unshift(country);
    },

    resetPinCountries() {
      this.pinCountriesFound = []
      this.pinContinent = "";
      this.pinTimer = 0;
      this.listPinCountries = [];
    },

    resetStore() {
      this.$state = initialState;
    },
  },

  persist: true,
});

const shuffleArray = (array: any) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
