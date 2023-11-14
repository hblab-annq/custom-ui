import { ref } from "vue";
import { defineStore } from "pinia";

export const useCanRedo = defineStore("canRedo", () => {
  const canRedo = ref(false);

  const setCanRedo = (value: any) => {
    canRedo.value = value;
  };

  return { canRedo, setCanRedo };
});
