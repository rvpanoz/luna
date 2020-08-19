import React, { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { setActive } from '../models/packages/actions';
import AppLoader from '../components/AppLoader';
import { XIcon } from '@primer/octicons-react';
import { string, object, bool } from 'prop-types';

const PackageDetails = (props) => {
  const { active, activeGroup, loading } = props;
  const dispatch = useDispatch();
  const closeActive = useCallback(() => dispatch(setActive({ active: null })), [
    dispatch,
  ]);

  if (!active) {
    return null;
  }

  return (
    <div className="max-w-sm w-full pt-2 lg:max-w-full lg:flex">
      <AppLoader loading={loading} message="Loading package.." half={true}>
        <div className="bg-white p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              {activeGroup}
            </p>
            <div className="text-gray-700 font-bold text-xl mb-2">
              {active.name}
            </div>
            <p className="text-gray-700 text-base">{active.description}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-600 leading-none">
                Author:&nbsp;{active.author || 'N/A'}
              </p>
              <p className="text-gray-600">Installed:&nbsp;{active.version}</p>
              <p className="text-gray-600">
                Latest:&nbsp;{active['dist-tags'].latest}
              </p>
              <p className="text-gray-600">License:&nbsp;{active.license}</p>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <ul className="flex flex-col">
            <li className="mr-3">
              <a onClick={closeActive} className="py-1 px-3 text-red" href="#">
                <XIcon />
              </a>
            </li>
          </ul>
        </div>
      </AppLoader>
    </div>
  );
};

PackageDetails.propTypes = {
  active: object,
  mode: string,
  loading: bool,
  activeGroup: string,
};

export default PackageDetails;
