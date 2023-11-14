import { ref } from "vue";
import { defineStore } from "pinia";

export const useCustomEngine = defineStore("customEngine", () => {
  const customEngine = ref(null);

  const setCustomEngine = (value: any) => {
    customEngine.value = value;
  };

  return { customEngine, setCustomEngine };
});
