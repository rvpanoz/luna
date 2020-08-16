import React from 'react';

const AppBar = () => {

  return (
    <ul className="flex">
      <li className="mr-6">
        <a className="text-gray-500 hover:text-gray-800" href="#">
          <i className="fa fa-download fa-lg" />Active</a>
      </li>
      <li className="mr-6">
        <a className="text-gray-500 hover:text-gray-800" href="#">Link</a>
      </li>
      <li className="mr-6">
        <a className="text-gray-500 hover:text-gray-800" href="#">Link</a>
      </li>
    </ul>
  );
}

export default AppBar;
