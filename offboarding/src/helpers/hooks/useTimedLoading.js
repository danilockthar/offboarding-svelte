import React from "react";

const useTimedLoading = (time) => {
  const [ isLoading, setIsLoading ] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return {
    isLoading,
  };
}

export default useTimedLoading;