import React from 'react';

/**
 * [Loader description]
 * @param {[type]} props [description]
 */
const Loader = (props) => {
  let is_visible = props.isVisible;
  return (
    <div id="loader" className={(is_visible)
      ? 'show'
      : 'hide'}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  )
}

export default Loader;
