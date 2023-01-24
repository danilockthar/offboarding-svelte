import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import __ from "src/i18n";
import ImgWithPath from "src/components/ui/ImgWithPath";
import { useRouter } from "next/router";
import ModalInnerHtml from "src/components/ui/ModalInnerHtml";
import useUnsubscribe from "../services/useUnsubscribe";
import MainLoader from "src/components/ui/MainLoader";
import { useNavigation } from "@geopagos/react-oz-wizard";
import "typeface-roboto";

const Success = () => {
  const fx = useStyles();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [canOperate, setCanOperate] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  const isOriginDashboard = router?.query?.origin === "dashboard";
  const { unsubscribe, isLoading, error, data, isSuccess, isError } =
    useUnsubscribe();
  const { goStep } = useNavigation();

  const onChangeCheckbox = ({ target: { checked } }) => {
    setIsChecked(checked);
  };

  const handleModal = () => {
    setCanOperate(true);
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    if (error && !isSuccess) {
      setCanOperate(false);
    }
    if (isSuccess) goStep("UnsubscribeRequest");
  }, [error, isSuccess]);

  return (
    <div className={fx.ROOT}>
      <ModalInnerHtml
        showIcon={false}
        isOpen={isModalOpen}
        radius={6}
        handleClose={() => setIsModalOpen(false)}
      >
        {isLoading && <MainLoader isLoading={isLoading} />}
        {canOperate ? (
          <>
            <div className="modal-header">
              <h3> {__("common.areYouSure")} </h3>
              <ImgWithPath
                className="icon-close"
                src="icons/cross.svg"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <p> {__("common.disclaimer")}</p>
            <div className="modal-button-wrapper">
              <button
                className="delete-account-btn"
                onClick={() => unsubscribe()}
              >
                {" "}
                {__("common.deleteAccount")}{" "}
              </button>
              <button
                className="goback-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar{" "}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h3> {__("common.cannotprocess")} </h3>
              <ImgWithPath
                className="icon-close"
                src="icons/cross.svg"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <p>
              {" "}
              En estos momentos no podemos procesar tu solicitud de baja de
              cuenta. Intentalo más tarde o comunicate con nosotros al{" "}
              <a href="tel:0810-345-4222" className={fx.BOLD_VIUMI}>
                0810-345-4222
              </a>
              .
            </p>
            <div className="modal-button-wrapper">
              <button
                className="delete-account-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Intentarlo más tarde
              </button>
            </div>
          </>
        )}
      </ModalInnerHtml>
      <a href={"https://exitwebview"} className="back-button-arrow">
        <ImgWithPath src={"assets/arrow.svg"} />
      </a>
      <Typography variant="h1" className={"title"}>
        {" "}
        {__("serviceUnavailable.title")}{" "}
      </Typography>
      <ul>
        <li>{__("common.firstLiItem")}</li>
        <li>{__("common.secondLiItem")}</li>
      </ul>
      <p className="info_viumi">
        {" "}
        Recordá que con viüMi tenés múltiples beneficios. Conoce más en{" "}
        <a
          href="https://viumi.com.ar"
          target="__blank"
          className={fx.BOLD_VIUMI}
        >
          www.viumi.com.ar
        </a>
      </p>
      <p className="info_viumi">
        ¿Tenés alguna duda o inconveniente? Podemos ayudarte. Llamanos al{" "}
        <a href="tel:0810-345-4222" className={fx.BOLD_VIUMI}>
          0810-345-4222
        </a>{" "}
        o envianos un e-mail a{" "}
        <a href="mailto:consultas@viumi.com.ar" className={fx.BOLD_VIUMI}>
          consultas@viumi.com.ar
        </a>
      </p>
      <div className="checkbox-wrapper">
        <input
          className="checkbox-input"
          type="checkbox"
          onChange={(e) => onChangeCheckbox(e)}
        />
        <p> Estoy de acuerdo</p>
      </div>
      <div className="button-wrapper">
        <button
          className="delete-account-btn"
          disabled={!isChecked}
          onClick={handleModal}
          style={{ background: !isChecked && "#A8A8A8" }}
        >
          {" "}
          {__("common.deleteAccount")}{" "}
        </button>
        <a
          href={
            isOriginDashboard ? "https://dashboard" : "https://gobackajustes"
          }
          className={"goback-button"}
        >
          {__("common.stayAsClient")}
        </a>
      </div>
    </div>
  );
};

export default Success;

const useStyles = makeStyles((theme) => ({
  ROOT: {
    fontFamily: "Roboto",
    display: "grid",
    gridAutoRows: "min-content",
    rowGap: "1rem",
    height: "100%",
    padding: "2rem",
    [theme.breakpoints.down("xs")]: {
      /* MOBILE VIEW */ minHeight: "100vh",
      padding: "0rem 1rem 1rem 1rem",
    },
    "& .title": {
      fontFamily: "Roboto",
      fontSize: 24,
      [theme.breakpoints.down("xs")]: {
        textAlign: "left",
      },
      textAlign: "center",
    },
    "& ul": {
      margin: 0,
    },
    "& li": {
      fontSize: 16,
      color: "#2b2b2be3",
      margin: "1.5rem 0",
    },
    "& .info_viumi": {
      margin: 0,
    },
    "& .goback-button": {
      background: "none",
      textAlign: "center",
      color: "#4527A0",
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      margin: "1rem 0 0 0",
      border: "none",
      cursor: "pointer",
    },
    "& .back-button-arrow": {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .button-wrapper": {
      justifySelf: "center",
      width: "32%",
      display: "grid",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    "& .delete-account-btn": {
      background: theme.palette.primary.main,
      borderRadius: "24px",
      transition: "0.3s",
      fontSize: 16,
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
    },
    "& .checkbox-wrapper": {
      margin: "1rem 0",
      display: "grid",
      gridTemplateColumns: "25px 1fr",
      gridColumnGap: "5px",
      '& input[type="checkbox"]:checked': {
        accentColor: theme.palette.primary.main,
      },
    },
    "& .modal-button-wrapper": {
      borderTop: "1px solid #F0F0F0",
      padding: "1rem 0 1rem 0",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "baseline",
      gap: "8px",
      [theme.breakpoints.down("xs")]: {
        display: "grid !important",
      },
    },
    "& .modal-header": {
      display: "grid",
      gridTemplateColumns: "1fr 24px",
      "& .icon-close": {
        justifySelf: "end",
        cursor: "pointer",
        alignSelf: "center",
      },
    },
  },
  BOLD_VIUMI: {
    textDecoration: "none",
    fontWeight: 600,
    color: "#4527a0",
  },
}));
