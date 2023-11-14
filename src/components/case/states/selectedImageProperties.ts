import { ref } from "vue";
import { defineStore } from "pinia";

export const useSelectedImageProperties = defineStore(
  "selectedImageProperties",
  () => {
    const properties = ref({
      "fill/solid/color": null,
    });

    const setSelectedImageProperties = (value: any) => {
      properties.value = value;
    };

    return { mode: properties, setSelectedImageProperties };
  }
);
