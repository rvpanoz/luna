import React from 'react';
import { string } from 'prop-types';
import Search from './Search';
import { GearIcon } from '@primer/octicons-react';

const Header = (props) => {
  const { directory } = props;

  return (
    <div className="h-40 lg:h-20 w-full flex flex-wrap">
      <div
        id="header-right"
        className="bg-gray-100 w-auto flex-1 border-b-1 border-gray-300 order-1 lg:order-2"
      >
        <div className="flex h-full justify-between items-center">
          <div className="relative w-64 max-w-3xl px-6">
            <span className="text-gray-500 text-sm">Working directory</span>
            <br />
            <span className="text-gray-600 text-sm inline-block w-full break-all">
              {directory}
            </span>
          </div>
          <div className="relative w-2/3 max-w-3xl px-6">
            <Search />
          </div>
          <div className="flex relative inline-block pr-6">
            <div className="relative text-sm">
              <button className="flex items-center focus:outline-none mr-3">
                <GearIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  directory: string,
};

export default Header;
