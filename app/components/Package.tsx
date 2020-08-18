import React from 'react';
import { SyncIcon, CheckIcon, XCircleFillIcon } from '@primer/octicons-react';

type PackageProps = {
  name: string,
  version: string,
  latest: string,
  missing: boolean,
  isOutdated: boolean,
  peerMissing: boolean,
  inOperation?: boolean,
  onClick: () => void,
  onSelect: (name: string) => void
}

const Package = ({ name, version, latest, missing, isOutdated, peerMissing, onClick, onSelect }: PackageProps) => {
  const onSelectPackage = (evt: any) => {
    evt.stopPropagation();
    onSelect(name);
  }

  return (
    <tr className="hover:bg-gray-400 cursor-pointer" onClick={onClick}>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <label className="inline-flex items-center mt-3">
              <input type="checkbox" onClick={onSelectPackage} className="form-checkbox h-5 w-5 mt-2" />
              <span className="ml-2 text-gray-700 whitespace-no-wrap">
                {name}
              </span>
            </label>
          </div>
        </div>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        {version}
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        {latest}
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        {missing && <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
          <span className="relative"><XCircleFillIcon /></span>
        </span>}
        {isOutdated && <span className="relative inline-block px-3 py-1 font-semibold text-pink-900 leading-tight">
          <span className="relative"><SyncIcon /></span>
        </span>}
        {!isOutdated && !peerMissing && !missing && version ? (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span className="relative"><CheckIcon /></span>
          </span>
        ) : null}
      </td>
    </tr>
  );
}

export default Package
