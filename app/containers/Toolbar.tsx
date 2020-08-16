import React from 'react';

type ToolbarProps = {

}

const Toolbar = (props: ToolbarProps) => {
  return (
    <nav className="flex items-center justify-end flex-wrap bg-gray-100 p-2">
      <div className="mr-2">
        <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <i className="fa fa-bell" />
        </a>
      </div>
      <div className="mr-2">
        <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <i className="fa fa-filter" />
        </a>
      </div>
      <div>
        <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <i className="fa fa-list" />
        </a>
      </div>
    </nav>
  )
}

export default Toolbar;
