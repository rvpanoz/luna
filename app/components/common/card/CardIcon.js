import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import styles from '../styles/cardIcon';

const CardIcon = ({ ...props }) => {
    const { classes, className, children, color, ...rest } = props;
    const cardIconClasses = cn({
        [classes.cardIcon]: true,
        [classes[`${color}CardHeader`]]: color,
        [className]: className !== undefined
    });
    return (
        <div className={cardIconClasses} {...rest}>
            {children}
        </div>
    );
}

CardIcon.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    children: PropTypes.node
};

export default withStyles(styles)(CardIcon);


