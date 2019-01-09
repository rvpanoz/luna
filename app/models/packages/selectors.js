import {
  addActionError,
  addSelected,
  clearSelected,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setActive,
  setSortOptions
} from './actions';

const doAddActionError = (dispatch, payload) =>
  dispatch(addActionError(payload));
const doAddSelected = (dispatch, payload) => dispatch(addSelected(payload));
const doClearSelected = dispatch => dispatch(clearSelected());
const doClearPackages = dispatch => dispatch(clearPackages());
const doStartPackages = dispatch => dispatch(setPackagesStart());

const doSetPackagesSuccess = (
  dispatch,
  { dependencies, projectName, projectVersion, fromSort, fromSearch, outdated }
) =>
  dispatch(
    setPackagesSuccess({
      projectName,
      projectVersion,
      dependencies,
      fromSearch,
      fromSort,
      outdated
    })
  );

const doSetOutdatedSuccess = (dispatch, { dependencies }) =>
  dispatch(
    setPackagesOutdatedSuccess({
      dependencies
    })
  );

const doSetActive = (dispatch, { active }) => dispatch(setActive({ active }));
const doSetSortOptions = (dispatch, { sortDir, sortBy }) =>
  dispatch(
    setSortOptions({
      sortBy,
      sortDir
    })
  );

export {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
  doSetActive,
  doSetSortOptions,
  doStartPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
};
