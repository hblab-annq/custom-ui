import { ref } from "vue";
import { defineStore } from "pinia";

export const useIsLoad = defineStore("isLoaded", () => {
  const isLoad = ref(false);

  const setIsLoad = (value: boolean) => {
    isLoad.value = value;
  };

  const reverse = () => (isLoad.value = !isLoad);

  return { isLoad, setIsLoad, reverse };
});
