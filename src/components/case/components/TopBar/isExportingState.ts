import { ref } from "vue";
import { defineStore } from "pinia";

export const useIsExporting = defineStore("isExporting", () => {
  const isExporting = ref(false);

  const setIsExporting = (value: any) => {
    isExporting.value = value;
  };

  return { isExporting, setIsExporting };
});
