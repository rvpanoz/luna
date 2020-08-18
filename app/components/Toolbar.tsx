import React from 'react';
import { SyncIcon, FilterIcon, ProjectIcon, TrashIcon, ArrowDownIcon } from '@primer/octicons-react'

type ToolbarProps = {
  selected: [],
  switchMode: (mode: string, directory: string | null) => void,
  reload: () => void
}

const Toolbar = (props: ToolbarProps) => {
  const { reload, switchMode, selected } = props;

  const renderActions = () => {
    return <div className="flex items-center justify-between flex-wrap">
      <div className="mr-2">
        <a onClick={() => { }} href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <ArrowDownIcon />
        </a>
      </div>
      <div className="mr-2">
        <a onClick={() => { }} href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <TrashIcon />
        </a>
      </div>
    </div>
  }

  const renderItems = () => {
    return <div className="flex items-center justify-between flex-wrap">
      <div className="mr-2">
        <a onClick={() => reload()} href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <SyncIcon />
        </a>
      </div>
      <div className="mr-2">
        <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <FilterIcon />
        </a>
      </div>
      <div>
        <a onClick={() => switchMode('global', null)} href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-600 border-pink hover:border-transparent hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">
          <ProjectIcon />
        </a>
      </div>
    </div>
  }

  return (
    <nav className="flex justify-between bg-gray-100 p-2">
      <div className="mr-2">
        <h3 className="text-gray-600 text-bold">
          Packages&nbsp;{selected.length ? `(${selected.length})` : null}
        </h3>
      </div>
      {selected.length ? renderActions() : renderItems()}
    </nav>
  )
}

export default Toolbar;
