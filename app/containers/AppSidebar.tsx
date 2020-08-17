import React, { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { setActivePage } from '../models/ui/actions';
import { showDialog } from '../commons/utils';
import { setMode } from '../models/common/actions';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const updateActivePage = (page: string) => {
    dispatch({
      type: setActivePage.type,
      payload: {
        page,
        paused: true
      }
    });
  }

  const onLoadDirectory = useCallback(() => {
    const dialogHandler = (result: any) => {

      dispatch(
        setActivePage({
          page: 'packages',
          paused: false,
        })
      );
      dispatch(setMode({ mode: 'local', directory: result.filePaths.join('') }));
    };

    const navigatorParameters = {
      title: 'Open package.json file',
      buttonLabel: 'Analyze',
      filters: [
        {
          name: 'package.json',
          extensions: ['json']
        }
      ],
      properties: ['openFile']
    };

    return showDialog(dialogHandler, { mode: 'file', ...navigatorParameters });
  }, [dispatch]);

  return (
    <>
      <div id="sidebar" className="h-screen w-16 menu bg-white text-white px-4 flex items-center static fixed shadow">
        <ul className="list-reset">
          <li className="my-2 md:my-0">
            <a href="#" onClick={() => updateActivePage('projects')} className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
              <i className="fas fa-home fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Packages</span>
            </a>
          </li>
          <li className="my-2 md:my-0">
            <a href="#" onClick={onLoadDirectory} className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
              <i className="fas fa-download fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Load</span>
            </a>
          </li>
          <li className="my-2 md:my-0">
            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
              <i className="fas fa-plus fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Create</span>
            </a>
          </li>
          <li className="my-2 md:my-0">
            <a href="#" onClick={() => updateActivePage('notifications')} className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
              <i className="fa fa-bell fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Notifications</span>
            </a>
          </li>
          <li className="my-2 md:my-0">
            <a href="#" onClick={() => updateActivePage('analytics')} className="block py-1 md:py-3 pl-1 align-middle text-gray-400 no-underline hover:text-gray-600">
              <i className="fas fa-chart-area fa-fw mr-3 text-gray-600"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Analytics</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AppSidebar;
