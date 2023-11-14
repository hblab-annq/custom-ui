import { ref } from "vue";
import { defineStore } from "pinia";

export const useCanUndo = defineStore("canUndo", () => {
  const canUndo = ref(false);

  const setCanUndo = (value: any) => {
    canUndo.value = value;
  };

  return { canUndo, setCanUndo };
});
