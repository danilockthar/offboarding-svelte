import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import __ from "../../../i18n";
import ImportantInfo from "./ui/ImportantInfo";
import ImgWithPath from "../../../components/ui/ImgWithPath";
import router, { useRouter } from "next/router";

const ServiceUnavailable = () => {
  const fx = useStyles();
  const router = useRouter();

  const isOriginDashboard = router?.query?.origin === "dashboard";

  return (
    <div className={fx.ROOT}>
      <a href={"https://exitwebview"} className="back-button-arrow">
        <ImgWithPath src={"assets/arrow.svg"} />
      </a>
      <Typography variant="h1" className={"title"}>
        {" "}
        {__("serviceUnavailable.title")}{" "}
      </Typography>
      <ImportantInfo />
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
      <a
        href={isOriginDashboard ? "https://dashboard" : "https://gobackajustes"}
        className={"goback-button"}
      >
        {__("common.goBack")}
      </a>
    </div>
  );
};

export default ServiceUnavailable;

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
  },
  BOLD_VIUMI: {
    textDecoration: "none",
    fontWeight: 600,
    color: "#4527a0",
  },
}));
