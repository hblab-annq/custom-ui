<script setup lang="ts">
import CESDKCanvas from "./components/CESDKCanvas/CESDKCanvas.vue";
import TopBarVue from "./components/TopBar/TopBar.vue";
import { useIsLoad } from "./states/isLoaded";

const isLoaded = useIsLoad();
</script>

<template>
  <div class="greetings" @click="isLoaded.setIsLoad(true)">
    <h1 v-if="!isLoaded.isLoad">LoadingSpinner</h1>
    <TopBarVue v-if="isLoaded.isLoad">TopBar</TopBarVue>
    <CESDKCanvas v-if="isLoaded" />
    <h1 v-if="isLoaded.isLoad">BottomControls</h1>
  </div>
</template>

<style scoped>
.caseWrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
}

.kioskWrapper {
  position: relative;
  display: flex;
  max-width: 100%;
  flex-grow: 1;
  /* Disabling selection as it triggers when moving blocks via touch on ios safari  */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.headline {
  color: white !important;
  text-align: center;
}

.fullHeightWrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
}

@media only screen and (min-width: 650px) {
  .kioskWrapper {
    min-height: 640px;
    background: #efefef;
    border-radius: 24px;
    box-shadow: 0px 0px 2px rgba(22, 22, 23, 0.25),
      0px 4px 6px -2px rgba(22, 22, 23, 0.12),
      0px 2px 2.5px -2px rgba(22, 22, 23, 0.12),
      0px 1px 1.75px -2px rgba(22, 22, 23, 0.12);
  }
}
</style>
