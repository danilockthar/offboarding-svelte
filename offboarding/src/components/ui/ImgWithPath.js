import React from 'react';
import { useGlobalState } from "../../context/GlobalStateContext";

const ImgWithPath = ({ src, ...props }) => {
  const { globalState } = useGlobalState();
  const { configurationManager } = globalState;

  return <img src={`/${configurationManager.tenant}/${src}`} {...props} />;
};

export default ImgWithPath;
