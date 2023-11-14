import { ref } from "vue";
import { defineStore } from "pinia";

export const useSelectedShapeProperties = defineStore(
  "selectedShapeProperties",
  () => {
    const properties = ref({
      "fill/solid/color": null,
    });

    const setSelectedShapeProperties = (value: any) => {
      properties.value = value;
    };

    return { mode: properties, setSelectedShapeProperties };
  }
);
