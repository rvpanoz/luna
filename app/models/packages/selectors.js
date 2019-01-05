import {
  addActionError,
  addSelected,
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
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
=======
  clearSelected,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setActive
>>>>>>> Package details first implementation, add more selectors and clean up packages
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
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
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
=======
      dependencies,
>>>>>>> Package details first implementation, add more selectors and clean up packages
      projectName,
      projectVersion,
>>>>>>> fix bugs
      outdated
    })
  );

const doSetOutdatedSuccess = (dispatch, { dependencies }) =>
  dispatch(
    setPackagesOutdatedSuccess({
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
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
=======
      dependencies
    })
  );

const doSetActive = (dispatch, { active }) => dispatch(setActive(active));

>>>>>>> Package details first implementation, add more selectors and clean up packages
export {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  doSetActive,
=======
>>>>>>> clean up
=======
  doSetActive,
>>>>>>> Package details first implementation, add more selectors and clean up packages
  doStartPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
};
