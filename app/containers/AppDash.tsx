import React, { useState } from 'react';

type BoxProps = {
  label: string,
  total: number,
  colorClass?: string,
  iconClass?: string
}

type TabsProps = {
  children: React.ReactNode
}

type TabProps = {
  activeTab: string,
  label: string,
  onClick: () => void
}

const Box = (props: BoxProps) => {
  return (
    <div className={`border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6 ${props.colorClass}`}>
      <div className="flex">
        <div className="flex-1">
          <h3 className="font-bold text-2xl">{props.total} <span className="text-green-500"></span></h3>
          <h5 className="font-bold text-gray-500">{props.label}</h5>
        </div>
      </div>
    </div>
  )
}

const Stats = () => {
  return (
    <div className="bg-gray-200 py-6 lg:py-0 w-full lg:max-w-sm flex flex-wrap content-start">
      <div className="w-1/2 lg:w-full">
        <Box label="Packages" total={101} iconClass="fa-list" colorClass="text-indigo-500" />
      </div>
      <div className="w-1/2 lg:w-full">
        <Box label="Outdated" total={12} iconClass="fa-chevron-down" colorClass="text-red-500" />
      </div>
      <div className="w-1/2 lg:w-full">
        <Box label="Dependencies" total={67} iconClass="fa-chevron-down" colorClass="text-green-500" />
      </div>
      <div className="w-1/2 lg:w-full">
        <Box label="Dev dependencies" total={34} iconClass="fa-chevron-down" colorClass="text-yellow-500" />
      </div>
    </div>
  )
}

const Tab = (props: TabProps) => {
  const {
    onClick,
    activeTab,
    label
  } = props;

  let className = '-mb-px mr-1 tab-list-item';

  if (activeTab === label) {
    className += ' tab-list-active';
  }

  return (
    <li className="-mb-px mr-1">
      <a onClick={onClick} className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">{label}</a>
    </li>
  );
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState('tab-1');

  const { children } = props;

  return <div className="flex flex-col">
    <ul className="flex border-a">
      {children.map((child: any) => {
        const { label } = child.props;

        return (
          <Tab
            activeTab={activeTab}
            key={label}
            label={label}
            onClick={() => setActiveTab(label)}
          />
        );
      })}
    </ul>
    <div className="tab-content">
      {children.map((child) => {
        if (child.props.label !== activeTab) return undefined;
        return child.props.children;
      })}
    </div>
  </div>
}

const AppDash = () => {
  return (
    <Tabs>
      <div label="Project">
        <Stats />
      </div>
      <div label="Actions">
        Actions
      </div>
      <div label="History">
        History
      </div>
    </Tabs>
  )
}

export default AppDash;
