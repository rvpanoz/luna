import React, { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import {
  HomeIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  BellIcon,
  InsightsIcon,
} from '@primer/octicons-react';
import { setActivePage } from '../models/ui/actions';
import { showDialog } from '../commons/utils';
import { setMode } from '../models/common/actions';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const updateActivePage = (page) => {
    dispatch({
      type: setActivePage.type,
      payload: {
        page,
        paused: true,
      },
    });
  };

  const onLoadDirectory = useCallback(() => {
    const dialogHandler = (result) => {
      dispatch(
        setActivePage({
          page: 'packages',
          paused: false,
        })
      );
      dispatch(
        setMode({ mode: 'local', directory: result.filePaths.join('') })
      );
    };

    const navigatorParameters = {
      title: 'Open package.json file',
      buttonLabel: 'Analyze',
      filters: [
        {
          name: 'package.json',
          extensions: ['json'],
        },
      ],
      properties: ['openFile'],
    };

    return showDialog(dialogHandler, { mode: 'file', ...navigatorParameters });
  }, [dispatch]);

  return (
    <>
      <div
        id="sidebar"
        className="h-screen w-16 menu bg-white text-white px-2 items-center flex static align-center fixed shadow"
      >
        <ul className="list-reset">
          <li className="my-2 mx-1 md:my-0">
            <a
              href="#"
              onClick={() => updateActivePage('projects')}
              className="block py-1 md:py-3 pl-2 align-middle text-gray-400 no-underline hover:text-gray-600"
            >
              <div className="flex w-full items-center justify-between">
                <HomeIcon />
                &nbsp;
                <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
                  Packages
                </span>
              </div>
            </a>
          </li>
          <li className="my-2 mx-1 md:my-0">
            <a
              href="#"
              onClick={onLoadDirectory}
              className="block py-1 md:py-3 pl-2 align-middle text-gray-400 no-underline hover:text-gray-600"
            >
              <div className="flex w-full items-center justify-between">
                <ArrowDownIcon />
                &nbsp;
                <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
                  Load
                </span>
              </div>
            </a>
          </li>
          <li className="my-2 mx-1 md:my-0">
            <a
              href="#"
              className="block py-1 md:py-3 pl-2 align-middle text-gray-400 no-underline hover:text-gray-600"
            >
              <div className="flex w-full items-center justify-between">
                <PlusCircleIcon />
                &nbsp;
                <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
                  Create
                </span>
              </div>
            </a>
          </li>
          <li className="my-2 mx-1 md:my-0">
            <a
              href="#"
              onClick={() => updateActivePage('notifications')}
              className="block py-1 md:py-3 pl-2 align-middle text-gray-400 no-underline hover:text-gray-600"
            >
              <div className="flex w-full items-center justify-between">
                <BellIcon />
                &nbsp;
                <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
                  Notifications
                </span>
              </div>
            </a>
          </li>
          <li className="my-2 mx-1 md:my-0">
            <a
              href="#"
              onClick={() => updateActivePage('analytics')}
              className="block py-1 md:py-3 pl-2 align-middle text-gray-400 no-underline hover:text-gray-600"
            >
              <div className="flex w-full items-center justify-between">
                <InsightsIcon />
                &nbsp;
                <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
                  Analytics
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AppSidebar;
