import React from 'react';

type AppLoaderProps = {
  childer: React.ReactNode,
  loading: boolean,
  message?: string,
}

const AppLoader = (props: AppLoaderProps) => {
  const { children, loading } = props;

  return <>
    {loading ? <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div> : children}
  </>
}

export default AppLoader
