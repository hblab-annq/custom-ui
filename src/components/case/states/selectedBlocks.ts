import { ref } from "vue";
import { defineStore } from "pinia";

export const useSelectedBlocks = defineStore("selectedBlocks", () => {
  const mode = ref(null);

  const setSelectedBlocks = (value: any) => {
    mode.value = value;
  };

  return { mode, setSelectedBlocks };
});
