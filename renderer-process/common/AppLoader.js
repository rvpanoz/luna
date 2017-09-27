/**
 * AppLoader
 */

import React from 'react';

const Loader = (props) => {
  let loading = props.loading;
  return (
    (loading) ?
    <div id="loader">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
    : props.children
  )
}

export default Loader;
