import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigation } from "@geopagos/react-oz-wizard";
import __ from "src/i18n";
import { useGlobalState } from "src/context/GlobalStateContext";
import { useRouter } from "next/router";
import MainLoader from "src/components/ui/MainLoader";
import useCanUnsubscribe from "../services/useCanUnsubscribe";
import useGetStatus from "../services/useGetStatus";

const statusPage = {
  OK: "Success",
  HAS_BALANCE: "MoneyAvailable",
  PENDING_DEPOSIT: "MoneyAvailable",
  ERROR: "ServiceUnavailable",
};

const Email = () => {
  const { setGlobalState } = useGlobalState();
  const sx = useStyles();
  const router = useRouter();
  const { goStep } = useNavigation();
  const { data, isLoading, error } = useGetStatus(router?.query?.token || null);
  // const { canUnsubscribe, isLoading } = useCanUnsubscribe();

  // React.useEffect(() => {
  //   if (router?.query?.token) {
  //     canUnsubscribe(router?.query?.token, {
  //       onError: (error: any) => {
  //         if (error) goStep("ServiceUnavailable");
  //       },
  //       onSuccess: (data) => {
  //         if (data?.data) {
  //           setGlobalState({
  //             status_code: data?.data?.status_code,
  //             message: data?.data?.message,
  //           });
  //           goStep(statusPage[data?.data?.status_code]);
  //         }
  //       },
  //     });
  //   }
  // }, [router?.query?.token]);

  React.useEffect(() => {
    if (data && !error) {
      const isStatusValid = data?.status === 200;
      setGlobalState({ data: data?.data });
      isStatusValid && goStep(statusPage[data?.data?.status_code]);
      return;
    }
    if (error?.response?.status === 400 || error?.response?.status === 500) {
      goStep("ServiceUnavailable");
    }
  }, [data, error]);

  return (
    <div className={sx.ROOT}>
      {isLoading && <MainLoader isLoading={isLoading} />}
    </div>
  );
};

export default Email;

const useStyles = makeStyles((theme) => ({
  ROOT: {
    display: "grid",
    height: "100%",
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      /* MOBILE VIEW */ minHeight: "100vh",
    },
    "& form": {
      display: "grid",
      gridTemplateRows: "auto max-content",
    },
  },
  HEADER: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    margin: "0 0 2rem 0",
    [theme.breakpoints.down("xs")]: {
      /* MOBILE VIEW */ margin: "1rem 0 2rem 0",
    },
  },
  CENTER: {
    justifySelf: "center",
  },
  TOPFIVE: {
    marginTop: 5,
  },
  BLOCKTOP: {
    display: "grid",
    gridAutoRows: "max-content",
  },
  BLOCKBOTTOM: {
    margin: "1rem 0",
  },
}));
