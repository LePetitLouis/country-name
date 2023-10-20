import { listCountriesOfContinent, continents } from "@/constants/list-continents";

export const totalCountriesOfContinent = (continent: string): number => {
  return listCountriesOfContinent.find((continentObj) => continentObj.name.toLowerCase() === continent.toLowerCase())?.total || 0;
}

export const countriesOfContinent = (continent: string): string[] => {
  return listCountriesOfContinent.find((continentObj) => continentObj.name.toLowerCase() === continent.toLowerCase())?.countries || [];
}

export const listContinents = (): string[] => {
  return continents.map((continent) => continent.name);
}