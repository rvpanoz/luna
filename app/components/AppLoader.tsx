import React from 'react';

type AppLoaderProps = {
  children: React.ReactNode,
  loading: boolean,
  half?: boolean,
  message?: string,
}

const AppLoader = (props: AppLoaderProps) => {
  const { children, loading, message, half } = props;

  return <>
    {loading ? <div className={`flex flex-col w-full ${!half ? 'h-screen' : ''} justify-center items-center`}>
      <div className="loader">
        <span>
          <span></span>
        </span>
      </div>
      <div className="text-gray-400 pt-2">{message}</div>
    </div> : children
    }
  </>
}

export default AppLoader
