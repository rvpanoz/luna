import React, { useRef } from 'react';

const AppDash = () => {
  const actionsListRef = useRef<HTMLDivElement>(null);

  const openSettings = () => {
    let isHidden = false;

    if (actionsListRef && actionsListRef.current) {
      isHidden = actionsListRef.current.classList.contains('invisible');

      if (!isHidden) {
        actionsListRef.current.classList.add('invisible');
      } else {
        actionsListRef.current.classList.remove('invisible');
      }
    }
  };

  return (

    <div className="h-40 lg:h-20 w-full flex flex-wrap">
      <nav id="header-left" className="w-full lg:max-w-sm flex items-center border-b-1 border-gray-300 order-2 lg:order-1">
        <div className="flex flex-row px-2 w-full text-lg tracking-wide">
          <div key="load">
            <button className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase px-6 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }}>
              <i className="fas fa-download"></i> Load
</button>
          </div>
        </div>
      </nav>
      <nav id="header-right" className="bg-gray-100 w-auto flex-1 border-b-1 border-gray-300 order-1 lg:order-2">
        <div className="flex h-full justify-between items-center">
          <div className="relative w-2/3 max-w-3xl px-6">
            <div className="absolute h-10 mt-1 left-0 top-0 flex items-center pl-10">
              <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
            <input id="search-toggle" type="search" placeholder="search" className="block w-full bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3" />
          </div>
          <div className="flex relative inline-block pr-6">
            <div className="relative text-sm">
              <button onClick={openSettings} className="flex items-center focus:outline-none mr-3">
                <i className="fa fa-cog text-indigo-700" />
              </button>
              <div ref={actionsListRef} className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                <ul className="list-reset">
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline">Action dsfds1</a></li>
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline">Action 2</a></li>
                  <li>
                    <hr className="border-t mx-2 border-gray-400" />
                  </li>
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline">Action 3</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppDash;
