import { ref } from "vue";
import { defineStore } from "pinia";

export const useEditorState = defineStore("editorStateed", () => {
  const editorState = ref({
    editMode: "Transform",
  });

  const setEditorState = (value: any) => {
    editorState.value = value;
  };

  return { editorState, setEditorState };
});
