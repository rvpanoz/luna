import React from 'react';

type AppLoaderProps = {
  children: React.ReactNode,
  loading: boolean,
  message?: string,
}

const AppLoader = (props: AppLoaderProps) => {
  const { children, loading } = props;

  return <>
    {loading ? <div className="w-full text-center">
      <div className="loader">
        <span>
          <span></span>
        </span>
      </div>
    </div> : children
    }
  </>
}

export default AppLoader
