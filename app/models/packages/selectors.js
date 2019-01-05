import {
  addActionError,
  addSelected,
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  clearSelected,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setActive
=======
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  clearSelected,
  clearPackages
>>>>>>> clean up
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
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
      dependencies,
      projectName,
      projectVersion,
=======
      data: dependencies,
<<<<<<< 9e2b4bd230cfc539b6bac8b8cb85cd0c9ce1c37c
      name: projectName,
      version: projectVersion,
>>>>>>> clean up
=======
      projectName,
      projectVersion,
>>>>>>> fix bugs
      outdated
    })
  );

const doSetOutdatedSuccess = (dispatch, { dependencies }) =>
  dispatch(
    setPackagesOutdatedSuccess({
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
      dependencies
    })
  );

const doSetActive = (dispatch, { active }) => dispatch(setActive(active));

=======
      data: dependencies
    })
  );

>>>>>>> clean up
export {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  doSetActive,
=======
>>>>>>> clean up
  doStartPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
};
