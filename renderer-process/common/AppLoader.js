import React from 'react';

/**
 * [Loader description]
 * @param {[type]} props [description]
 */
const Loader = (props) => {
  let loading = props.loading;
  return (
    (loading) ?
    <div id="loader">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
    : props.children
  )
}

export default Loader;
