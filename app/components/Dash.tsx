import React from 'react';

type BoxProps = {
  title: string,
  subtitle: string,
  total: number,
  colorClass?: string,
  faClass?: string,
  bgColor?: string
}

const Box = (props: BoxProps) => {
  const { title, subtitle, total, faClass, bgColor } = props;

  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                {title}
              </h5>
              <span className="font-bold text-xl text-gray-800">
                {total}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${bgColor}`}>
                <i className={`fa ${faClass}`}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <span className="whitespace-no-wrap">
              {subtitle}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const AppDash = () => {
  return (
    <div className="relative bg-gray-200">
      <div className="relative md:pt-10 pb-10 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Box title="Dependencies" subtitle="dependencies" total={101} faClass="fa-list" bgColor="bg-red-500" />
              <Box title="Outdated" subtitle="outdated packages" total={101} faClass="fa-list" bgColor="bg-orange-400" />
              <Box title="Dev dependencies" subtitle="dev dependencies" total={101} faClass="fa-list" bgColor="bg-teal-500" />
              <Box title="Optional" subtitle="optional dependencies" total={101} faClass="fa-list" bgColor="bg-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppDash;
