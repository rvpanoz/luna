/**
 * Common reducer: Handles state management for common operations
 */

import { assoc, identity, merge, prepend, prop, propOr, remove } from 'ramda';
import {
  addInstallOption,
  clearInstallOptions,
  setActive,
  setManager,
  setMode,
  updateStatus
} from 'models/common/actions';

import initialState from './initialState';

const { npm, notifications, packagesData, ui, ...common } = initialState;

const createReducer = (commonState, handlers) => (
  state = commonState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addInstallOption.type]: (state, action) => {
    const {
      operations: { packagesInstallOptions }
    } = state;
    const {
      payload: { name, options }
    } = action;

    const packageOptions = packagesInstallOptions.find(
      option => option.name === name
    );

    if (!packageOptions) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: prepend(
            {
              name,
              options
            },
            packagesInstallOptions
          )
        }
      });
    }

    const hasExactOptionIndex = options.indexOf('save-exact');
    const hasExactPackageIndex = packageOptions.options.indexOf('save-exact');

    if (hasExactOptionIndex > -1 && hasExactPackageIndex > -1) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: packagesInstallOptions.map(o => {
            const optionName = o.name;

            if (optionName === name) {
              return {
                name: o.name,
                options: remove(hasExactPackageIndex, 1, packageOptions.options)
              };
            }

            return o;
          })
        }
      });
    }

    if (hasExactOptionIndex > -1 && hasExactPackageIndex === -1) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: packagesInstallOptions.map(o => {
            const optionName = o.name;

            if (optionName === name) {
              return {
                name: o.name,
                options: o.options.concat(options)
              };
            }

            return o;
          })
        }
      });
    }

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        packagesInstallOptions: packagesInstallOptions.map(o => {
          const optionName = o.name;

          if (optionName === name) {
            return {
              name: o.name,
              options:
                hasExactPackageIndex > -1
                  ? options.concat(['save-exact'])
                  : options
            };
          }

          return o;
        })
      }
    });
  },
  [clearInstallOptions.type]: state =>
    merge(state, {
      ...state,
      operations: {
        ...state.operations,
        packagesInstallOptions: []
      }
    }),
  [setActive.type]: (state, { payload: { active } }) =>
    assoc('active', active, state),
  [setMode.type]: (state, { payload: { mode, directory } }) =>
    merge(state, {
      activePage: 'packages',
      mode,
      directory
    }),
  [setManager.type]: (state, { payload: { manager } }) =>
    assoc('manager', manager, state),
  [updateStatus.type]: (state, { payload: { status } }) =>
    assoc('onlineStatus', status, state)
};

export default createReducer(common, handlers);
