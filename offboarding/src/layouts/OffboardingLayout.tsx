import React from "react";
import classNames from "classnames";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import isFunction from "lodash/isFunction";
import get from "lodash/get";
import ImgWithPath from "../components/ui/ImgWithPath";
import useTimedLoading from "../helpers/hooks/useTimedLoading";
import { useGlobalState } from "../context/GlobalStateContext";
import __ from "../i18n";

const logoPath = "assets/logo.svg";

interface Props {
	children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	const sx = useStyles();
	const { globalState } = useGlobalState();
	const step = get(globalState, "stepper");
	const theme = useTheme();
	const { isLoading } = useTimedLoading(250);
	const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

	/*  if (isLoading) {
    return <MainLoader isLoading={isLoading} />;
  } */

	const onStepChange = () => {
		console.log("por aca pasa");
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	/*   const Header = (
      <div className={classes.HeaderGrid}>
        <ImgWithPath src={logoPath} className="logo" />
        <Stepper />
      </div>
    ); */

	return (
		<div className={classNames(sx.WRAPPER)}>
			<div className={sx.HEADER}>
				<ImgWithPath src="icons/logo.png" className="header-logo" />
				<p className={sx.STEPPER}> Baja de cuenta viüMi </p>
			</div>
			<Paper className={sx.PAPER}>{children}</Paper>
		</div>
	);
};

export default Layout;

const useStyles = makeStyles((theme) => ({
	"@global": {
		form: {
			width: "100%",
		},
	},
	WRAPPER: {
		minHeight: "100vh",
		display: "grid",
		flexDirection: "column",
		justifyContent: "center",
		position: "relative",
		[theme.breakpoints.between(320, 560)]: {
			minHeight: "100vh",
			background: "white",
		},
		[theme.breakpoints.between(768, 1024)]: {
			background: "white",
		},
	},
	PAPER: {
		/* DESKTOP VIEW */ height: "fit-content",
		minWidth: "70vw",
		maxWidth: 640,
		top: 40,
		alignSelf: "center",
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 7,
		boxShadow: "0px 3px 8px 0px #0044813D",
		[theme.breakpoints.down("xs")]: {
			/* MOBILE VIEW */ borderRadius: 0,
			boxShadow: "none",
			minHeight: "100vh",
			height: "fit-content",
			width: "100vw",
		},
		[theme.breakpoints.between(768, 1024)]: {
			/* TABLET VIEW */ boxShadow: "none",
			display: "block",
		},
	},
	HEADER: {
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
		position: "absolute",
		background: theme.palette.primary.main,
		width: "100%",
		minHeight: "30vh",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		padding: "1rem 2rem",
		"& .header-logo": {
			userSelect: "none",
		},
	},
	STEPPER: {
		color: "white",
		fontFamily: "Roboto",
		justifySelf: "end",
		userSelect: "none",
	},
}));
