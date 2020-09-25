import React, { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { XIcon } from '@primer/octicons-react';
import { string, object, bool } from 'prop-types';
import { setActive } from '../models/packages/actions';
import Loader from '../components/Loader';
import { switchcase } from '../commons/utils';
import { TagIcon } from '@primer/octicons-react';

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
      <Loader loading={loading} message="Loading package.." half={true}>
        <div className="bg-white p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              {<TagIcon />}&nbsp;{activeGroup}
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
      </Loader>
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
