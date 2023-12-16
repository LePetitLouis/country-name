import { defineStore } from "pinia";

interface SettingsState {
  showWelcomeCountry: boolean;
  showWelcomeCapital: boolean;
  showWelcomePinCountry: boolean;
}

const initialState: SettingsState = {
  showWelcomeCountry: true,
  showWelcomeCapital: true,
  showWelcomePinCountry: true,
};

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => initialState,
  getters: {
    getShowWelcomeCountry: (state) => state.showWelcomeCountry,
    getShowWelcomeCapital: (state) => state.showWelcomeCapital,
    getShowWelcomePinCountry: (state) => state.showWelcomePinCountry,
  },
  actions: {
    setShowWelcomeCountry(showWelcome: boolean) {
      this.showWelcomeCountry = showWelcome;
    },
    setShowWelcomeCapitale(showWelcome: boolean) {
      this.showWelcomeCapital = showWelcome;
    },

    setShowWelcomePinCountry(showWelcome: boolean) {
      this.showWelcomePinCountry = showWelcome;
    },
  },
  persist: true,
});
