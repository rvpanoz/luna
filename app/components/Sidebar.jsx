import React, { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { string, elementType, func } from 'prop-types';
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

const SidebarItem = (props) => {
  const { label, renderIcon, handler } = props;

  return (
    <a
      href="#"
      onClick={handler}
      className="block py-1 md:py-3 pl-2 align-middle text-gray-500 no-underline hover:text-gray-800"
    >
      <div className="flex w-full items-center justify-between">
        {renderIcon()}
        &nbsp;
        <span className="w-full inline-block ml-6 pb-2 md:pb-0 text-sm">
          {label}
        </span>
      </div>
    </a>
  );
};

SidebarItem.propTypes = {
  label: string,
  renderIcon: func,
  handler: func,
};

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
        className="h-screen w-16 menu bg-white text-white px-2 items-center flex align-center fixed shadow"
      >
        <ul className="list-reset">
          <li className="my-2 mx-1 md:my-0">
            <SidebarItem
              label="Packages"
              handler={() => updateActivePage('packages')}
              renderIcon={() => <HomeIcon />}
            />
          </li>
          <li className="my-2 mx-1 md:my-0">
            <SidebarItem
              label="Load"
              handler={() => onLoadDirectory()}
              renderIcon={() => <ArrowDownIcon />}
            />
          </li>
          <li className="my-2 mx-1 md:my-0">
            <SidebarItem
              label="Create"
              handler={() => {}}
              renderIcon={() => <PlusCircleIcon />}
            />
          </li>
          <li className="my-2 mx-1 md:my-0">
            <SidebarItem
              label="Notifications"
              handler={() => updateActivePage('notifications')}
              renderIcon={() => <BellIcon />}
            />
          </li>
          <li className="my-2 mx-1 md:my-0">
            <SidebarItem
              label="Analytics"
              handler={() => updateActivePage('analytics')}
              renderIcon={() => <InsightsIcon />}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default AppSidebar;
