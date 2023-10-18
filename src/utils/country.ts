import { listCountry } from '../constants/list-country';

export const isCountry = (country: string): boolean => {
  return listCountry.map((country) => country.name.toLowerCase()).includes(country.toLowerCase());
}

export const getCountry = (country: string): string => {
  return listCountry.find((countryObj) => countryObj.name.toLowerCase() === country.toLowerCase())?.name || '';
}

export const getCountryCode = (country: string): string => {
  return listCountry.find((countryObj) => countryObj.name.toLowerCase() === country.toLowerCase())?.code || '';
}

export const getCountryByCode = (code: string): string => {
  return listCountry.find((countryObj) => countryObj.code.toLowerCase() === code.toLowerCase())?.name || '';
}