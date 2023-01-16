import React from "react";
import { useNavigation } from '@geopagos/react-oz-wizard';
import { useGlobalState } from "src/context/GlobalStateContext";

const useSetCurrentStep = () => {
    const { setGlobalState } = useGlobalState();
    const { currentStepKey } = useNavigation();
    React.useEffect(() => {
        setGlobalState({
            stepper: currentStepKey
        })
    }, []);

}

export default useSetCurrentStep;