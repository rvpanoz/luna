import React from 'react';

const MainHeader = (props) => {
  return (
    <div className="main-heading">
      <div className="main-title">
        <ol className="breadcrumb">
          <li className="active">{props.title}</li>
        </ol>
      </div>
    </div>
  )
}

export default MainHeader;
