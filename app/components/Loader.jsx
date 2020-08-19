import React from 'react';
import { array, oneOfType, arrayOf, node, bool, string } from 'prop-types';

const Loader = (props) => {
  const { children, loading, message, half } = props;

  return (
    <>
      {loading ? (
        <div
          className={`flex flex-col w-full ${
            !half ? 'h-screen' : ''
          } justify-center items-center pb-64`}
        >
          <div className="loader">
            <span>
              <span></span>
            </span>
          </div>
          <div className="text-gray-400 pt-2">{message}</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

Loader.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  loading: bool,
  half: bool,
  message: string,
};

export default Loader;
