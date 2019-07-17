import { grayColor } from "styles/variables";

const style = () => ({
    cardFooter: {
        padding: "0",
        paddingTop: "10px",
        margin: "0 15px 10px",
        borderRadius: "0",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        backgroundColor: "transparent",
        border: "0"
    },
    cardFooterProfile: {
        marginTop: "-15px"
    },
    cardFooterPlain: {
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor: "transparent"
    },
    cardFooterStats: {
        borderTop: `1px solid ${grayColor}`,
        marginTop: "20px",
        "& svg": {
            position: "relative",
            top: "4px",
            marginRight: "3px",
            marginLeft: "3px",
            width: "16px",
            height: "16px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            fontSize: "16px",
            position: "relative",
            top: "4px",
            marginRight: "3px",
            marginLeft: "3px"
        }
    },
    cardFooterChart: {
        borderTop: `1px solid ${grayColor}`
    }
});

export default style;
