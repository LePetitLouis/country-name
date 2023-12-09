import { defineStore } from "pinia";

interface SettingsState {
  showWelcomeCountry: boolean;
  showWelcomeCapital: boolean;
}

const initialState: SettingsState = {
  showWelcomeCountry: true,
  showWelcomeCapital: true,
};

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => initialState,
  getters: {
    getShowWelcomeCountry: (state) => state.showWelcomeCountry,
    getShowWelcomeCapital: (state) => state.showWelcomeCapital,
  },
  actions: {
    setShowWelcomeCountry(showWelcome: boolean) {
      this.showWelcomeCountry = showWelcome;
    },
    setShowWelcomeCapitale(showWelcome: boolean) {
      this.showWelcomeCapital = showWelcome;
    },
  },
  persist: true,
});
