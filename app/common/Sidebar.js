'use strict';

import React from 'react';
import QuickMenu from '../components/sidebar/QuickMenu';

const Sidebar = (props) => {
  return (
    <div className="sidebar" style={{display: 'none'}}>
      <QuickMenu/>
    </div>
  )
}

export default Sidebar;
