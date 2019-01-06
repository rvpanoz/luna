import {
  addActionError,
  addSelected,
  clearSelected,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setActive
} from './actions';

const doAddActionError = (dispatch, payload) =>
  dispatch(addActionError(payload));
const doAddSelected = (dispatch, payload) => dispatch(addSelected(payload));
const doClearSelected = dispatch => dispatch(clearSelected());
const doClearPackages = dispatch => dispatch(clearPackages());
const doStartPackages = dispatch => dispatch(setPackagesStart());

const doSetPackagesSuccess = (
  dispatch,
<<<<<<< 584e2e047d0d928cd5362a66c80de6fef71c7d52
  { dependencies, projectName, projectVersion, fromSort, fromSearch, outdated }
) =>
  dispatch(
    setPackagesSuccess({
      projectName,
      projectVersion,
=======
  { dependencies, fromSort, fromSearch, outdated }
) =>
  dispatch(
    setPackagesSuccess({
>>>>>>> linter
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

const doSetActive = (dispatch, { active }) => dispatch(setActive(active));

export {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
  doSetActive,
  doStartPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
};
