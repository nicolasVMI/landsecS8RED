import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import { useStore } from "@state/store";

function GetWorldInfo() {
  const info = useThree();
  const setWorldInfo = useStore((s) => s.setWorldInfo);

  useEffect(() => {
    if (info) {
      setWorldInfo(info);
    }
  }, []);
  return null;
}

export default GetWorldInfo;
