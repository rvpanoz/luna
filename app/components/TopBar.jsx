import React from 'react';
import { string } from 'prop-types';

const TopBar = (props) => {
  const { directory, prefix } = props;

  return (
    <div className="relative max-w-3xl px-6">
      <span className="text-gray-500 text-sm">Working directory</span>
      <br />
      <span className="text-gray-600 text-sm inline-block w-full break-all">
        {directory || prefix}
      </span>
    </div>
  );
};

TopBar.propTypes = {
  directory: string,
};

export default TopBar;
