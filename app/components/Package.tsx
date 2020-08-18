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
  return (
    <tr className="hover:bg-gray-400">
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <a href="#" onClick={onClick}>
          <div className="flex items-center">
            <div className="ml-3">
              <label className="inline-flex items-center mt-3">
                <input type="checkbox" onClick={() => onSelect(name)} className="form-checkbox h-5 w-5 mt-2" />
                <span className="ml-2 text-gray-700 whitespace-no-wrap">
                  {name}
                </span>
              </label>
            </div>
          </div>
        </a>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <a className="inline-block w-full h-full" href="#" onClick={onClick}>
          {version}
        </a>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <a href="#" onClick={onClick}>
          {latest}
        </a>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <a href="#" onClick={onClick}>
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
        </a>
      </td>
    </tr>
  );
}

export default Package
