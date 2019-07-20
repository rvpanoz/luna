/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { runAudit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';

import styles from '../styles/summary';

const Summary = ({ classes, data }) => "summary"

export default withStyles(styles)(Summary)