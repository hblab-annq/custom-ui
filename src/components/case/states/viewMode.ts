import { ref } from "vue";
import { defineStore } from "pinia";

export const useViewMode = defineStore("viewMode", () => {
  const mode = ref("edit");

  const setViewMode = (value: string) => {
    mode.value = value;
  };

  return { mode, setViewMode };
});
