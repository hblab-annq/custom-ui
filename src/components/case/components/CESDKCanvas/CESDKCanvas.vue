<script setup lang="ts">
// defineProps<{
//   msg: string;

import { onMounted } from "vue";
import { useIsLoad } from "../../states/isLoaded";
import { useCanvas } from "../../states/canvas";
import { useViewMode } from "../../states/viewMode";

// }>();
const isLoad = useIsLoad();
const canvas = useCanvas();
const viewMode = useViewMode();

let wrapperRef = null;

const resizeCanvas = (wrapperNode, canvasNode) => {
  if (!wrapperNode || !canvasNode) return;
  const { width, height } = wrapperNode.getBoundingClientRect();
  canvasNode.width = width * window.devicePixelRatio;
  canvasNode.height = height * window.devicePixelRatio;
  canvasNode.style.width = `${width}px`;
  canvasNode.style.height = `${height}px`;
  canvasNode.style.display = `block`;
};

onMounted(() => {
  if (!canvas || !wrapperRef) {
    return;
  } else {
    const o = new ResizeObserver(([entry]) => {
      resizeCanvas(wrapperRef, canvas);
    });
    o.observe(wrapperRef);
  }
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">CESDKCanvas</h1>
    <h3>CESDKCanvas</h3>
    -------- CESDKCanvas Start ----------
    <div id="cesdk" class="wrapper" ref="{wrapperRef}">
      <div
        v-if="viewMode.mode === 'preview'"
        className="{classes.previewBlocker}"
      ></div>
      <!-- {/* Workaround to disable interaction on the canvas */} -->
      <canvas id="canvas" ref="{setCanvas}" class="canvas"></canvas>
    </div>
    -------- CESDKCanvas End ----------
    <h1></h1>
    <input v-model="isLoad.isLoad" />
  </div>
</template>

<style scoped>
.previewBlocker {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 80px;
  left: 0;
}

.canvas {
  /* For Safari */
  overflow: hidden;
  flex: 1;
}

.wrapper {
  display: flex;
  overflow: hidden;
  width: 100%;
  min-height: 400px;
  flex-grow: 1;
}

@media only screen and (min-width: 650px) {
  .canvas {
    border-radius: 20px;
  }

  .wrapper {
    border-radius: 20px;
  }
}
</style>
