import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "../styles/cardAvatar";

const CardAvatar = ({ ...props }) => {
    const { classes, children, className, plain, profile, ...rest } = props;
    const cardAvatarClasses = classNames({
        [classes.cardAvatar]: true,
        [classes.cardAvatarProfile]: profile,
        [classes.cardAvatarPlain]: plain,
        [className]: className !== undefined
    });

    return (
        <div className={cardAvatarClasses} {...rest}>
            {children}
        </div>
    );
}

CardAvatar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    profile: PropTypes.bool,
    plain: PropTypes.bool,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(CardAvatar);
