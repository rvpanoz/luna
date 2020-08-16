import React from 'react';

const AppHeader = () => {
  return (
    <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

        <div className="w-1/2 pl-2 md:pl-0">
          <a className="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold" href="#">
            <i className="fas fa-sun text-orange-600 pr-3"></i> Luna
          </a>
        </div>

        <div className="w-1/2 pr-0">
          <div className="flex relative inline-block float-right">
            <div className="relative text-sm">
              <button id="userButton" className="flex items-center focus:outline-none mr-3">
                <i className="fas fa-cog fa-lg"></i>
              </button>
              <div id="userMenu" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                <ul className="list-reset">
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</a></li>
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Notifications</a></li>
                  <li>
                    <hr className="border-t mx-2 border-gray-400" />
                  </li>
                  <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>)
}

export default AppHeader;
