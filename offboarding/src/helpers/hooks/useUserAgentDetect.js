import React from 'react';

function useUserAgentDetect() {
  const [isAndroid, setIsAndroid] = React.useState(false);
  const [isIos, setIsIos] = React.useState(false);

  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
    setIsIos(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
  }, []);

  return {
    isAndroid,
    isIos,
  };
}
export default useUserAgentDetect;
