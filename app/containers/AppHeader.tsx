import React from 'react';

const AppHeader = () => {

  return (
    <div className="flex bg-gray-200">
      <div className="flex-initial text-gray-700 text-center px-4 py-2 m-2">
        <h1 className="mt0 mb4 tc fw6 f3 gray2">
          <a href="#" onClick={() => { }}>
            <i className="fab fa-font-awesome-alt fa-1x"></i>
            <span className="sr-only">Load</span>
          </a>
        </h1>
      </div>
      <div className="flex-initial text-gray-700 text-center px-4 py-2 m-2">
        <h1 className="mt0 mb4 tc fw6 f3 gray2">
          <a href="#" onClick={() => { }}>
            <i className="fab fa-font-awesome-alt fa-1x"></i>
            <span className="sr-only">Load</span>
          </a>
        </h1>
      </div>
    </div>
  );
}

export default AppHeader;
