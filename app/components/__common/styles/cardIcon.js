import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    grayColor
} from 'styles/variables';

const style = () => ({
    cardIcon: {
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader": {
            borderRadius: 3,
            backgroundColor: grayColor,
            padding: 15,
            marginTop: -20,
            marginRight: 15,
            float: "right"
        }
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
});

export default style;
