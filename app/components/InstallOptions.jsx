import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import { useDispatch } from 'redux-react-hook';
import { addInstallOption } from '../models/common/actions';
import { PACKAGE_GROUPS } from '../constants/AppConstants';

const groups = Object.values(PACKAGE_GROUPS);

const ListItem = (props) => {
  const { name } = props;
  const dispatch = useDispatch();
  const [groupName, setGroup] = useState('save-prod');

  const onChange = (evt) => {
    const { value } = evt.target;
    setGroup(value);

    dispatch(
      addInstallOption({
        name,
        options: [value],
      })
    );
  };

  return (
    <div className="flex justify-between align-center items-center pb-4">
      <div className="w-64">{name}</div>
      <div className="w-64 px-3 mb-6 md:mb-0">
        <div className="relative">
          <select
            value={groupName}
            onChange={onChange}
            className="non-native block w-full bg-gray-200 border border-gray-200 text-gray-700 p-3 rounded leading-tight"
          >
            {groups.map((group) =>
              group !== 'save-exact' ? <option>{group}</option> : null
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-3 mb-6 md:mb-0">
        <label
          className="inline-flex items-center mt-3"
          onClick={(evt) => evt.stopPropagation()}
        >
          <input
            type="checkbox"
            onClick={() => {}}
            className="form-checkbox h-5 w-5 mt-2"
          />
          <span className="ml-2 text-gray-600 whitespace-no-wrap">
            save-exact
          </span>
        </label>
      </div>
    </div>
  );
};

const InstallOptions = (props) => {
  const { selected } = props;

  return (
    <div className="pt-4 pb-4">
      {selected.map((name) => {
        return <ListItem name={name} />;
      })}
    </div>
  );
};

InstallOptions.propTypes = {
  selected: arrayOf(string).isRequired,
};

export default InstallOptions;
