import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImgWithPath from "../../../../components/ui/ImgWithPath";
import __ from "../../../../i18n";
import ModalInnerHtml from "../../../../components/ui/ModalInnerHtml";
import { useGlobalState } from "../../../../context/GlobalStateContext";
import "typeface-roboto";

interface Props {
  balance?: string;
}

const ImportantInfo: React.FC<Props> = ({ balance }) => {
  const fx = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { globalState } = useGlobalState();
  const {
    data: { status_code },
    data: { message },
  } = globalState;
  return (
    <div className={fx.ROOT}>
      <ModalInnerHtml
        showIcon={false}
        children={
          '<h3 style="font-size:22px;margin-bottom:5px"><strong>&iquest;C&oacute;mo retiro mi dinero?</strong></h3><p><strong><span style="color: #4527a0;">Por transferencia</span></strong>: Pod&eacute;s retirar tu dinero disponible desde tu app vi&uuml;Mi por transferencias a otras cuentas bancarias o virtuales en la secci&oacute;n Cuenta &gt; Retirar.</p><p><strong><span style="color: #4527a0;">Por cajero autom&aacute;tico</span></strong>: Pod&eacute;s realizar extracciones en cajeros autom&aacute;ticos Banelco o Link con tu tarjeta prepaga vi&uuml;Mi</p>'
        }
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        radius={6}
      />
      <ImgWithPath src="icons/icon_alert.png" />
      {status_code === "HAS_BALANCE" && (
        <div className="balance_wrapper">
          <p className="balance_text">
            Tenés{" "}
            <b>
              <span className="balance-amount">${message}</span>
            </b>{" "}
            de saldo disponible. Para eliminar tu cuenta viüMi, primero tenés
            que retirar tu dinero.
          </p>
          <p className={fx.MODAL_TITLE} onClick={() => setIsModalOpen(true)}>
            {" "}
            {__("common.withdraw")}{" "}
          </p>
        </div>
      )}
      {status_code === "PENDING_DEPOSIT" && (
        <div className="balance_wrapper">
          <p className="balance_text">
            Tu cuenta tiene un deposito pendiente para la fecha Tenés saldo a
            liberar, estará disponible en tu billetera virtual el{" "}
            <span>
              <b>{message}</b>
            </span>
            . Para eliminar tu cuenta, primero tenés que retirar tu dinero.
          </p>
          <p className={fx.MODAL_TITLE} onClick={() => setIsModalOpen(true)}>
            {" "}
            {__("common.withdraw")}{" "}
          </p>
        </div>
      )}
      {status_code === "ERROR" && (
        <div className="balance_wrapper">
          <p className="balance_text">{message}</p>
        </div>
      )}
      {!status_code && (
        <div className="balance_wrapper">
          <p className="balance_text">
            En este momento no podemos enviar tu solicitud. Intentalo más tarde
            o comunicate con nosotros al{" "}
            <a href="tel:0810-345-4222" className={fx.MODAL_TITLE}>
              {" "}
              0810-345-4222.
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportantInfo;

const useStyles = makeStyles((theme) => ({
  ROOT: {
    fontFamily: "Roboto",
    margin: "1rem 0 0 0",
    background: "#f6f4fa",
    display: "grid",
    height: "fit-content",
    padding: "1rem",
    gridTemplateColumns: "35px 1fr",
    "& .balance_wrapper": {
      display: "grid",
      rowGap: "1rem",
    },
    "& .balance_text": {
      color: "#2b2b2be3",
      fontSize: "16px",
      fontWeight: 400,
      margin: 0,
      "& .balance-amount": {
        color: "#2B2B2B",
      },
    },
  },
  MODAL_TITLE: {
    [theme.breakpoints.down("xs")]: {
      cursor: "pointer",
      color: "#4527a0",
      fontWeight: 600,
    },
    textDecoration: "none",
    cursor: "pointer",
    color: "#4527a0",
    fontWeight: 600,
    margin: 0,
  },
}));
