<script setup lang="ts">
import { useCanRedo } from "../../states/canRedo";
import { useCanUndo } from "../../states/canUndo";
import { useCustomEngine } from "../../states/customEngineState";
import { useEditorState } from "../../states/editorState";
import { useIsLoad } from "../../states/isLoaded";
import { useViewMode } from "../../states/viewMode";
import { useIsExporting } from "./isExportingState";

import RedoIcon from "@/components/icons/RedoIcon.vue";
import UndoIcon from "@/components/icons/UndoIcon.vue";
import LoadingSpinnerIcon from "@/components/icons/LoadingSpinnerIcon.vue";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import SegmentedControl from "@/components/ui/SegmentedControl.vue";

const viewMode = useViewMode();
const isLoaded = useIsLoad();
const customEngine = useCustomEngine();
const canUndo = useCanUndo();
const canRedo = useCanRedo();

const isEditable = isLoaded.isLoad && viewMode.mode === "edit";
const exporting = useIsExporting();

const localDownload = (data: Blob | MediaSource, filename: string) => {
  return new Promise<void>((resolve) => {
    const element = document.createElement("a");
    element.setAttribute("href", window.URL.createObjectURL(data));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    resolve();
  });
};

const handleExport = async () => {
  exporting.setIsExporting(true);
  // Let react rerender
  await new Promise((resolve) => setTimeout(resolve, 0));
  const blob = await customEngine.customEngine.exportScene();
  localDownload(blob, "my-tshirt-design");
  exporting.setIsExporting(false);
};
</script>

<template>
  <div class="topBar">
    <div class="undoRedo">
      <div v-if="isEditable">
        <button
          @click="customEngine.customEngine.undo()"
          :class="{
            'undoRedoButton--disabled': !canUndo,
            undoRedoButton: true,
          }"
          :disabled="!canUndo"
        >
          <UndoIcon />
        </button>
        <button
          @click="customEngine.customEngine.redo()"
          :class="{
            'undoRedoButton--disabled': !canUndo,
            undoRedoButton: true,
          }"
          :disabled="!canRedo"
        >
          <RedoIcon />
        </button>
      </div>
    </div>
    <div class="viewMode">
      <SegmentedControl
        :options="[
          { label: 'Edit', value: 'edit' },
          { label: 'Preview', value: 'preview' },
        ]"
        :value="viewMode.mode"
        name="viewMode"
        :onChange="(value: string) => viewMode.setViewMode(value)"
        size="sm"
        :buttonStyle="{ minWidth: '75px' }"
      />
    </div>

    <div class="ctaWrapper">
      <button class="cta" @click="handleExport()" :disabled="!exporting">
        <span class="ctaText">Export</span>
        <span class="spinning" v-if="exporting.isExporting">
          <LoadingSpinnerIcon />
        </span>
        <DownloadIcon v-if="!exporting.isExporting" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.topBar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 1rem;
}

.undoRedo {
  display: flex;
  min-width: 44px;
  flex-basis: 100%;
  gap: 0.5rem;
}

.undoRedoButton:hover,
.undoRedoButton:focus {
  color: #957aff;
}

.undoRedoButton--disabled:hover,
.undoRedoButton--disabled:focus {
  color: #000;
  cursor: not-allowed;
}

.undoRedoButton--disabled {
  opacity: 0.5;
}

.ctaWrapper {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
}

.cta {
  display: flex;
  min-width: 44px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 2px 6px 2px 8px;
  background: #471aff;
  border-radius: 8px;
  box-shadow: 0px 0px 2px rgba(22, 22, 23, 0.25),
    0px 0px 0px -2px rgba(22, 22, 23, 0.12),
    0px 0px 0px -2px rgba(22, 22, 23, 0.12),
    0px 0px 0px -2px rgba(22, 22, 23, 0.12);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  gap: 0.5rem;
}

.ctaText {
  display: none;
}

@media only screen and (min-width: 900px) {
  .ctaText {
    display: flex;
  }
}

.cta:hover,
.cta:focus {
  background: #957aff;
}

.spinning {
  animation: spinner 1s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
../../states/customEngineState
