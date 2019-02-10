import React from 'react';
import cx from 'classnames';
import MuiCardContent from '@material-ui/core/CardContent';
import { CARD_CONTENT } from 'styles/variables';

const CardContent = ({ className, ...props }) => (
  <MuiCardContent className={cx(CARD_CONTENT.root, className)} {...props} />
);

export default CardContent;
