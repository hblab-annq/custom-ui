import CreativeEngine from "@cesdk/engine";
import { CustomEngine } from "./CustomEngine";
import { caseAssetPath } from "../../utils/utils";

let newCustomEngine;
const loadEditor = async () => {
  if (!canvas) {
    return;
  }
  const config = {
    featureFlags: {
      preventScrolling: true,
    },
    license: process.env.REACT_APP_LICENSE,
  };

  const creativeEngine = await CreativeEngine.init(config, canvas);
  creativeEngine.editor.setSettingBool("page/title/show", false);
  newCustomEngine = new CustomEngine(creativeEngine);
  setCustomEngine(newCustomEngine);
  creativeEngine.editor.onStateChanged(() => editorUpdateCallbackRef.current());
  creativeEngine.event.subscribe([], (events) =>
    engineEventCallbackRef.current(events)
  );
  await newCustomEngine.loadScene(caseAssetPath(`/kiosk.scene`));
  setIsLoaded(true);
};
loadEditor();
