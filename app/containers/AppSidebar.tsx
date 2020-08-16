import React from 'react'

const AppSidebar = () => {
  return (
    <div id="sidebar" className="h-screen w-16 menu bg-white text-white px-4 flex items-center static fixed shadow">
      <ul className="list-reset ">
        <li className="my-2 md:my-0">
          <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
            <i className="fas fa-download fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Analyze</span>
          </a>
        </li>
        <li className="my-2 md:my-0 ">
          <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
            <i className="fas fa-plus fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Create</span>
          </a>
        </li>
        <li className="my-2 md:my-0">
          <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
            <i className="fa fa-envelope fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Notifications</span>
          </a>
        </li>
        <li className="my-2 md:my-0">
          <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
            <i className="fas fa-chart-area fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Analytics</span>
          </a>
        </li>
      </ul>

    </div>
  )
}

export default AppSidebar;
