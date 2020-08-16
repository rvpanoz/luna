import React from 'react';

const AppHeader = () => {
  return (
    <div className="flex flex-row flex-1 justify-between p-6">
      <div className="relative w-2/3 px-4">
        <div className="absolute h-10 mt-1 left-0 top-0 flex items-center pl-10">
          <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </div>

        <input id="search-toggle" type="search" placeholder="search" className="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3" />
      </div>
    </div>
  )
}

export default AppHeader;
