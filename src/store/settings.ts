import { defineStore } from "pinia";

interface SettingsState {
  showWelcome: boolean;
}

const initialState: SettingsState = {
  showWelcome: true,
};

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => initialState,
  getters: {
    getShowWelcome: (state) => state.showWelcome,
  },
  actions: {
    setShowWelcome(showWelcome: boolean) {
      this.showWelcome = showWelcome;
    },
  },
});
