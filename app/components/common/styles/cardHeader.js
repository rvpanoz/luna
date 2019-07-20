import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    whiteColor
} from "styles/variables";

const style = () => ({
    cardHeader: {
        padding: "0.75rem 1.25rem",
        marginBottom: 0,
        borderBottom: "none",
        background: "transparent",
        zIndex: "3 !important",
        "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            margin: "0 15px",
            padding: "0",
            position: "relative",
            color: whiteColor
        },
        "&:first-child": {
            borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
        },
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            "&:not($cardHeaderIcon)": {
                borderRadius: 3,
                marginTop: -20,
                padding: 15
            }
        },
        "&$cardHeaderStats svg": {
            fontSize: 36,
            lineHeight: 56,
            textAlign: "center",
            width: 36,
            height: 36,
            margin: "10px 10px 4px"
        },
        "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
            fontSize: 36,
            lineHeight: 56,
            width: 56,
            height: 56,
            textAlign: "center",
            overflow: "unset",
            marginBottom: "1px"
        },
        "&$cardHeaderStats$cardHeaderIcon": {
            textAlign: "right"
        }
    },
    cardHeaderPlain: {
        marginLeft: "0px !important",
        marginRight: "0px !important"
    },
    cardHeaderStats: {
        "& $cardHeaderIcon": {
            textAlign: "right"
        },
        "& h1,& h2,& h3,& h4,& h5,& h6": {
            margin: "0 !important"
        }
    },
    cardHeaderIcon: {
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            background: "transparent",
            boxShadow: "none"
        },
        "& i,& .material-icons": {
            width: 33,
            height: 33,
            textAlign: "center",
            lineHeight: 33
        },
        "& svg": {
            width: 24,
            height: 24,
            textAlign: "center",
            lineHeight: 33,
            margin: "5px 4px 0px"
        }
    },
    warningCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            ...warningCardHeader
        }
    },
    successCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            ...successCardHeader
        }
    },
    dangerCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            ...dangerCardHeader
        }
    },
    infoCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            ...infoCardHeader
        }
    },
    primaryCardHeader: {
        color: whiteColor,
        "&:not($cardHeaderIcon)": {
            ...primaryCardHeader
        }
    }
});

export default style;

