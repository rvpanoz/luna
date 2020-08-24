import React from 'react';
import Search from './Search';
import { GearIcon } from '@primer/octicons-react';

const Header = (props) => {
  return (
    <div className="h-20 w-full flex flex-wrap">
      <div
        id="header-right"
        className="bg-gray-100 w-auto flex-1 border-b-1 border-gray-300 order-1 lg:order-2"
      >
        <div className="flex h-full justify-between items-center">
          <div className="w-64">
            <div className="flex pl-6 text-gray-600 semibold text-xl">Luna</div>
          </div>
          <div className="relative w-2/3 max-w-3xl px-6">
            <Search />
          </div>
          <div className="flex relative pr-6">
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

export default Header;
