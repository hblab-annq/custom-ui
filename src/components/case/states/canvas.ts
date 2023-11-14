import { ref } from "vue";
import { defineStore } from "pinia";

export const useCanvas = defineStore("canvas", () => {
  const canvas = ref(null);

  const setCanvas = (value: any) => {
    canvas.value = value;
  };

  return { canvas, setCanvas };
});
