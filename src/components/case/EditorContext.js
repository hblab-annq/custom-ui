import CreativeEngine from "@cesdk/engine";
import { CustomEngine } from "./CustomEngine";
import { caseAssetPath } from "../../utils/utils";
import { useCustomEngine } from "./states/customEngineState";
import { useIsLoad } from "./states/isLoaded";

const customEngineState = useCustomEngine();
const isLoad = useIsLoad();

const loadEditor = () => {
  let newCustomEngine;
  const loadEditor = async () => {
    if (!canvas) {
      return;
    }
    const config = {
      featureFlags: {
        preventScrolling: true,
      },
    };

    const creativeEngine = await CreativeEngine.init(
      config,
      document.getElementById("cesdk_canvas")
    );
    creativeEngine.editor.setSettingBool("page/title/show", false);
    newCustomEngine = new CustomEngine(creativeEngine);
    customEngineState.setCustomEngine(newCustomEngine);
    creativeEngine.editor.onStateChanged(() =>
      editorUpdateCallbackRef.current()
    );
    creativeEngine.event.subscribe([], (events) =>
      engineEventCallbackRef.current(events)
    );
    await newCustomEngine.loadScene(caseAssetPath(`/kiosk.scene`));
    isLoad.setIsLoad(true);
  };
  loadEditor();

  // return () => {
  if (newCustomEngine) {
    newCustomEngine.dispose();
  } else {
    customEngineState.setCustomEngine(null);
    isLoad.setIsLoad(false);
  }
  // };
};

export default loadEditor;
