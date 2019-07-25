import React from 'react';
import PropTypes from 'prop-types';

import { TopBar } from 'components/views/common/';

const mapState = ({ notifications: { notifications } }) => ({
  notifications
});

const AppTopBar = () => <TopBar></TopBar>;

export default AppTopBar;
