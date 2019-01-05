import {
  addActionError,
  addSelected,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  clearSelected,
  clearPackages
} from './actions';

const doAddActionError = (dispatch, payload) =>
  dispatch(addActionError(payload));
const doAddSelected = (dispatch, payload) => dispatch(addSelected(payload));
const doClearSelected = dispatch => dispatch(clearSelected());
const doClearPackages = dispatch => dispatch(clearPackages());
const doStartPackages = dispatch => dispatch(setPackagesStart());

const doSetPackagesSuccess = (
  dispatch,
  { dependencies, projectName, projectVersion, outdated }
) =>
  dispatch(
    setPackagesSuccess({
      data: dependencies,
      name: projectName,
      version: projectVersion,
      outdated
    })
  );

const doSetOutdatedSuccess = (dispatch, { dependencies }) =>
  dispatch(
    setPackagesOutdatedSuccess({
      data: dependencies
    })
  );

export {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
  doStartPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
};
