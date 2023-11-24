<script setup lang="ts">
// defineProps<{
//   msg: string;
import CreativeEngine from "@cesdk/engine";
import { onMounted } from "vue";
import { useIsLoad } from "../../states/isLoaded";
import { useCanvas } from "../../states/canvas";
import { useViewMode } from "../../states/viewMode";
import { CustomEngine } from "../../CustomEngine";
import { useCustomEngine } from "../../states/customEngineState";
import { caseAssetPath } from "../../../../utils/utils";

// }>();
const isLoad = useIsLoad();
const canvas = useCanvas();
const viewMode = useViewMode();
const customEngineState = useCustomEngine();

// let wrapperRef = ref(null);

const loadEditor = async () => {
  let newCustomEngine: CustomEngine;
  if (!canvas) {
    return;
  }
  const config = {
    baseURL: "https://cdn.img.ly/packages/imgly/cesdk-engine/1.18.0/assets",
  };

  CreativeEngine.init(config).then(async (engine) => {
    document.getElementById("cesdk_canvas")?.append(engine.element);
    await engine.addDefaultAssetSources();
    await engine.scene.loadFromURL(
      "http://localhost:5173/cases/custom-ui/kiosk.scene"
    );
    engine.block.findByType("//ly.img.ubq/text").forEach((id) => {
      engine.block.setOpacity(id, 0.5);
    });

    // engine.element.remove();
    // engine.dispose();
  });
  // creativeEngine.editor.setSettingBool("page/title/show", false);
  // newCustomEngine = new CustomEngine(creativeEngine);
  // customEngineState.setCustomEngine(newCustomEngine);
  // await newCustomEngine.loadScene(caseAssetPath(`/kiosk.scene`));
  // isLoad.setIsLoad(true);

  // // return () => {
  // if (newCustomEngine) {
  //   newCustomEngine.dispose();
  // } else {
  //   customEngineState.setCustomEngine(null);
  //   isLoad.setIsLoad(false);
  // }
  // };
};

onMounted(async () => {
  const canvas = document.getElementById("cesdk_canvas")!;
  const updatePixelRatio = () => {
    let dpr = window.devicePixelRatio;
    canvas.style.width = `${dpr * canvas.getBoundingClientRect().width}`;
    canvas.style.height = `${dpr * canvas.getBoundingClientRect().height}`;
    matchMedia(`(resolution: ${dpr}dppx)`).addEventListener(
      "change",
      updatePixelRatio,
      { once: true }
    );
  };
  updatePixelRatio();

  await loadEditor();
});

// console.log(wrapperRef);

// const resizeCanvas = (wrapperNode, canvasNode) => {
//   if (!wrapperNode || !canvasNode) return;
//   const { width, height } = wrapperNode.getBoundingClientRect();
//   canvasNode.width = width * window.devicePixelRatio;
//   canvasNode.height = height * window.devicePixelRatio;
//   canvasNode.style.width = `${width}px`;
//   canvasNode.style.height = `${height}px`;
//   canvasNode.style.display = `block`;
// };

// onMounted(() => {
//   console.log(wrapperRef);
//   if (!canvas || !wrapperRef) {
//     return;
//   } else {
//     const o = new ResizeObserver(() => {
//       resizeCanvas(wrapperRef, canvas);
//     });
//     o.observe(wrapperRef);
//   }
// });
</script>

<template>
  <div class="greetings">
    <h1 class="green">CESDKCanvas</h1>
    <h3>CESDKCanvas</h3>
    -------- CESDKCanvas Start ----------
    <div id="cesdk" class="wrapper">
      <div v-if="viewMode.mode === 'preview'" class="previewBlocker"></div>
      <!-- {/* Workaround to disable interaction on the canvas */} -->
      <canvas id="cesdk_canvas" class="canvas">abc</canvas>
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
../../states/customEngineState.js
