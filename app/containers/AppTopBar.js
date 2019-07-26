import React from 'react';
import PropTypes from 'prop-types';

import { TopBar } from 'components/views/common/';
import { useMappedState } from 'redux-react-hook';

const mapState = ({ notifications: { notifications } }) => ({
  notifications
});

const AppTopBar = ({ classes, ...props }) => {
  const {
    notifications
  } = useMappedState(mapState)

  return <TopBar notifications={notifications}></TopBar>
};

export default AppTopBar;
